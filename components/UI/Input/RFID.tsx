import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { Typography } from '../../typography';
import { colors } from '@/lib/tokens/colors';
import { Icon } from '../../Icon/Icon';
import RFIDScannerModal from './RFIDScannerModal';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { reverseHexString } from '@/lib/util/rfid';

interface RFIDInputProps {
  label: string;
  onRFIDScanned: (rfid: string | null) => void;
}

export const RFIDInput: React.FC<RFIDInputProps> = ({
  label,
  onRFIDScanned,
}) => {
  const [rfid, setRfid] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isNfcSupported, setIsNfcSupported] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const isMounted = useRef(true);
  const previousRfid = useRef<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Check NFC support on mount
  const checkNfc = useCallback(async () => {
    try {
      const supported = await NfcManager.isSupported();
      setIsNfcSupported(supported);
      if (!supported) {
        Alert.alert('NFC not supported', 'This device does not support NFC.');
      }
    } catch (error) {
      console.error('Error checking NFC support:', error);
      Alert.alert(
        'Error',
        'Failed to check NFC support. Please try again later.',
      );
    }
  }, []);

  // Handle RFID scanning
  const handleRFIDScan = useCallback(async () => {
    if (!isNfcSupported || isCancelling) {
      return;
    }

    const isNfcEnabled = await NfcManager.isEnabled();
    if (!isNfcEnabled) {
      Alert.alert('NFC disabled', 'Please enable NFC in your device settings.');
      return;
    }

    previousRfid.current = rfid;
    setModalVisible(true);
    setScanning(true);
    setScanError(null);
    onRFIDScanned(null);

    if (isCancelling) {
      return;
    }

    try {
      setIsCancelling(true);
      await NfcManager.cancelTechnologyRequest();
      await new Promise((resolve) => setTimeout(resolve, 100));
      await NfcManager.requestTechnology(NfcTech.Iso15693IOS);
      const tag = await NfcManager.getTag();

      if (tag?.id) {
        const originalId = tag.id;
        const reversedId = reverseHexString(originalId);
        if (isMounted.current) {
          setRfid(reversedId);
          onRFIDScanned(reversedId);
        }
      } else {
        if (isMounted.current) {
          setScanError('No tag ID found.');
        }
      }
    } catch (ex: any) {
      if (isMounted.current) {
        if (ex.message && !ex.message.includes('User cancelled')) {
          setScanError('Error reading NFC tag.');
          Alert.alert('Error reading NFC', 'Please try again.');
        } else {
          if (previousRfid.current !== null) {
            setRfid(previousRfid.current);
            onRFIDScanned(previousRfid.current);
          }
        }
      }
    } finally {
      if (isMounted.current) {
        NfcManager.cancelTechnologyRequest();
        setIsCancelling(false);
        setScanning(false);

        // If no new RFID was set (rfid is null), restore previous value
        if (rfid === null && previousRfid.current !== null) {
          setRfid(previousRfid.current);
          onRFIDScanned(previousRfid.current);
        }

        setTimeout(() => {
          if (isMounted.current) {
            setModalVisible(false);
          }
        }, 1000);
      }
    }
  }, [isNfcSupported, isCancelling, onRFIDScanned, rfid]);

  useEffect(() => {
    let mounted = true;

    const initNFC = async () => {
      try {
        await NfcManager.start();
        await checkNfc();
      } catch (e) {
        console.warn('NFC initialization failed:', e);
      }
    };

    initNFC();

    return () => {
      mounted = false;
      isMounted.current = false;
      NfcManager.cancelTechnologyRequest();
    };
  }, [checkNfc]);

  const handlePress = () => {
    if (!isCancelling) {
      handleRFIDScan();
    }
  };

  const handleModalClose = () => {
    NfcManager.cancelTechnologyRequest();
    setModalVisible(false);
    setScanError(null);
    setScanning(false);
    setIsCancelling(false);
    if (previousRfid.current !== null) {
      setRfid(previousRfid.current);
      onRFIDScanned(previousRfid.current);
    }
  };

  return (
    <View>
      <Typography name={'navigation'} style={styles.label} text={label} />
      <Pressable
        style={styles.inputContainer}
        onPress={isNfcSupported ? handlePress : undefined}
        disabled={!isNfcSupported}
      >
        <Typography
          name='navigation'
          text={rfid ? rfid : 'Scan...'}
          style={styles.valueStyle}
        />
        <View style={styles.iconContainer}>
          <Icon name='RFID' size='md' color={colors.extended666} />
        </View>
      </Pressable>
      {Platform.OS === 'android' && (
        <RFIDScannerModal
          visible={modalVisible}
          scanning={scanning}
          scanError={scanError}
          onClose={handleModalClose}
          rfid={rfid}
          setRfid={setRfid}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    color: colors.extended666,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.secondary95,
    borderRadius: 1,
    backgroundColor: colors.white,
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueStyle: { color: colors.extended333 },
});
