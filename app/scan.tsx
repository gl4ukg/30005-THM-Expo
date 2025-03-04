import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { ButtonTHS } from '@/components/UI';
import { LinkButton } from '@/components/UI/Button/linkButton';
import { colors } from '@/lib/tokens/colors';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const Ui = () => {
  const [scanMethod, setScanMethod] = useState<'RFID' | 'Barcode'>('Barcode');

  const handleRFIDPress = () => {
    setScanMethod('RFID');
  };
  const handleBarcodePress = () => {
    setScanMethod('Barcode');
  };
  return (
    <>
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
                height: 30,
                borderRadius: 3,
                borderColor: colors.primary25,
                borderWidth: 1,
              }}
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
      <ScrollView contentContainerStyle={styles.scrollView}></ScrollView>
    </>
  );
};

export default Ui;

const styles = StyleSheet.create({
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
