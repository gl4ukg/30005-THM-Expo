import { HoseType } from '@/app/(app)/dashbord/hoses/[filter]';
import { colors } from '@/lib/tokens/colors';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ButtonTHS } from '../UI';
import { Input } from '../UI/Input/input';
import { SelectField } from '../detailHose/SelectField';
import { Typography } from '../typography';
import { ListTable } from './listTable';
import { router } from 'expo-router';
import { useAppContext } from '@/context/ContextProvider';
import { emailValidation } from '@/lib/util/validation';

interface Props {
  title: string;
  subTitle: string;
  hoses: HoseType[];
  onSave: (arg0: any) => void;
  onAdd?: (arg0: any) => void;
}
export const ContactTess: React.FC<Props> = ({
  title,
  subTitle,
  hoses,
  onSave,
}) => {
  const { state } = useAppContext();

  const [comment, setComment] = useState('');
  const [name, setName] = useState(state.auth.user?.name || '');
  const [mail, setMail] = useState(state.auth.user?.email || '');
  const [phone, setPhone] = useState('');
  const [rfq, setRfq] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    hoses.map((h) => h.id),
  );

  const [emailError, setEmailError] = useState<undefined | string>(undefined);

  function handleMail(email: string) {
    setMail(email);
    const isValid = emailValidation(email);
    if (isValid === true) {
      setEmailError(undefined);
    } else setEmailError(isValid);
  }

  const handleSelectionChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  const isRfq = subTitle === 'RFQ' ? true : false;

  const rfqOptions = [
    {
      id: 'certificate',
      label: 'TESS to quote with pressure test and certificate',
    },
    { id: 'noPressureTest', label: 'TESS to quote without pressure test' },
    { id: 'Unspecified', label: 'Unspecified' },
  ];

  const isButtonDisabled =
    !name ||
    !mail ||
    !!emailError ||
    !phone ||
    selectedIds.length === 0 ||
    (isRfq && (!rfq || !rfqOptions.map((option) => option.id).includes(rfq)));

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <View style={style.selectedCounterContainer}>
            <View style={style.selectedCounterTitle}>
              <Typography name='navigationBold' text={title} />
              <Typography
                name='navigation'
                text={subTitle}
                style={style.selectedCounterTitle}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={style.pagePadding}>
            {isRfq && (
              <SelectField
                label={'RFQ type'}
                value={'Choose'}
                onChange={setRfq}
                onlyOptions={true}
                options={rfqOptions}
              />
            )}
            <Input
              type='textArea'
              label={'Comment:'}
              value={comment}
              onChangeText={setComment}
            />
            <Input
              type='text'
              label={'Name:'}
              value={name}
              onChangeText={setName}
            />
            <Input
              type='email'
              label={'Mail:'}
              value={mail}
              onChangeText={handleMail}
              errorMessage={emailError}
            />
            <Input
              type='tel'
              label={'Phone:'}
              value={phone}
              onChangeText={setPhone}
            />
            <View style={style.buttonContainer}>
              <ButtonTHS
                title={title}
                size='sm'
                disabled={isButtonDisabled}
                onPress={() =>
                  onSave({
                    comment,
                    name,
                    mail,
                    phone,
                    rfq,
                    selectedIds,
                  })
                }
              />
              <ButtonTHS
                title='Cancel'
                variant='tertiary'
                size='sm'
                onPress={() => router.back()}
              />
            </View>
          </View>
        }
        data={['key']}
        renderItem={() => (
          <>
            <ListTable
              items={hoses}
              selectedIds={selectedIds}
              onSelectionChange={handleSelectionChange}
              canSelect={true}
            />
          </>
        )}
      />
    </>
  );
};
const style = StyleSheet.create({
  selectedCounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    paddingBottom: 40,
  },
  selectedCounterTitle: {
    alignItems: 'center',
  },
  selectedCounterSubtitle: {
    color: colors.extended666,
  },
  pagePadding: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 50,
    paddingTop: 30,
  },
  buttonContainer: {
    paddingTop: 50,
    width: '100%',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
});
