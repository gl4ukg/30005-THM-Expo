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

interface Props {
  title: string;
  subTitle: string;
  icon: IconName;
  hoses: HoseType[];
}
export const ContactTess: React.FC<Props> = ({
  title,
  subTitle,
  icon,
  hoses,
}) => {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View>
      <View style={style.selectedCounterContainer}>
        <View style={style.selectedCounterTitle}>
          <Typography name='navigation' text={title} />
          <Typography
            name='navigation'
            text={subTitle}
            style={style.selectedCounterTitle}
          />
        </View>
        <View style={style.selectionCounter}>
          <SelectedHoseCounter
            icon={icon}
            counter={hoses.length}
            handlePress={() => {}}
          />
        </View>
      </View>
      <ListTable
        items={hoses}
        selectedIds={[]}
        canSelect={false}
        onSelectAll={() => {}}
      />
      <Input
        type='textArea'
        label={'Comment:'}
        value={comment}
        onChangeText={setComment}
      />
      <Input type='text' label={'Name:'} value={name} onChangeText={setName} />
      <Input type='email' label={'Mail:'} value={mail} onChangeText={setMail} />
      <Input
        type='tel'
        label={'Phone:'}
        value={phone}
        onChangeText={setPhone}
      />
      <ButtonTHS title={title} />
    </View>
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
  selectionCounter: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
  },
});
