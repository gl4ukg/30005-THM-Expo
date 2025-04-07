import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { Input } from '@/components/UI/Input/input';
import { colors } from '@/lib/tokens/colors';
import { reverseHexString } from '@/lib/util/rfid';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

const Scan = () => {
  const inputRef = useRef<TextInput>(null);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const codeScanner = useCodeScanner({
    codeTypes: ['code-39'],
    // codeTypes: ['code-128', 'code-39', 'code-93', 'ean-13'],
    regionOfInterest: { x: 0, y: 0, width: 100, height: 50 },
    onCodeScanned: (codes) => {
      if (typeof codes[0].value === 'string') {
        setId(codes[0].value);
        setScanMethod(null);
      } else {
        setId('');
      }
      console.log(`Scanned ${codes[0].type} ${codes[0].value} !`);
    },
  });

  if (!hasPermission) requestPermission();
  const cameraRef = useRef<Camera>(null);
  const [scanMethod, setScanMethod] = useState<'RFID' | 'Barcode' | null>(null);
  const [id, setId] = useState<null | string>('');
  const [rfId, setRfId] = useState<null | string>(null);
  const [isNfcSupported, setIsNfcSupported] = useState(false);
  const [isNfcOn, setIsNfcOn] = useState(false);

  useEffect(() => {
    const checkNfcSupport = async () => {
      const isSupported = await NfcManager.isSupported();
      setIsNfcSupported(isSupported);
      if (!isSupported)
        Alert.alert(
          'NFC',
          'RFID is not supported on this device, you will not be able to use it',
        );
    };
    checkNfcSupport();
  }, []);

  // return <Typography name='navigation' text='Missing Permission' />;
  if (device === undefined && scanMethod === 'Barcode')
    Alert.alert(
      'Your device does not have a camera.',
      'Please use a device with a camera or use other scan methods.',
      [
        {
          text: 'OK',
          style: 'default',
        },
      ],
      {
        cancelable: false,
      },
    );

  const handleRFIDPress = async () => {
    setId('');
    inputRef.current?.blur();
    const isEnabled = await NfcManager.isEnabled();
    if (!isEnabled) {
      Alert.alert('NFC is not enabled ', 'Go to settings and enable NFC');
      setScanMethod(null);
      return;
    }
    setScanMethod('RFID');
    setIsNfcOn(true);
    readNdef();
  };
  const handleBarcodePress = () => {
    setId('');
    inputRef.current?.blur();
    setScanMethod('Barcode');
  };
  async function readNdef() {
    console.log('readNdef');
    // console.log('NfcManager.requestTechnology', NfcManager.requestTechnology);\
    try {
      // register for the NFC tag with NDEF in it
      const nfcRequest = await NfcManager.requestTechnology(NfcTech.NfcA);
      console.log('nfcRequest', NfcManager.connect([NfcTech.NfcA]));
      // the resolved tag object will contain `ndefMessage` property
      if (!NfcManager.isSupported()) {
        Alert.alert('NFC is not supported on this device');
        throw new Error('NFC is not supported on this device');
      }
      const isSupported = await NfcManager.isEnabled();
      console.log('isSupported', isSupported);
      const tag = await NfcManager.getTag();

      if (tag?.id) {
        const originalId = tag.id;
        const reversedId = reverseHexString(originalId);
        setRfId(reversedId);
        setId(reversedId);
        setScanMethod(null);
      }
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
      // close the session
      NfcManager.close();
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Typography
            name='navigationBold'
            style={styles.headerText}
            text='Register hose or Equipment'
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
              label=''
              value={`${id}`}
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
            onPress={() => {}}
          >
            <Icon name='Search' color={colors.primary25} size='sm' />
          </Pressable>
        </View>
      </View>
      <View style={styles.readerContainer}>
        {device !== undefined && scanMethod === 'Barcode' && (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            focusable={true}
            device={device!}
            codeScanner={codeScanner}
            isActive={scanMethod === 'Barcode'}
          />
        )}
        {scanMethod === 'RFID' && isNfcOn && (
          <View style={styles.rfidContainer}>
            <Icon name='RFID' size='lg' />
            <Typography name='sectionHeaderCapslock' text='Scan RFID now' />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Scan;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: 'auto',
    backgroundColor: colors.lightContrast,
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    textAlign: 'center',
  },
  searchButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonPressed: {
    backgroundColor: colors.dashbordYellow,
  },
  inputsWrapper: {
    flexDirection: 'row',
    gap: 5,
  },
  inputs: {
    gap: 5,
    flex: 1,
  },
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

  switchText: {
    color: colors.extended333,
  },
  switchTextActive: {
    color: colors.white,
  },
  // there is an issue with the camera view, https://github.com/mrousavy/react-native-vision-camera/issues/3237
  // it is not rendering in right place on the first render, overflow: 'hidden' fixes it for now
  readerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
    width: '100%',
    borderColor: colors.black,
  },
  rfidContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});

//5AB35DA0500104E0 e0040150a05db35a
