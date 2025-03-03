import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { ButtonTHS } from '@/components/UI';
import { LinkButton } from '@/components/UI/Button/linkButton';
import { Input } from '@/components/UI/Input/input';
import { colors } from '@/lib/tokens/colors';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Ui = () => {
  const [iconsExpanded, setIconsExpanded] = useState(false);
  const [typographyExpanded, setTypographyExpanded] = useState(false);
  const [buttonsExpanded, setButtonsExpanded] = useState(false);
  const [inputsExpanded, setInputsExpanded] = useState(true);

  return (
    <SafeAreaView style={{ height: '100%', flex: 1 }}>
      <View
        style={{
          padding: 20,
          gap: 5,
          height: '100%',
          borderColor: 'red',
          borderWidth: 1,
        }}
      >
        <View
          style={{
            padding: 10,
            borderColor: 'black',
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href='/'
            style={{ padding: 5, backgroundColor: colors.dashbordGreen }}
          >
            <Text>Dashboard</Text>
          </Link>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Pressable
            style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}
            onPress={() => setIconsExpanded(!iconsExpanded)}
          >
            <Typography
              text='Icons'
              name='sectionHeaderCapslock'
              style={{ color: colors.black }}
            />
            {iconsExpanded ? (
              <Icon name='ChevronDown' size='md' color={colors.black} />
            ) : (
              <Icon name='ChevronRight' size='md' color={colors.black} />
            )}
          </Pressable>
          <View style={{ display: iconsExpanded ? 'flex' : 'none' }}>
            <View style={styles.rowWrapper}>
              <Icon name='Alert' size='xsm' color={colors.black} />
              <Icon name='Alert' size='sm' color={colors.black} />
              <Icon name='Alert' size='md' color={colors.black} />
              <Typography text='Alert' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='User' size='xsm' color={colors.black} />
              <Icon name='User' size='sm' color={colors.black} />
              <Icon name='User' size='md' color={colors.black} />
              <Typography text='User' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Locked' size='xsm' color={colors.black} />
              <Icon name='Locked' size='sm' color={colors.black} />
              <Icon name='Locked' size='md' color={colors.black} />
              <Typography text='Locked' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Password' size='xsm' color={colors.black} />
              <Icon name='Password' size='sm' color={colors.black} />
              <Icon name='Search' size='md' color={colors.black} />
              <Typography text='Password' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Download' size='xsm' color={colors.black} />
              <Icon name='Download' size='sm' color={colors.black} />
              <Icon name='Download' size='md' color={colors.black} />
              <Typography text='Download' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Upload' size='xsm' color={colors.black} />
              <Icon name='Upload' size='sm' color={colors.black} />
              <Icon name='Upload' size='md' color={colors.black} />
              <Typography text='Upload' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Search' size='xsm' color={colors.black} />
              <Icon name='Search' size='sm' color={colors.black} />
              <Icon name='Search' size='md' color={colors.black} />
              <Typography text='Search' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Meter' size='xsm' color={colors.black} />
              <Icon name='Meter' size='sm' color={colors.black} />
              <Icon name='Meter' size='md' color={colors.black} />
              <Typography text='Meter' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Search' size='xsm' color={colors.black} />
              <Icon name='Search' size='sm' color={colors.black} />
              <Icon name='Search' size='md' color={colors.black} />
              <Typography text='Search' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Cart' size='xsm' color={colors.black} />
              <Icon name='Cart' size='sm' color={colors.black} />
              <Icon name='Cart' size='md' color={colors.black} />
              <Typography text='Cart' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Task' size='xsm' color={colors.black} />
              <Icon name='Task' size='sm' color={colors.black} />
              <Icon name='Task' size='md' color={colors.black} />
              <Typography text='Task' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Trash' size='xsm' color={colors.black} />
              <Icon name='Trash' size='sm' color={colors.black} />
              <Icon name='Trash' size='md' color={colors.black} />
              <Typography text='Trash' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Email' size='xsm' color={colors.black} />
              <Icon name='Email' size='sm' color={colors.black} />
              <Icon name='Email' size='md' color={colors.black} />
              <Typography text='Email' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Settings' size='xsm' color={colors.black} />
              <Icon name='Settings' size='sm' color={colors.black} />
              <Icon name='Settings' size='md' color={colors.black} />
              <Typography text='Settings' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Menu' size='xsm' color={colors.black} />
              <Icon name='Menu' size='sm' color={colors.black} />
              <Icon name='Menu' size='md' color={colors.black} />
              <Typography text='Menu' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='ChevronLeft' size='xsm' color={colors.black} />
              <Icon name='ChevronLeft' size='sm' color={colors.black} />
              <Icon name='ChevronLeft' size='md' color={colors.black} />
              <Typography text='ChevronLeft' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='ChevronRight' size='xsm' color={colors.black} />
              <Icon name='ChevronRight' size='sm' color={colors.black} />
              <Icon name='ChevronRight' size='md' color={colors.black} />
              <Typography text='ChevronRight' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='ChevronUp' size='xsm' color={colors.black} />
              <Icon name='ChevronUp' size='sm' color={colors.black} />
              <Icon name='ChevronUp' size='md' color={colors.black} />
              <Typography text='ChevronUp' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='ChevronDown' size='xsm' color={colors.black} />
              <Icon name='ChevronDown' size='sm' color={colors.black} />
              <Icon name='ChevronDown' size='md' color={colors.black} />
              <Typography text='ChevronDown' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='CaretRight' size='xsm' color={colors.black} />
              <Icon name='CaretRight' size='sm' color={colors.black} />
              <Icon name='CaretRight' size='md' color={colors.black} />
              <Typography text='CaretRight' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='CaretLeft' size='xsm' color={colors.black} />
              <Icon name='CaretLeft' size='sm' color={colors.black} />
              <Icon name='CaretLeft' size='md' color={colors.black} />
              <Typography text='CaretLeft' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='CaretUp' size='xsm' color={colors.black} />
              <Icon name='CaretUp' size='sm' color={colors.black} />
              <Icon name='CaretUp' size='md' color={colors.black} />
              <Typography text='CaretUp' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='CaretDown' size='xsm' color={colors.black} />
              <Icon name='CaretDown' size='sm' color={colors.black} />
              <Icon name='CaretDown' size='md' color={colors.black} />
              <Typography text='CaretDown' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Inspect' size='xsm' color={colors.black} />
              <Icon name='Inspect' size='sm' color={colors.black} />
              <Icon name='Inspect' size='md' color={colors.black} />
              <Typography text='Inspect' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Cross' size='xsm' color={colors.black} />
              <Icon name='Cross' size='sm' color={colors.black} />
              <Icon name='Cross' size='md' color={colors.black} />
              <Typography text='Cross' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='ArrowRight' size='xsm' color={colors.black} />
              <Icon name='ArrowRight' size='sm' color={colors.black} />
              <Icon name='ArrowRight' size='md' color={colors.black} />
              <Typography text='ArrowRight' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='ArrowLeft' size='xsm' color={colors.black} />
              <Icon name='ArrowLeft' size='sm' color={colors.black} />
              <Icon name='ArrowLeft' size='md' color={colors.black} />
              <Typography text='ArrowLeft' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Image' size='xsm' color={colors.black} />
              <Icon name='Image' size='sm' color={colors.black} />
              <Icon name='Image' size='md' color={colors.black} />
              <Typography text='Image' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Camera' size='xsm' color={colors.black} />
              <Icon name='Camera' size='sm' color={colors.black} />
              <Icon name='Camera' size='md' color={colors.black} />
              <Typography text='Camera' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='RegisterHoses' size='xsm' color={colors.black} />
              <Icon name='RegisterHoses' size='sm' color={colors.black} />
              <Icon name='RegisterHoses' size='md' color={colors.black} />
              <Typography text='RegisterHoses' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='RfidIdentificator' size='xsm' color={colors.black} />
              <Icon name='RfidIdentificator' size='sm' color={colors.black} />
              <Icon name='RfidIdentificator' size='md' color={colors.black} />
              <Typography text='RfidIdentificator' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Attachment' size='xsm' color={colors.black} />
              <Icon name='Attachment' size='sm' color={colors.black} />
              <Icon name='Attachment' size='md' color={colors.black} />
              <Typography text='Attachment' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='RFID' size='xsm' color={colors.black} />
              <Icon name='RFID' size='sm' color={colors.black} />
              <Icon name='RFID' size='md' color={colors.black} />
              <Typography text='RFID' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Barcode' size='xsm' color={colors.black} />
              <Icon name='Barcode' size='sm' color={colors.black} />
              <Icon name='Barcode' size='md' color={colors.black} />
              <Typography text='Barcode' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Icon name='Alert' size='xsm' color={colors.black} />
              <Icon name='Alert' size='sm' color={colors.black} />
              <Icon name='Alert' size='md' color={colors.black} />
              <Typography text='Alert' name='fieldLabel' />
            </View>
          </View>
          <Pressable
            style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}
            onPress={() => setButtonsExpanded(!buttonsExpanded)}
          >
            <Typography
              text='Buttons'
              name='sectionHeaderCapslock'
              style={{ color: colors.black }}
            />
            {buttonsExpanded ? (
              <Icon name='ChevronDown' size='md' color={colors.black} />
            ) : (
              <Icon name='ChevronRight' size='md' color={colors.black} />
            )}
          </Pressable>
          <View style={{ display: buttonsExpanded ? 'flex' : 'none' }}>
            <View style={styles.group}>
              <Typography name='sectionHeader' text='Light' />
              <LinkButton variant='light' title='Forgot password?' />
              <LinkButton variant='light' title='Forgot password?' disabled />
            </View>
            <View style={[styles.group, styles.groupDark]}>
              <Typography
                name='sectionHeader'
                text='Dark'
                style={styles.whiteText}
              />
              <LinkButton
                variant='dark'
                title='Request access'
                vSpace={5}
                hSpace={10}
              />
              <LinkButton variant='dark' title='Request access' disabled />
            </View>
            <View style={styles.group}>
              <Typography name='sectionHeader' text='Primary' />
              <ButtonTHS variant='primary' title='Button' />
              <ButtonTHS variant='primary' title='Button' disabled />
            </View>
            <View style={styles.group}>
              <Typography name='sectionHeader' text='Secondary' />
              <ButtonTHS variant='secondary' title='Button' />
              <ButtonTHS variant='secondary' title='Button' disabled />
            </View>
            <View style={styles.group}>
              <Typography name='sectionHeader' text='Tertiary' />
              <ButtonTHS variant='tertiary' title='Button' />
              <ButtonTHS variant='tertiary' title='Button' disabled />
            </View>
            <View style={styles.group}>
              <Typography name='sectionHeader' text='Primary Small' />
              <ButtonTHS variant='primary' size='sm' title='Button' />
              <ButtonTHS variant='primary' size='sm' title='Button' disabled />
            </View>
            <View style={styles.group}>
              <Typography name='sectionHeader' text='Secondary Small' />
              <ButtonTHS variant='secondary' size='sm' title='Button' />
              <ButtonTHS
                variant='secondary'
                size='sm'
                title='Button'
                disabled
              />
            </View>
            <View style={styles.group}>
              <Typography name='sectionHeader' text='Tertiary Small' />
              <ButtonTHS variant='tertiary' size='sm' title='Button' />
              <ButtonTHS variant='tertiary' size='sm' title='Button' disabled />
            </View>
          </View>
          <Pressable
            style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}
            onPress={() => setTypographyExpanded(!typographyExpanded)}
          >
            <Typography
              text='Typography'
              name='sectionHeaderCapslock'
              style={{ color: colors.black }}
            />
            {typographyExpanded ? (
              <Icon name='ChevronDown' size='md' color={colors.black} />
            ) : (
              <Icon name='ChevronRight' size='md' color={colors.black} />
            )}
          </Pressable>
          <View
            style={{ display: typographyExpanded ? 'flex' : 'none', gap: 10 }}
          >
            <View style={styles.rowWrapper}>
              <Typography text='Button' name='button' />
              <Typography text=' - ' name='button' />
              <Typography text='button' name='button' />
            </View>
            <View style={styles.rowWrapper}>
              <Typography text='Button CL' name='buttonCapsLock' />
              <Typography text=' - ' name='buttonCapsLock' />
              <Typography text='buttonCapsLock' name='buttonCapsLock' />
            </View>
            <View style={styles.rowWrapper}>
              <Typography text='Navigation' name='navigation' />
              <Typography text=' - ' name='navigation' />
              <Typography text='navigation' name='navigation' />
            </View>
            <View style={styles.rowWrapper}>
              <Typography text='Navigation Bold' name='navigationBold' />
              <Typography text=' - ' name='navigationBold' />
              <Typography text='navigationBold' name='navigationBold' />
            </View>
            <View style={styles.rowWrapper}>
              <Typography text='Section Header' name='sectionHeader' />
              <Typography text=' - ' name='sectionHeader' />
              <Typography text='sectionHeader' name='sectionHeader' />
            </View>
            <View style={styles.rowWrapper}>
              <Typography
                text='Section Header CL'
                name='sectionHeaderCapslock'
              />
              <Typography text=' - ' name='sectionHeaderCapslock' />
              <Typography
                text='sectionHeaderCapslock'
                name='sectionHeaderCapslock'
              />
            </View>
            <View style={styles.rowWrapper}>
              <Typography
                text='Numerical Highlight'
                name='numericalHighlight'
              />
              <Typography text=' - ' name='numericalHighlight' />
              <Typography text='numericalHighlight' name='numericalHighlight' />
            </View>
            <View style={styles.rowWrapper}>
              <Typography text='Field Label' name='fieldLabel' />
              <Typography text=' - ' name='fieldLabel' />
              <Typography text='fieldLabel' name='fieldLabel' />
            </View>
            <View style={styles.rowWrapper}>
              <Typography text='Field Value' name='fieldValue' />
              <Typography text=' - ' name='fieldValue' />
              <Typography text='fieldValue' name='fieldValue' />
            </View>
            <View style={styles.rowWrapper}>
              <Typography text='Table Header' name='tableHeader' />
              <Typography text=' - ' name='tableHeader' />
              <Typography text='tableHeader' name='tableHeader' />
            </View>
            <View style={styles.rowWrapper}>
              <Typography text='Table Content' name='tableContent' />
              <Typography text=' - ' name='tableContent' />
              <Typography text='tableContent' name='tableContent' />
            </View>
            <View style={styles.rowWrapper}>
              <Typography
                text='Table Content Number'
                name='tableContentNumber'
              />
              <Typography text=' - ' name='tableContentNumber' />
              <Typography text='tableContentNumber' name='tableContentNumber' />
            </View>
          </View>
          <Pressable
            style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}
            onPress={() => setInputsExpanded(!inputsExpanded)}
          >
            <Typography
              text='Inputs'
              name='sectionHeaderCapslock'
              style={{ color: colors.black }}
            />
            {inputsExpanded ? (
              <Icon name='ChevronDown' size='md' color={colors.black} />
            ) : (
              <Icon name='ChevronRight' size='md' color={colors.black} />
            )}
          </Pressable>
          <View style={{ display: inputsExpanded ? 'flex' : 'none' }}>
            <Input
              label={'Your full name'}
              value={''}
              darkmode={true}
              icon={'User'}
              onChangeText={function (text: string): void {}}
            />
            <Input
              label={'Your full name'}
              value={''}
              icon={'User'}
              onChangeText={function (text: string): void {}}
            />
            <Input
              label={'Password'}
              value={''}
              icon={'User'}
              errorMessage='Password must be at least 8 characters long and include a number and a special character.'
              onChangeText={function (text: string): void {}}
            />
            <Input
              label={'TextArea'}
              value={''}
              multiline={true}
              onChangeText={function (text: string): void {}}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Ui;

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopColor: colors.primary,
    borderTopWidth: 2,
  },
  group: {
    // width: "100%",
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    gap: 20,
    marginBottom: 30,
  },
  groupDark: {
    backgroundColor: colors.primary95,
  },
  whiteText: {
    color: colors.white,
  },
});
