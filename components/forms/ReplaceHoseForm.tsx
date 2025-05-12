import { ListTable } from '@/components/dashboard/listTable';
import {
  replaceImpacts,
  replaceReasons,
} from '@/components/detailView/data/lists';
import { TooltipWrapper } from '@/components/detailView/edit/TooltipWrapper';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import { Input } from '@/components/UI/Input/Input';
import { MultiSelect } from '@/components/UI/SelectModal/MultiSelect';
import { Select } from '@/components/UI/SelectModal/Select';
import { useAppContext } from '@/context/ContextProvider';
import { isMultiSelection } from '@/context/state';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { emailValidation } from '@/lib/util/validation';
import { router } from 'expo-router';
import { FC, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface Props {
  hoses: HoseData[];
  onSave: (formData: Record<string, string | undefined>) => void;
}

export const ReplaceHoseForm: FC<Props> = ({ hoses, onSave }) => {
  const { state, dispatch } = useAppContext();
  const [selectedIds, setSelectedIds] = useState<number[]>(
    hoses.map((h) => h.assetId),
  );
  const [replacementType, setReplacementType] = useState('Planned');
  const [replacementReasons, setReplacementReasons] = useState<string[]>([]);
  const [replacementImpacts, setReplacementImpacts] = useState<string[]>([]);
  const [downtime, setDowntime] = useState('');
  const [comment, setComment] = useState('');
  const [name, setName] = useState(state.auth.user?.name || '');
  const [email, setEmail] = useState(state.auth.user?.email || '');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState<undefined | string>(undefined);
  const originallySelectedHoses = useMemo(() => hoses, []);

  const handleEmail = (email: string) => {
    setEmail(email);
    const validation = emailValidation(email);
    if (validation === true) {
      setEmailError(undefined);
    } else setEmailError(validation);
  };

  const handleSelectionChange = (id: number) => {
    if (!isMultiSelection(state.data.selection)) {
      console.error('Not a multi selection');
      return;
    }
    dispatch({
      type: 'TOGGLE_HOSE_MULTI_SELECTION',
      payload: id,
    });
  };

  const isButtonDisabled = !name || !email || !!emailError || !phone;
  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.listHeaderComponent}>
          <Typography
            name='navigationBold'
            text='Replace hose'
            style={styles.contactTitle}
          />
          <Typography
            name='navigation'
            text='Replacement'
            style={styles.contactSubtitle}
          />
        </View>
      }
      ListFooterComponent={
        <View style={styles.inputsContainer}>
          <TooltipWrapper
            tooltipData={{ title: 'Replacement type', message: '' }}
          >
            <Select
              label='Replacement type:'
              selectedOption={replacementType}
              onChange={setReplacementType}
              hasAlternativeOption={false}
              options={['Planned', 'Unplanned']}
            />
          </TooltipWrapper>
          {replacementType === 'Unplanned' && (
            <>
              <TooltipWrapper
                tooltipData={{ title: 'Reason for replacement', message: '' }}
              >
                <MultiSelect
                  label='Reason:'
                  options={replaceReasons}
                  selectedOptions={replacementReasons}
                  onSave={setReplacementReasons}
                />
              </TooltipWrapper>
              <TooltipWrapper
                tooltipData={{ title: 'Impact of replacement', message: '' }}
              >
                <MultiSelect
                  label='Impact:'
                  options={replaceImpacts}
                  selectedOptions={replacementImpacts}
                  onSave={setReplacementImpacts}
                />
              </TooltipWrapper>
              <TooltipWrapper tooltipData={{ title: 'Downtime', message: '' }}>
                <Input
                  type='numeric'
                  label='Did it cause any downtime? (hours)'
                  value={downtime}
                  onChangeText={setDowntime}
                />
              </TooltipWrapper>
            </>
          )}
          <Input
            type='textArea'
            label='Comment:'
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
            value={email}
            onChangeText={handleEmail}
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
              title='Replace hoses'
              size='sm'
              disabled={isButtonDisabled}
              onPress={() =>
                onSave({
                  name,
                  mail: email,
                  phone,
                  comment,
                  selectedIds: selectedIds.join(','),
                  replacementType,
                  replacementReasons:
                    replacementType === 'Unplanned'
                      ? replacementReasons.join(',')
                      : undefined,
                  replacementImpacts:
                    replacementType === 'Unplanned'
                      ? replacementImpacts.join(',')
                      : undefined,
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
          <ListTable
            items={originallySelectedHoses}
            selectedIds={selectedIds}
            onSelectionChange={handleSelectionChange}
            canSelect={true}
          />
          <View style={styles.addHoseContainer}>
            <LinkButton
              variant='light'
              title={`+ Add hose to this replacement report`}
              onPress={() => router.push(`/scan?scanPurpose=REPLACE_HOSE`)}
            />
          </View>
        </>
      )}
    />
  );
};
const styles = StyleSheet.create({
  listHeaderComponent: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 30,
  },
  contactTitle: {
    color: colors.black,
  },
  contactSubtitle: {
    color: colors.extended333,
  },
  inputsContainer: {
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
