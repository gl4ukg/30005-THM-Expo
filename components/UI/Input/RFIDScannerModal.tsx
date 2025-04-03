import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Typography } from '../../typography';
import { colors } from '@/lib/tokens/colors';
import { Icon } from '../../Icon/Icon';
import { ButtonTHS } from '../Button/button';

interface RFIDScannerModalProps {
  visible: boolean;
  onClose: () => void;
  scanning: boolean;
  scanError: string | null;
  rfid: string | null;
  setRfid: (rfid: string | null) => void;
}

const { height, width } = Dimensions.get('window');

const RFIDScannerModal: React.FC<RFIDScannerModalProps> = ({
  visible,
  onClose,
  scanning,
  scanError,
  rfid,
  setRfid,
}) => {
  const handleCancel = () => {
    setRfid(null);
    onClose();
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.contentContainer}>
            {scanError ? (
              <>
                <Typography
                  name='sectionHeader'
                  text='Scan Error'
                  style={styles.title}
                />
                <Typography name='navigation' text={scanError} />
              </>
            ) : rfid ? (
              <>
                <Typography
                  name='sectionHeader'
                  text='Scan Successful!'
                  style={styles.title}
                />
                <Typography name='navigationBold' text={`RFID: ${rfid}`} />
              </>
            ) : (
              <>
                <View style={styles.headerRow}>
                  <Typography
                    name='sectionHeader'
                    text='Scan RFID now'
                    style={styles.titleInRow}
                  />
                  <Icon name='RFID' size='md' color={colors.primary} />
                </View>

                <View style={styles.spinnerContainer}>
                  {scanning && (
                    <ActivityIndicator size='large' color={colors.primary} />
                  )}
                </View>
              </>
            )}
          </View>
          <ButtonTHS
            onPress={handleCancel}
            variant='tertiary'
            title={'Cancel'}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.extended333,
  },
  modalView: {
    height: height / 3,
    width: width - 40,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  titleInRow: {
    marginRight: 10,
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RFIDScannerModal;
