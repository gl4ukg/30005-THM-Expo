import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { Input } from '@/components/UI/Input/Input';
import { useAppContext } from '@/context/ContextProvider';
import { mockedData } from '@/context/mocked';
import { isMultiSelection, MultiSelectionActionsType } from '@/context/state';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { reverseHexString } from '@/lib/util/rfid';
import { Href, router, useFocusEffect } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { use, useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export type ScanPurpose =
  | MultiSelectionActionsType
  | 'REGISTER_HOSE'
  | 'INSPECT_HOSE';
export const getScanUrl = (scanPurpose: ScanPurpose): Href =>
  `/(app)/scan?scanPurpose=${scanPurpose}`;

const Scan = () => {
  const { scanPurpose } = useLocalSearchParams<{
    scanPurpose?: ScanPurpose;
  }>();
  const { state, dispatch } = useAppContext();
  const [scanMethod, setScanMethod] = useState<'RFID' | 'Barcode' | null>(
    'Barcode',
  );
  const inputRef = useRef<TextInput>(null);
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [showRfidScanView, setShowRfidScanView] = useState(false);
  const [isNfcSupported, setIsNfcSupported] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [rfid, setRfid] = useState<string | null>(null);
  const previousRfid = useRef<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const title = getScanTitle(scanPurpose);
  const isProcessingHose = useRef(false);
  const cameraAlertShownRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      handleBarcodePress();
      return () => {
        NfcManager.cancelTechnologyRequest().catch(() => {});
      };
    }, []),
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['code-39'],
    onCodeScanned: (codes) => {
      if (isProcessingHose.current) {
        return;
      }
      while (codes.length) {
        const code: Code | undefined = codes.shift();
        //if code length is 7 and is a number
        if (code && code.value?.length === 7 && !isNaN(Number(code.value))) {
          setId(code.value);
          isProcessingHose.current = true;
          handelHoseSearch(code.value);
          setScanMethod(null);
          break;
        }
      }
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
      NfcManager.cancelTechnologyRequest().catch(() => {});
    };
  }, []);

  const handleRFIDScan = useCallback(async () => {
    if (isProcessingHose.current) {
      console.log('RFID scan initiated, but navigation already in progress.');
      return;
    }
    if (!isNfcSupported) return;

    try {
      previousRfid.current = rfid;
      setScanError(null);
      setId(null);
      // setShowRfidScanView(true);

      await NfcManager.requestTechnology(NfcTech.Iso15693IOS);
      const tag = await NfcManager.getTag();

      if (isProcessingHose.current) {
        console.log('RFID tag read, but navigation already initiated.');
        NfcManager.cancelTechnologyRequest().catch(() => {});
        setShowRfidScanView(false);
        return;
      }

      if (tag?.id) {
        const reversedId = reverseHexString(tag.id);
        setRfid(reversedId);
        setScanMethod('RFID');
        handelHoseSearch(reversedId, true);
      } else {
        setScanError('No tag ID found.');
      }
    } catch (ex: any) {
    } finally {
      NfcManager.cancelTechnologyRequest().catch(() => {});
      setShowRfidScanView(false);
    }
  }, [isNfcSupported, rfid, isProcessingHose]);

  useEffect(() => {
    //TODO: remove it
    dispatch({
      type: 'SET_HOSE_DATA',
      payload: mockedData,
    });
  }, []);

  const handleRFIDPress = () => {
    isProcessingHose.current = false;
    inputRef.current?.blur();
    handleRFIDScan();
    setId(null);
    setRfid(null);
    setScanMethod('RFID');
  };

  const handleBarcodePress = () => {
    isProcessingHose.current = false;
    inputRef.current?.blur();
    setId(null);
    setRfid(null);
    setScanMethod('Barcode');
  };
  const handleTextInputFocus = () => {
    isProcessingHose.current = false;
    setScanMethod(null);
  };

  const handelHoseSearch = (id: string, withRfId?: true) => {
    let hose: HoseData | undefined = undefined;
    if (withRfId) {
      const RFID = Platform.OS === 'ios' ? reverseHexString(id) : id;
      console.log('RFID', RFID);
      //TODO: remove this comment const RFID = id;
      hose = state.data.hoses.find((hose) => hose.RFID === RFID);
    } else {
      hose = state.data.hoses.find((hose) => hose.assetId === +id);
    }

    if (hose) {
      if (scanPurpose === 'REGISTER_HOSE' || scanPurpose === 'INSPECT_HOSE') {
        const params: { [key: string]: any } = {
          hoseId: hose.assetId,
        };
        router.replace({
          pathname: `/dashboard/hoses/${scanPurpose === 'REGISTER_HOSE' ? 'register' : 'inspect'}`,
          params,
        });
        return;
      } else if (scanPurpose) {
        if (!isMultiSelection(state.data.selection)) {
          dispatch({
            type: 'START_MULTI_SELECTION',
            payload: scanPurpose,
          });
        }
        dispatch({
          type: 'ADD_HOSE_TO_EXISTING_MULTI_SELECTION',
          payload: hose.assetId,
        });
        setId(null);
        setScanMethod('Barcode');
        isProcessingHose.current = false;
        router.replace(
          `/(app)/dashboard/actions?action=${scanPurpose}&allowScan=true`,
        );
      }
    } else {
      Alert.alert(
        `Hose with ID ${Platform.OS === 'ios' ? reverseHexString(id) : id} not found`,
        'Please enter a valid hose ID.',
        [
          {
            text: 'Cancel scanning',
            onPress: () => {
              router.back();
            },
          },
          {
            text: 'Try again',
            onPress: () => {
              withRfId ? handleRFIDPress() : handleBarcodePress();
            },
          },
        ],
      );
    }
  };

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    if (
      hasPermission &&
      scanMethod === 'Barcode' &&
      device === undefined &&
      !cameraAlertShownRef.current
    ) {
      Alert.alert(
        'Your device does not have a camera.',
        'Please use a device with a camera or use other scan methods.',
      );
      cameraAlertShownRef.current = true;
    }
  }, [device, scanMethod, hasPermission]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}
          style={{ flex: 1 }}
        >
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
            {scanMethod === 'RFID' && (
              <View style={styles.rfidContainer}>
                <Icon name='RFID' size='lg' />
                <Typography
                  name='sectionHeaderCapslock'
                  text={Platform.OS === 'android' ? 'Scan RFID now' : ''}
                />
              </View>
            )}
          </View>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <Typography
                name='navigationBold'
                style={styles.headerText}
                text={title}
              />
              <Typography
                name='navigation'
                style={styles.headerText}
                text='Scan or enter ID'
              />
            </View>
            <View style={styles.inputsWrapper}>
              <View style={styles.inputs}>
                <Input
                  value={id || ''}
                  onChangeText={setId}
                  type='numeric'
                  ref={inputRef}
                  onFocus={handleTextInputFocus}
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
                        scanMethod === 'Barcode'
                          ? colors.white
                          : colors.extended333
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
                        scanMethod === 'RFID'
                          ? colors.white
                          : colors.extended333
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
                  !id && styles.searchButtonDisabled,
                ]}
                disabled={!id}
                onPress={() => id && handelHoseSearch(id)}
              >
                <Icon
                  name='Search'
                  color={
                    !id || isProcessingHose.current
                      ? colors.extended666
                      : colors.primary25
                  }
                  size='md'
                />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Scan;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  headerContainer: {
    width: '100%',
    backgroundColor: colors.lightContrast,
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    zIndex: 1,
  },
  header: { justifyContent: 'center', alignItems: 'center', gap: 10 },
  headerText: { textAlign: 'center' },
  searchButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
  },
  searchButtonPressed: {
    borderColor: colors.primary25,
  },
  searchButtonDisabled: {
    opacity: 0.3,
    borderColor: 'transparent',
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

const getScanTitle = (scanPurpose: ScanPurpose | undefined) => {
  if (scanPurpose) {
    switch (scanPurpose) {
      case 'REGISTER_HOSE':
        return 'Register Hose';
      case 'INSPECT_HOSE':
        return 'Inspect Hose';
      case 'RFQ':
        return 'Order hoses';
      case 'SCRAP':
        return 'Scrap hoses';
      case 'CONTACT':
        return 'Contact TESS Team';
      default:
        return 'Scan Hose';
    }
  }
};
