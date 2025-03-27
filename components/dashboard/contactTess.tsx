import { HoseType } from '@/app/(app)/dashbord/hoses/[filter]';
import { colors } from '@/lib/tokens/colors';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ButtonTHS } from '../UI';
import { Input } from '../UI/Input/input';
import { SelectField } from '../detailHose/SelectField';
import { Typography } from '../typography';
import { ListTable } from './listTable';

interface Props {
  title: string;
  subTitle: string;
  hoses: HoseType[];
  isRfq?: boolean;
  onSave: (arg0: any) => void;
  onAdd?: (arg0: any) => void;
}
export const ContactTess: React.FC<Props> = ({
  title,
  subTitle,
  hoses,
  isRfq = false,
  onSave,
}) => {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [rfq, setRfq] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    hoses.map((h) => h.id),
  );

  const handleSelectionChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <>
      <ScrollView>
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
        <ListTable
          items={hoses}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
          canSelect={true}
        />
        <View style={style.pagePadding}>
          {isRfq && (
            <SelectField
              label={'RFQ type'}
              value={'Choose'}
              onChange={setRfq}
              options={[
                {
                  id: 'certificate',
                  label: 'TESS to quote with pressure test and certificate',
                },
                {
                  id: 'noPressureTest',
                  label: 'TESS to quote without pressure test',
                },
              ]}
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
            onChangeText={setMail}
          />
          <Input
            type='tel'
            label={'Phone:'}
            value={phone}
            onChangeText={setPhone}
          />
          <View style={style.buttonContainer}>
            <ButtonTHS title={title} size='sm' onPress={onSave} />
            <ButtonTHS title='Cancel' variant='tertiary' size='sm' />
          </View>
        </View>
      </ScrollView>
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
