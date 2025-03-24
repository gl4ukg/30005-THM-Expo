import { ContactTess } from '@/components/dashboard/contactTess';
import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { useAppContext } from '@/context/ContextProvider';
import { ActionRFQ, ActionsType } from '@/context/state';
import { colors } from '@/lib/tokens/colors';
import { useLocalSearchParams } from 'expo-router';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
const spacing = {
  paddingBlock: 10,
};

interface Props {}
const Action: React.FC<Props> = (props) => {
  const { actionType: actType } = useLocalSearchParams();
  const { state, dispatch } = useAppContext();
  console.log('asd', actType);
  if (Array.isArray(actType)) throw new Error('To many parameters');
  const actionType = actType.toUpperCase() as ActionsType;

  const handleRemove = (id: string, actionType: ActionsType) =>
    dispatch({ type: 'REMOVE_ACTION', payload: { id, actionType } });

  const actionsMap = {
    CONTACT: ['Contact TESS Team', 'Message details'],
    RFQ: ['Order hoses - RFQ', 'RFQ'],
    SCRAP: ['Scrap', 'Scrap report'],
  } as const;
  return (
    <>
      <ContactTess
        title={actionsMap[actionType][0] || 'Actions'}
        subTitle={actionsMap[actionType][1]}
        hoses={state.data.assignedUnits['testPrinces'].hoses}
        onSave={function (arg0: any): void {
          throw new Error('Function not implemented.');
        }}
        onAdd={function (arg0: any): void {
          throw new Error('Function not implemented.');
        }}
      />
      {/* 

      <View style={style.header}>
        <Typography
          name='sectionHeader'
          text={actionsMap[actionType] || 'Actions'}
        />
        <Typography name='navigation' text='Overview' />
      </View>

      <View style={style.table}>
        <View
          style={[
            style.tableHeader,
            {
              paddingLeft: spacing.paddingBlock,
              paddingRight: spacing.paddingBlock,
            },
          ]}
        >
          <Typography
            name='tableHeader'
            text='ID#'
            style={[style.label, columns.one]}
          />
          <View style={columns.two}>
            <View style={columns.twoUp}>
              <Typography
                name='tableHeader'
                text='Status'
                style={[style.label, columns.twoUpOne]}
              />
              <Typography
                name='tableHeader'
                text='Pressure test'
                style={[style.label, columns.twoUpTwo]}
              />
              <Typography
                name='tableHeader'
                text='Created'
                style={[style.label, columns.twoUpThree]}
              />
            </View>
          </View>
          <View style={columns.three} />
        </View>
        <FlatList
          data={state.data.actions['RFQ']}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ActionElement
              item={{ ...item }}
              onRemove={() => handleRemove(item.id, actionType)}
              onRowPress={() => console.log('row press')}
            />
          )}
        />
      </View>
          */}
    </>
  );
};
interface ActionElementProps {
  item: ActionRFQ;
  onRowPress: () => void;
  onRemove: () => void;
}
const ActionElement: React.FC<ActionElementProps> = ({
  item,
  onRowPress,
  onRemove,
}) => {
  const { id, status, pressureTested, createdAt, actionHoseIdList, position } =
    item;
  return (
    <View
      style={[
        actionElementStyle.rowContainer,
        {
          paddingLeft: spacing.paddingBlock,
          paddingRight: spacing.paddingBlock,
        },
      ]}
    >
      <Pressable onPress={onRowPress} style={actionElementStyle.pressableRow}>
        <View style={columns.one}>
          <Typography
            name='tableContentNumber'
            text={id}
            style={actionElementStyle.number}
          />
        </View>
        <View style={columns.two}>
          <View style={columns.twoUp}>
            <Typography
              numberOfLines={1}
              name='tableContent'
              text={status}
              style={columns.twoUpOne}
            />
            <Typography
              numberOfLines={1}
              name='tableContent'
              text={pressureTested ? 'Yes' : 'No'}
              style={columns.twoUpTwo}
            />
            <Typography
              numberOfLines={1}
              name='tableContent'
              text={createdAt}
              style={[actionElementStyle.number, columns.twoUpThree]}
            />
          </View>
          <View style={columns.twoDown}>
            <Typography
              numberOfLines={1}
              name='tableContent'
              text={`${actionHoseIdList?.length} on ${position}`}
            />
          </View>
        </View>
      </Pressable>
      <View style={columns.three}>
        <Pressable onPress={onRemove} style={actionElementStyle.removeButton}>
          <Icon name='Cross' color={colors.errorText} size='lg' />
        </Pressable>
      </View>
    </View>
  );
};

const columns = StyleSheet.create({
  one: {
    width: 80,
  },
  two: {
    flex: 1,
  },
  twoUp: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 10,
    flexDirection: 'row',
  },
  twoUpOne: { flex: 1 },
  twoUpTwo: { flex: 1 },
  twoUpThree: {
    textAlign: 'right',
    width: 50,
  },
  twoDown: {},
  three: {
    width: 40,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

const actionElementStyle = StyleSheet.create({
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomColor: colors.secondary95,
    borderBottomWidth: 1,
    gap: 5,
  },
  pressableRow: {
    flex: 1,
    gap: 5,
    flexDirection: 'row',
  },
  removeWrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: colors.extended666,
  },
  removeButton: {
    width: 'auto',
  },
});

const style = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 50,
  },
  table: {
    width: '100%',
    flex: 1,
  },
  tableHeader: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    paddingBottom: 2,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
  label: {
    alignSelf: 'flex-start',
  },
});

export default Action;
