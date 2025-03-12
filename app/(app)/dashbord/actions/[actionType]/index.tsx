import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { useAppContext } from '@/context/ContextProvider';
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

const items = [
  {
    id: '30277254',
    status: 'Draft',
    pressureTested: true,
    createdAt: '311224',
    noOfHoses: 24,
    position: 'Deck crane',
  },
  {
    id: '30277254',
    status: 'Sent',
    pressureTested: false,
    createdAt: '011223',
    noOfHoses: 24,
    position: 'Deck crane',
  },
];
interface Props {}
const Action: React.FC<Props> = (props) => {
  const { state, dispatch } = useAppContext();

  const { actionType } = useLocalSearchParams();

  const actionsMap = {
    contact: 'Contact TESS Team',
    quote: 'Order hoses - RFQ',
    scrap: 'Scrap',
  } as const;

  return (
    <>
      <View style={style.header}>
        <Typography
          name='sectionHeader'
          text={actionsMap[actionType as keyof typeof actionsMap] || 'Actions'}
        />
        <Typography name='navigation' text='Overview' />
      </View>
      (
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
            style={[style.label, style.labelColumOne]}
          />
          <Typography
            name='tableHeader'
            text='Status'
            style={[style.label, style.labelColumTwo]}
          />
          <Typography
            name='tableHeader'
            text='Pressure test'
            style={[style.label, style.labelColumThree]}
          />
          <Typography
            name='tableHeader'
            text='Created'
            style={[style.label, style.labelColumFour]}
          />
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ActionElement
              item={item}
              onRemove={() => console.log('remove')}
              onRowPress={() => console.log('row press')}
            />
          )}
        />
      </View>
      );
    </>
  );
};
interface ActionElementProps {
  item: (typeof items)[0];
  onRowPress: () => void;
  onRemove: () => void;
}
const ActionElement: React.FC<ActionElementProps> = ({
  item,
  onRowPress,
  onRemove,
}) => {
  const { id } = item;
  return (
    <View style={[actionElementStyle.rowContainer]}>
      <Pressable onPress={onRowPress} style={actionElementStyle.pressableRow}>
        <View style={actionElementStyle.columnOne}>
          <Typography
            name='tableContentNumber'
            text={id}
            style={actionElementStyle.number}
          />
        </View>
        <View style={actionElementStyle.columnTwo}>
          <View style={actionElementStyle.columnTwoUp}>
            <Typography
              numberOfLines={1}
              name='tableContent'
              text={'Draft'}
              style={actionElementStyle.columnThree}
            />
            <Typography
              numberOfLines={1}
              name='tableContent'
              text={'Yes'}
              style={actionElementStyle.columnFour}
            />
            <Typography
              numberOfLines={1}
              name='tableContent'
              text={'311224'}
              style={[actionElementStyle.number, actionElementStyle.columnFive]}
            />
          </View>
          <View style={actionElementStyle.columnTwoDown}>
            <Typography
              numberOfLines={1}
              name='tableContent'
              text={'4 hoses on Deck crane'}
            />
          </View>
        </View>
      </Pressable>
      <View style={actionElementStyle.removeWrapper}>
        <Pressable onPress={onRemove} style={actionElementStyle.removeButton}>
          <Icon name='Cross' color={colors.errorText} size='lg' />
        </Pressable>
      </View>
    </View>
  );
};

const columns = StyleSheet.create({
  one: {
    width: 100,
  },
  two: {
    width: 100,
  },
  three: {},
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
  },
  pressableRow: {
    height: '100%',
    flex: 1,
    gap: 10,
    flexDirection: 'row',
  },
  columnOne: {
    paddingLeft: 10,
    width: 90,
  },
  columnTwo: {
    backgroundColor: 'pink',
    height: '100%',
    flex: 1,
  },
  columnTwoUp: {
    flexDirection: 'row',
    gap: 10,
  },
  columnTwoDown: {
    flex: 1,
  },
  columnThree: { width: 100 },
  columnFour: { width: 100 },
  columnFive: { width: 100, justifyContent: 'flex-end' },
  removeWrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: colors.extended666,
  },
  removeButton: {},
});

const style = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
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
  labelColumOne: { width: 90 },
  labelColumTwo: { flex: 1 },
  labelColumThree: { flex: 1 },
  labelColumFour: { width: 80 },
});

export default Action;
