import { colors } from '@/lib/tokens/colors';
import React, { useEffect } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography';

interface BarcodeScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onBarcodeScanned: (barcode: string | null) => void;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  visible,
  onClose,
  onBarcodeScanned,
}) => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (visible && !hasPermission) {
      requestPermission();
    }
  }, [visible, hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['code-39'],
    onCodeScanned: (codes) => {
      if (visible && codes.length > 0 && codes[0].value) {
        console.log(`Scanned Barcode: ${codes[0].value}`);
        onBarcodeScanned(codes[0].value);
      }
    },
  });

  const handleClose = () => {
    onBarcodeScanned(null);
    onClose();
  };

  if (!hasPermission && visible) {
    return (
      <Modal visible={visible} onRequestClose={handleClose}>
        <View style={[styles.container, styles.centeredMessage]}>
          <View style={styles.headerContainer}>
            <Typography
              name='navigationBold'
              style={styles.headerText}
              text='Permission Required'
            />
          </View>
          <View style={styles.permissionContent}>
            <Typography
              name='button'
              text='Camera permission is required to scan barcodes.'
              style={styles.messageText}
            />
            <Pressable onPress={requestPermission} style={styles.button}>
              <Typography name='button' text='Grant Permission' />
            </Pressable>
            <Pressable
              onPress={handleClose}
              style={[styles.button, styles.cancelButton]}
            >
              <Typography
                name='button'
                text='Cancel'
                style={styles.cancelText}
              />
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }

  if (!device && visible) {
    Alert.alert('Error', 'No camera device found.');
    onClose();
    return null;
  }

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={visible}
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <Typography
            name='navigationBold'
            style={styles.headerText}
            text='Scan Barcode'
          />
          <Pressable style={styles.closeButtonContainer} onPress={handleClose}>
            <Icon name='Cross' size='md' color={colors.primary25} />
          </Pressable>
        </View>

        <View style={styles.cameraContainer}>
          {device && (
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={visible}
              codeScanner={codeScanner}
              enableZoomGesture
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightContrast,
  },
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  headerContainer: {
    backgroundColor: colors.lightContrast,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    gap: 5,
  },
  headerText: {
    textAlign: 'center',
    color: colors.primary25,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: colors.black,
    overflow: 'hidden',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 10,
  },
  centeredMessage: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  permissionContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  messageText: {
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.extended666,
  },
  cancelText: {
    color: colors.white,
  },
});
