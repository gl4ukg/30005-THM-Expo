import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { Input } from '@/components/UI/Input/Input';
import { useAppContext } from '@/context/ContextProvider';
import { isMultiSelection, MultiSelectionActionsType } from '@/context/state';
import { colors } from '@/lib/tokens/colors';
import { reverseHexString } from '@/lib/util/rfid';
import { Href, router, useFocusEffect } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
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
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

export type ScanPurpose =
  | MultiSelectionActionsType
  | 'REGISTER_HOSE'
  | 'INSPECT_HOSE';
export const getScanUrl = (scanPurpose: ScanPurpose): Href =>
  `/scan?scanPurpose=${scanPurpose}`;

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

  const [title, setTitle] = useState<string>('Scanner');
  const [subTitle, setSubTitle] = useState<string>('Scan or enter ID');
  const isNavigatingRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      isNavigatingRef.current = false;
      return () => {};
    }, []),
  );

  useEffect(() => {
    if (scanPurpose) {
      switch (scanPurpose) {
        case 'REGISTER_HOSE':
          setTitle('Register Hose');
          break;
        case 'INSPECT_HOSE':
          setTitle('Inspect Hose');
          break;
        case 'RFQ':
          setTitle('Order hoses');
          break;
        case 'SCRAP':
          setTitle('Scrap hoses');
          break;
        case 'CONTACT':
          setTitle('Contact TESS Team');
          break;
        default:
          break;
      }
    }
  }, [scanPurpose]);

  const codeScanner = useCodeScanner({
    codeTypes: ['code-39'],
    onCodeScanned: (codes) => {
      if (isNavigatingRef.current) {
        return;
      }
      if (codes.length > 0 && codes[0].value) {
        const scannedId =
          typeof codes[0].value === 'string' ? codes[0].value : '';

        if (isNavigatingRef.current) return;
        setId(scannedId);
        setScanMethod('Barcode');
        handleScan(scannedId, null, 'Barcode');
      }
    },
  });

  useEffect(() => {
    let isMounted = true;

    const initNFC = async () => {
      if (!isMounted) return;

      try {
        await NfcManager.start();
        const supported = await NfcManager.isSupported();
        if (isMounted) setIsNfcSupported(supported);
        if (!supported && isMounted) {
          Alert.alert('NFC not supported', 'This device does not support NFC.');
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error checking NFC support:', error);
          Alert.alert(
            'Error',
            'Failed to check NFC support. Please try again.',
          );
        }
      }
    };

    initNFC();

    return () => {
      isMounted = false;
      NfcManager.cancelTechnologyRequest().catch(() => {});
    };
  }, []);

  const handleScan = useCallback(
    (
      scannedId: string | null,
      scannedRfid: string | null,
      method: 'RFID' | 'Barcode' | null,
    ) => {
      if (isNavigatingRef.current) {
        return;
      }
      isNavigatingRef.current = true;

      if (scanPurpose === 'REGISTER_HOSE') {
        const params: { [key: string]: any } = {
          hoseId: scannedId || undefined,
          rfid: scannedRfid || undefined,
          scanMethod: method,
        };
        router.push({
          pathname: '/dashboard/hoses/register',
          params,
        });
        return;
      }
      if (scanPurpose === 'INSPECT_HOSE') {
        router.push({
          pathname: '/dashboard/hoses/inspect',
          params: {
            hoseId: scannedId || undefined,
            rfid: scannedRfid || undefined,
            scanMethod: method,
          },
        });
        return;
      }

      setScanMethod(null);

      const currentId = scannedId ?? id;
      const currentRfid = scannedRfid ?? rfid;

      const hose = state.data.hoses.find((h) => {
        if (method === 'RFID' && currentRfid) {
          return h.RFID === currentRfid;
        } else if (method === 'Barcode' && currentId) {
          return h.assetId === +currentId;
        } else if (currentId && !method) {
          return h.assetId === +currentId;
        }
        return false;
      });

      if (hose) {
        console.log(`Hose found: ${hose.assetId}. Handling multi-selection.`);
        if (method === 'RFID') {
          setId(hose.assetId.toString());
        }
        if (!isMultiSelection(state.data.selection) && !!scanPurpose) {
          dispatch({
            type: 'START_MULTI_SELECTION',
            payload: scanPurpose,
          });
        }
        dispatch({
          type: 'ADD_HOSE_TO_EXISTING_MULTI_SELECTION',
          payload: hose.assetId,
        });

        setTimeout(() => {
          console.log(
            `Navigating to actions screen for purpose: ${scanPurpose}`,
          );
          router.push(
            `/(app)/dashboard/actions?action=${scanPurpose}&allowScan=true`,
          );
        }, 0);
      } else {
        console.log('Hose not found. Displaying alert.');
        Alert.alert('Hose not found', 'Please enter a valid hose ID.');

        isNavigatingRef.current = false;
        console.log('handleScan: Lock released due to hose not found.');
      }
    },

    [
      scanPurpose,
      id,
      rfid,
      state.data.hoses,
      state.data.selection,
      dispatch,
      router,
    ],
  );

  const handleRFIDScan = useCallback(async () => {
    if (isNavigatingRef.current) {
      console.log('RFID scan initiated, but navigation already in progress.');
      return;
    }
    if (!isNfcSupported) return;

    try {
      previousRfid.current = rfid;
      setScanError(null);
      setId(null);
      setShowRfidScanView(true);

      await NfcManager.requestTechnology(NfcTech.Iso15693IOS);
      const tag = await NfcManager.getTag();

      if (isNavigatingRef.current) {
        console.log('RFID tag read, but navigation already initiated.');
        NfcManager.cancelTechnologyRequest().catch(() => {});
        setShowRfidScanView(false);
        return;
      }

      if (tag?.id) {
        const reversedId = reverseHexString(tag.id);
        setRfid(reversedId);
        setScanMethod('RFID');

        handleScan(null, reversedId, 'RFID');
      } else {
        setScanError('No tag ID found.');
      }
    } catch (ex: any) {
    } finally {
      NfcManager.cancelTechnologyRequest().catch(() => {});
      setShowRfidScanView(false);
    }
  }, [isNfcSupported, rfid, handleScan]);

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
            text={title}
          />
          <Typography
            name='navigation'
            style={styles.headerText}
            text={subTitle}
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

              !id && scanMethod !== 'RFID' && styles.searchButtonDisabled,
            ]}
            disabled={!id || isNavigatingRef.current}
            onPress={() => handleScan(id, null, 'Barcode')}
          >
            <Icon
              name='Search'
              color={
                !id || isNavigatingRef.current
                  ? colors.extended666
                  : colors.primary25
              }
              size='sm'
            />
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
    borderWidth: 1,
    borderColor: colors.primary25,
    borderRadius: 4,
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
    backgroundColor: colors.primary25,
  },
  searchButtonDisabled: {
    borderColor: colors.extended666,
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
