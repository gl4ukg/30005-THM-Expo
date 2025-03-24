import { StyleSheet, View } from 'react-native';
import { Typography } from '../typography';
import { ListTable } from './listTable';
import { Input } from '../UI/Input/input';
import { useState } from 'react';
import { HoseType } from '@/app/(app)/dashbord/hoses/[filter]';
import { SelectedHoseCounter } from './selectedHoseCounter';
import { IconName } from '../Icon/iconMapping';
import { colors } from '@/lib/tokens/colors';
import { ButtonTHS } from '../UI';
import { SelectField } from '../detailHose/SelectField';

interface Props {
  title: string;
  subTitle: string;
  hoses: HoseType[];
  isRfq?: boolean;
  onSave: (arg0: any) => void;
  onAdd: (arg0: any) => void;
}
export const ContactTess: React.FC<Props> = ({
  title,
  subTitle,
  hoses,
  isRfq = false,
}) => {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');

  console.log('hl', hoses[0].id);
  return (
    <>
      <View style={style.selectedCounterContainer}>
        <View style={style.selectedCounterTitle}>
          <Typography name='navigation' text={title} />
          <Typography
            name='navigation'
            text={subTitle}
            style={style.selectedCounterTitle}
          />
        </View>
      </View>
      <ListTable
        items={hoses}
        selectedIds={[hoses[0].id, hoses[1].id]}
        canSelect={false}
        onSelectAll={() => {}}
      />
      <View style={style.pagePadding}>
        {isRfq && (
          <SelectField
            label={'RFQ type'}
            value={'Choose'}
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
            options={[
              {
                id: 'certificate',
                label: 'TESS to quote with pressure test and certificate',
              },
              {
                id: 'noPressureTest',
                label: 'TESS to quote without pressure test',
              },
              { id: 'unspecified', label: 'Unspecified' },
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
        <ButtonTHS title={title} size='sm' />
        <ButtonTHS title='Cancel' variant='tertiary' size='sm' />
      </View>
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
  },
});
