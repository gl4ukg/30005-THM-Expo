import { LinkButton } from '@/components/UI/Button/LinkButton';
import { useAppContext } from '@/context/ContextProvider';
import { isMultiSelection, MultiSelectionActionsType } from '@/context/state';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { emailValidation } from '@/lib/util/validation';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListTable } from '../dashboard/listTable';

import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { Input } from '@/components/UI/Input/Input';
import { SelectField } from '@/components/UI/SelectModal/SelectField';

const formLabels: Record<
  MultiSelectionActionsType,
  { title: string; subtitle: string; confirmButton: string }
> = {
  RFQ: {
    title: 'Order hoses',
    subtitle: 'Request for quote',
    confirmButton: 'Send RFQ',
  },
  CONTACT: {
    title: 'Contact TESS Team',
    subtitle: 'Message',
    confirmButton: 'Send message',
  },
  SCRAP: {
    title: 'Scrap hoses',
    subtitle: 'Scrap report',
    confirmButton: 'Scrap hoses',
  },
};

interface Props {
  contactType: MultiSelectionActionsType;
  hoses: HoseData[];
  allowScanToAdd?: boolean;
  onSave: (arg0: any) => void;
}
export const ContactForm: React.FC<Props> = ({
  hoses,
  contactType,
  allowScanToAdd = false,
  onSave,
}) => {
  const { state, dispatch } = useAppContext();
  const [comment, setComment] = useState('');
  const [name, setName] = useState(state.auth.user?.name || '');
  const [mail, setMail] = useState(state.auth.user?.email || '');
  const [phone, setPhone] = useState('');
  const [rfq, setRfq] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    hoses.map((h) => h.id),
  );
  const originallySelectedHoses = useMemo(() => hoses, []);
  const [emailError, setEmailError] = useState<undefined | string>(undefined);
  function handleMail(email: string) {
    setMail(email);
    const isValid = emailValidation(email);
    if (isValid === true) {
      setEmailError(undefined);
    } else setEmailError(isValid);
  }
  const handleSelectionChange = (id: string) => {
    if (isMultiSelection(state.data.selection))
      dispatch({
        type: 'TOGGLE_HOSE_MULTI_SELECTION',
        payload: id,
      });
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

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
    (contactType === 'RFQ' &&
      (!rfq || !rfqOptions.map((option) => option.id).includes(rfq)));

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <View style={styles.selectedCounterContainer}>
            <Typography
              name='navigationBold'
              text={formLabels[contactType].title}
              style={styles.selectedCounterTitle}
            />
            <Typography
              name='navigation'
              text={formLabels[contactType].subtitle}
              style={styles.selectedCounterSubtitle}
            />
          </View>
        }
        ListFooterComponent={
          <View style={styles.pagePadding}>
            {contactType === 'RFQ' && (
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
              label={
                contactType === 'RFQ'
                  ? 'Delivery address / Comments'
                  : 'Comment:'
              }
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
            <View style={styles.buttonContainer}>
              <ButtonTHS
                title={formLabels[contactType].confirmButton}
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
        data={['one']}
        renderItem={() => (
          <>
            {selectedIds.length > 0 && (
              <ListTable
                items={originallySelectedHoses}
                selectedIds={selectedIds}
                onSelectionChange={handleSelectionChange}
                canSelect={true}
              />
            )}
            {allowScanToAdd && (
              <View style={styles.addHoseContainer}>
                <LinkButton
                  variant='light'
                  title={`+ Add hoses to this ${formLabels[contactType].title.toLowerCase()}`}
                  onPress={() => router.push('/scan?scanPurpose=SCRAP')}
                />
              </View>
            )}
          </>
        )}
      />
    </>
  );
};
const styles = StyleSheet.create({
  selectedCounterContainer: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 30,
  },
  selectedCounterTitle: {
    color: colors.black,
  },
  selectedCounterSubtitle: {
    color: colors.extended333,
  },
  pagePadding: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 50,
    paddingTop: 30,
  },
  addHoseContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 10,
  },
  buttonContainer: {
    paddingTop: 30,
    width: '100%',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
});
