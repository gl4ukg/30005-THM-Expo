import { RadioGroup } from '@/components/detailView/common/RadioGroup';
import { condition, replaceReasons } from '@/components/detailView/data/lists';
import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import { DateInput } from '@/components/UI/Input/DateInput';
import { Input } from '@/components/UI/Input/Input';
import { MultiSelect } from '@/components/UI/SelectModal/MultiSelect';
import { Select } from '@/components/UI/SelectModal/Select';
import { colors } from '@/lib/tokens/colors';
import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const Ui = () => {
  const [iconsExpanded, setIconsExpanded] = useState(false);
  const [typographyExpanded, setTypographyExpanded] = useState(false);
  const [buttonsExpanded, setButtonsExpanded] = useState(false);
  const [inputsExpanded, setInputsExpanded] = useState(false);
  const [radioBtnExpanded, setRadioBtnExpanded] = useState(false);
  const [selectExpanded, setSelectExpanded] = useState(true);
  const [datePickerExpanded, setdatePickerExpanded] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  const [name, setName] = useState('');
  const [genericText, setGenericText] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState<undefined | string>(undefined);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const passInputRef = useRef<TextInput>(null);

  const handleChangeName = (input: string) => {
    setName(input);

    if (input.length < 4) {
      setError(
        'Grapen bålgryte fra Origin Outdoors på 12 L er utelukkende laget av støpejern og er derfor meget robust. Dutch Ovens er ideelle for matlaging utendørs og kan plasseres direkte på åpen ild. Ovnene kjennetegnes ved sin fremragende varmeledningsevne og varmelagring over lang tid samt sin ekstreme robusthet. ',
      );
    } else {
      setError(undefined);
    }
  };

  return (
    <KeyboardAvoidingView style={{ height: '100%', flex: 1 }}>
      <SafeAreaView>
        <View
          style={{
            padding: 20,
            gap: 5,
            height: '100%',
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
                <Icon
                  name='RfidIdentificator'
                  size='xsm'
                  color={colors.black}
                />
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
              <View style={styles.rowWrapper}>
                <Icon name='Calendar' size='xsm' color={colors.black} />
                <Icon name='Calendar' size='sm' color={colors.black} />
                <Icon name='Calendar' size='md' color={colors.black} />
                <Typography text='Calendar' name='fieldLabel' />
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
                <ButtonTHS
                  variant='primary'
                  size='sm'
                  title='Button'
                  disabled
                />
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
                <ButtonTHS
                  variant='tertiary'
                  size='sm'
                  title='Button'
                  disabled
                />
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
                <Typography
                  text='numericalHighlight'
                  name='numericalHighlight'
                />
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
                <Typography
                  text='tableContentNumber'
                  name='tableContentNumber'
                />
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
            <View
              style={{ display: inputsExpanded ? 'flex' : 'none', gap: 10 }}
            >
              <View style={{ padding: 20, gap: 20 }}>
                <Input
                  label={'Your full email'}
                  value={genericText}
                  icon={'Email'}
                  type={'email'}
                  onChangeText={setGenericText}
                />
                <Input
                  label={'disabled'}
                  value={''}
                  onChangeText={() => {}}
                  disabled={true}
                  icon='Email'
                />
              </View>
              <View
                style={{ backgroundColor: colors.black, padding: 20, gap: 20 }}
              >
                <Input
                  label={'Your full name'}
                  value={name}
                  darkMode={true}
                  errorMessage={error}
                  icon={'User'}
                  onChangeText={handleChangeName}
                />
                <Input
                  label={'Your phone number'}
                  value={phone}
                  icon={'Phone'}
                  type={'tel'}
                  darkMode={true}
                  placeholder='(123) 456-7890'
                  onChangeText={setPhone}
                />
                <Input
                  label={'disabled(dark)'}
                  value={phone}
                  disabled={true}
                  darkMode={true}
                  onChangeText={setPhone}
                  icon='Phone'
                />
              </View>

              <ButtonTHS
                title={'focus on password'}
                onPress={() => {
                  if (passInputRef.current) {
                    passInputRef.current.isFocused()
                      ? passInputRef.current.blur()
                      : passInputRef.current?.focus();
                  }
                }}
              />
              <Input
                label={'Password'}
                value={genericText}
                icon={'User'}
                type={'password'}
                errorMessage={
                  passInputRef.current?.isFocused()
                    ? undefined
                    : 'Password must be at least 8 characters long and include a number and a special character.'
                }
                onChangeText={setGenericText}
                onBlur={() => console.log('blur')}
                ref={passInputRef}
                onFocus={() => console.log('focus on password')}
              />
              <Input
                label={'TextArea'}
                value={genericText}
                type={'textArea'}
                errorMessage={
                  genericText.length > 8
                    ? undefined
                    : 'Password must be at least 8 characters long and include a number and a special character.'
                }
                onChangeText={setGenericText}
              />
            </View>
            <Pressable
              style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}
              onPress={() => setRadioBtnExpanded(!radioBtnExpanded)}
            >
              <Typography
                text='Radio buttons'
                name='sectionHeaderCapslock'
                style={{ color: colors.black }}
              />
              {radioBtnExpanded ? (
                <Icon name='ChevronDown' size='md' color={colors.black} />
              ) : (
                <Icon name='ChevronRight' size='md' color={colors.black} />
              )}
            </Pressable>
            <View style={{ display: radioBtnExpanded ? 'flex' : 'none' }}>
              <RadioGroup
                label={'UV exposure'}
                choices={[
                  { id: '1', label: 'internal, not exposed' },
                  { id: '2', label: 'Exposed' },
                ]}
                selected={selectedChoiceId}
                onChange={setSelectedChoiceId}
                type={'horizontal'}
              />
            </View>
            <Pressable
              style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}
              onPress={() => setSelectExpanded(!selectExpanded)}
            >
              <Typography
                text='Select'
                name='sectionHeaderCapslock'
                style={{ color: colors.black }}
              />
              {selectExpanded ? (
                <Icon name='ChevronDown' size='md' color={colors.black} />
              ) : (
                <Icon name='ChevronRight' size='md' color={colors.black} />
              )}
            </Pressable>
            <View
              style={{
                display: selectExpanded ? 'flex' : 'none',
                paddingBottom: 30,
                gap: 30,
              }}
            >
              <Select
                label='Condition'
                selectedOption={selectedOption}
                onChange={(opt) => {
                  setSelectedOption(opt);
                  Alert.alert('You answer is:', opt);
                }}
                required={false}
                options={condition}
              />
              <Select
                label='Condition'
                selectedOption={selectedOption}
                onChange={(opt) => {
                  setSelectedOption(opt);
                  Alert.alert('You answer is:', opt);
                }}
                required={true}
                options={condition}
                hasAlternativeOption={true}
              />
              <MultiSelect
                label='Condition'
                options={replaceReasons}
                selectedOptions={selectedOptions}
                onSave={setSelectedOptions}
                required={true}
              />
            </View>
            <Pressable
              style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}
              onPress={() => setdatePickerExpanded(!datePickerExpanded)}
            >
              <Typography
                text='Datepicker'
                name='sectionHeaderCapslock'
                style={{ color: colors.black }}
              />
              {datePickerExpanded ? (
                <Icon name='ChevronDown' size='md' color={colors.black} />
              ) : (
                <Icon name='ChevronRight' size='md' color={colors.black} />
              )}
            </Pressable>
            <View style={{ display: datePickerExpanded ? 'flex' : 'none' }}>
              <Typography
                name={'fieldLabel'}
                style={{ color: colors.black }}
                text={`Date: ${date && date.toLocaleDateString()}`}
              />
              <DateInput
                label={'What Day is it?'}
                value={new Date()}
                onChange={setDate}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
