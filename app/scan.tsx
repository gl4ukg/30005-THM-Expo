import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { ButtonTHS } from '@/components/UI';
import { colors } from '@/lib/tokens/colors';
import { useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { reverseHexString } from '@/lib/util/rfid';

const Ui = () => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const codeScanner = useCodeScanner({
    codeTypes: ['code-128', 'code-39', 'code-93', 'ean-13'],
    regionOfInterest: { x: 0, y: 0, width: 100, height: 50 },
    onCodeScanned: (codes) => {
      if (typeof codes[0].value === 'string') {
        setId(codes[0].value);
        setScanMethod(null);
      } else {
        setId(null);
      }
      console.log(`Scanned ${codes[0].type} ${codes[0].value} !`);
    },
  });

  if (!hasPermission) requestPermission();
  const cameraRef = useRef<Camera>(null);
  const [scanMethod, setScanMethod] = useState<'RFID' | 'Barcode' | null>(null);
  const [id, setId] = useState<null | string>(null);
  const [rfId, setRfId] = useState<null | string>(null);
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

  const handleRFIDPress = () => {
    setId(null);
    setScanMethod('RFID');
    readNdef();
  };
  const handleBarcodePress = () => {
    setId(null);
    setScanMethod('Barcode');
  };
  async function readNdef() {
    console.log('readNdef');
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.NfcA);
      // the resolved tag object will contain `ndefMessage` property
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
        <View style={styles.header}>
          <View style={styles.search}>
            <TextInput
              placeholder='123456789'
              style={{
                flex: 1,
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 3,
                borderColor: colors.primary25,
                borderWidth: 1,
              }}
              value={id || ''}
              onChange={(value) => setId(value.nativeEvent.text ?? null)}
            />
            <Icon name='Search' color={colors.primary25} size='sm' />
          </View>
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
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {device !== undefined && scanMethod === 'Barcode' && (
          <Camera
            ref={cameraRef}
            style={{
              width: '100%',
              height: 300,
              borderWidth: 1,
              borderColor: colors.black,
            }}
            focusable={true}
            device={device}
            codeScanner={codeScanner}
            isActive={scanMethod === 'Barcode'}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ui;

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
  search: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    // flex: 1,
  },
  switch: {
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
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

//5AB35DA0500104E0 e0040150a05db35a
