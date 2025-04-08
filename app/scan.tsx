import { RelativePathString, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Alert,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import { Typography } from '@/components/typography';
import { colors } from '@/lib/tokens/colors';
import { Icon } from '@/components/Icon/Icon';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { reverseHexString } from '@/lib/util/rfid';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { Input } from '@/components/UI/Input/input';
import { useAppContext } from '@/context/ContextProvider';

const Scan = () => {
  const { title, registerHose } = useLocalSearchParams() as {
    title?: string;
    registerHose?: string;
  };
  const { dispatch } = useAppContext();

  let displayTitle = title || 'Scan or type ID';
  let navigationPath = '/dashbord/actions';

  const titleToRouteParam: Record<string, string> = {
    'Order hoses': 'rfq',
    'Scrap hoses': 'scrap',
  };

  const routeParam = titleToRouteParam[title ?? ''];

  if (registerHose === 'true') {
    navigationPath = `/dashbord/hoses/register`;
  } else if (routeParam) {
    navigationPath = `/dashbord/actions/${routeParam}?source=scan`;
  }

  const inputRef = useRef<TextInput>(null);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);
  const [scanMethod, setScanMethod] = useState<'RFID' | 'Barcode' | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [rfid, setRfid] = useState<string | null>(null);
  const [showRfidScanView, setShowRfidScanView] = useState(false);
  const [isNfcSupported, setIsNfcSupported] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const previousRfid = useRef<string | null>(null);

  const codeScanner = useCodeScanner({
    codeTypes: ['code-39'],
    onCodeScanned: (codes) => {
      setId(typeof codes[0].value === 'string' ? codes[0].value : '');
      setScanMethod(null);
    },
  });

  useEffect(() => {
    const initNFC = async () => {
      try {
        await NfcManager.start();
        const supported = await NfcManager.isSupported();
        setIsNfcSupported(supported);
        if (!supported) {
          Alert.alert('NFC not supported', 'This device does not support NFC.');
        }
      } catch (error) {
        console.error('Error checking NFC support:', error);
        Alert.alert('Error', 'Failed to check NFC support. Please try again.');
      }
    };

    initNFC();

    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  const handleRFIDScan = useCallback(async () => {
    if (!isNfcSupported) return;

    try {
      if (!(await NfcManager.isEnabled())) {
        Alert.alert('NFC disabled', 'Enable NFC in your device settings.');
        return;
      }

      previousRfid.current = rfid;
      setScanError(null);
      setId(null);
      setShowRfidScanView(true);

      await NfcManager.requestTechnology(NfcTech.Iso15693IOS);
      const tag = await NfcManager.getTag();

      if (tag?.id) {
        const reversedId = reverseHexString(tag.id);
        setRfid(reversedId);
        setId(reversedId);
        setScanMethod(null);

        if (registerHose === 'true') {
          router.push(
            `/dashbord/hoses/register?rfid=${reversedId}` as RelativePathString,
          );
        } else {
          router.push(
            `${navigationPath}?rfid=${reversedId}` as RelativePathString,
          );
        }
      } else {
        setScanError('No tag ID found.');
      }
    } catch (ex: any) {
      console.log('Error Message:', ex.message);
      if (ex.message && !ex.message.includes('User cancelled')) {
        setScanError('Error reading NFC tag.');
        Alert.alert('Error reading NFC', 'Please try again.');
      } else if (previousRfid.current) {
        setRfid(previousRfid.current);
        setId(previousRfid.current);
      }
    } finally {
      NfcManager.cancelTechnologyRequest();
      setShowRfidScanView(false);

      if (rfid === null && previousRfid.current) {
        setRfid(previousRfid.current);
        setId(previousRfid.current);
      }
    }
  }, [isNfcSupported, rfid, registerHose, navigationPath]);

  const handleRFIDPress = () => {
    inputRef.current?.blur();
    handleRFIDScan();
    setScanMethod('RFID');
  };

  const handleBarcodePress = () => {
    setId('');
    inputRef.current?.blur();
    setScanMethod('Barcode');
  };

  if (!hasPermission) requestPermission();

  if (device === undefined && scanMethod === 'Barcode') {
    Alert.alert(
      'Your device does not have a camera.',
      'Please use a device with a camera or use other scan methods.',
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Typography
            name='navigationBold'
            style={styles.headerText}
            text={displayTitle}
          />
          <Typography
            name='navigation'
            style={styles.headerText}
            text='Scan or type ID'
          />
        </View>
        <View style={styles.inputsWrapper}>
          <View style={styles.inputs}>
            <Input
              value={id || ''}
              onChangeText={setId}
              type='numeric'
              ref={inputRef}
            />
            <View style={styles.switch}>
              <Pressable
                style={
                  scanMethod === 'Barcode'
                    ? styles.switchButtonActive
                    : styles.switchButton
                }
                onPress={handleBarcodePress}
              >
                <Icon
                  name='Barcode'
                  size='xsm'
                  color={
                    scanMethod === 'Barcode' ? colors.white : colors.extended333
                  }
                />
                <Typography
                  name='navigation'
                  text='Barcode'
                  style={
                    scanMethod === 'Barcode'
                      ? styles.switchTextActive
                      : styles.switchText
                  }
                />
              </Pressable>
              <Pressable
                style={
                  scanMethod === 'RFID'
                    ? styles.switchButtonActive
                    : styles.switchButton
                }
                onPress={handleRFIDPress}
              >
                <Icon
                  name='RFID'
                  size='xsm'
                  color={
                    scanMethod === 'RFID' ? colors.white : colors.extended333
                  }
                />
                <Typography
                  name='navigation'
                  text='RFID'
                  style={
                    scanMethod === 'RFID'
                      ? styles.switchTextActive
                      : styles.switchText
                  }
                />
              </Pressable>
            </View>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.searchButton,
              pressed && styles.searchButtonPressed,
            ]}
            onPress={() => {
              dispatch({
                type: 'SELECT_HOSE',
                payload: `${id}`,
              });
              router.push(`${navigationPath}?rfid=${id}` as RelativePathString);
            }}
          >
            <Icon name='Search' color={colors.primary25} size='sm' />
          </Pressable>
        </View>
      </View>
      <View style={styles.readerContainer}>
        {device && scanMethod === 'Barcode' && (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={device}
            codeScanner={codeScanner}
            isActive={scanMethod === 'Barcode'}
          />
        )}
        {scanMethod === 'RFID' && showRfidScanView && (
          <View style={styles.rfidContainer}>
            <Icon name='RFID' size='lg' />
            <Typography
              name='sectionHeaderCapslock'
              text={Platform.OS === 'android' ? 'Scan RFID now' : ''}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Scan;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  headerContainer: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: colors.lightContrast,
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: { justifyContent: 'center', alignItems: 'center', gap: 10 },
  headerText: { textAlign: 'center' },
  searchButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsWrapper: { flexDirection: 'row', gap: 5 },
  inputs: { gap: 5, flex: 1 },
  switch: {
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 3,
    borderRadius: 3,
    gap: 20,
  },
  searchButtonPressed: {
    backgroundColor: colors.dashbordYellow,
  },
  switchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    flex: 1,
  },
  switchButtonActive: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.primary25,
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  switchText: { color: colors.extended333 },
  switchTextActive: { color: colors.white },
  readerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  camera: { flex: 1, width: '100%', borderColor: colors.black },
  rfidContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
