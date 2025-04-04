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
  const previousRfid = useRef<string | null>(null);

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

  const handleRFIDScan = useCallback(async () => {
    if (!isNfcSupported) return;

    try {
      if (!(await NfcManager.isEnabled())) {
        Alert.alert(
          'NFC disabled',
          'Please enable NFC in your device settings.',
        );
        return;
      }

      previousRfid.current = rfid;
      Platform.OS === 'android' && setRfid(null);
      setScanError(null);
      onRFIDScanned(null);
      setModalVisible(true);
      setScanning(true);

      await NfcManager.requestTechnology(NfcTech.Iso15693IOS);
      const tag = await NfcManager.getTag();

      if (tag?.id) {
        const reversedId = reverseHexString(tag.id);
        setRfid(reversedId);
        onRFIDScanned(reversedId);
      } else {
        setScanError('No tag ID found.');
      }
    } catch (ex: any) {
      if (ex.message && !ex.message.includes('User cancelled')) {
        setScanError('Error reading NFC tag.');
        Alert.alert('Error reading NFC', 'Please try again.');
      } else if (previousRfid.current !== null) {
        setRfid(previousRfid.current);
        onRFIDScanned(previousRfid.current);
      }
    } finally {
      NfcManager.cancelTechnologyRequest();
      setScanning(false);

      if (rfid === null && previousRfid.current !== null) {
        setRfid(previousRfid.current);
        onRFIDScanned(previousRfid.current);
      }

      setTimeout(() => setModalVisible(false), 1000);
    }
  }, [isNfcSupported, onRFIDScanned, rfid]);

  useEffect(() => {
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
      NfcManager.cancelTechnologyRequest();
    };
  }, [checkNfc]);

  const handlePress = () => {
    handleRFIDScan();
  };

  const handleModalClose = () => {
    NfcManager.cancelTechnologyRequest();
    setModalVisible(false);
    setScanError(null);
    setScanning(false);
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
  label: { marginBottom: 5, color: colors.extended666 },
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
  iconContainer: { flexDirection: 'row', alignItems: 'center' },
  valueStyle: { color: colors.extended333 },
});
