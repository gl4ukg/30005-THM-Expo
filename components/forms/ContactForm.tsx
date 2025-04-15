import { LinkButton } from '@/components/UI/Button/LinkButton';
import { useAppContext } from '@/context/ContextProvider';
import { isMultiSelection } from '@/context/state';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { emailValidation } from '@/lib/util/validation';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ButtonTHS } from '../UI';
import { Input } from '../UI/Input/Input';
import { ListTable } from '../dashboard/listTable';
import { SelectField } from '../detailView/common/SelectField';
import { Typography } from '../Typography';

interface Props {
  title: string;
  subTitle: string;
  isRFQ?: boolean;
  hoses: HoseData[];
  fromScanPath?: boolean;
  onSave: (arg0: any) => void;
  onAdd?: (arg0: any) => void;
}
export const ContactForm: React.FC<Props> = ({
  title,
  subTitle,
  isRFQ = false,
  hoses,
  fromScanPath = false,
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
  const responsePathMapping: Record<string, string> = {
    'Scrap report': 'Add hose to this scrap report',
    RFQ: 'Add hose to RFQ',
    default: 'Add hose to this request',
  }; // TODO this cant be based on string, what about contactReason: "RFQ" | "SCRAP" | "CONTACT"
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
    (isRFQ && (!rfq || !rfqOptions.map((option) => option.id).includes(rfq)));

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
            {isRFQ && (
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
              label={isRFQ ? 'Delivery address / Comments' : 'Comment:'}
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
              items={originallySelectedHoses}
              selectedIds={selectedIds}
              onSelectionChange={handleSelectionChange}
              canSelect={true}
            />
            {fromScanPath && (
              <LinkButton
                variant='light'
                title={`${responsePathMapping[subTitle ?? 'default']}`}
                onPress={() => router.push('/scan')}
              />
            )}
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
