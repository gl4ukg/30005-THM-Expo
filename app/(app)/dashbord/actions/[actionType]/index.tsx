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
  return (
    <Pressable onPress={onRowPress}>
      <View style={[actionElementStyle.container]}>
        <View style={actionElementStyle.columnOne}>
          <Typography name='tableContentNumber' text={id} />
          <View style={actionElementStyle.iconsContainer}>
            <View style={actionElementStyle.iconContainer}>
              {hasRFID && (
                <Icon
                  name='RfidIdentificator'
                  color={colors.black}
                  size='xsm'
                />
              )}
            </View>
            <View style={actionElementStyle.iconContainer}>
              {missingData && (
                <Icon name='Alert' color={colors.error} size='xsm' />
              )}
            </View>
            <View style={actionElementStyle.iconContainer}>
              {hasAttachment && (
                <Icon name='Attachment' color={colors.black} size='xsm' />
              )}
            </View>
          </View>
        </View>
        <View style={actionElementStyle.columnTwo}>
          <Typography
            name='tableContent'
            text={position}
            numberOfLines={1}
            ellipsizeMode='tail'
          />
          <View style={actionElementStyle.subtitleDateContainer}>
            <Typography
              name='tableContent'
              text={
                condition?.length
                  ? condition
                  : '44-Visible leakage - and some more defects'
              }
              style={actionElementStyle.subtitle}
              numberOfLines={1}
            />
            <Typography
              name='tableContentNumber'
              text={lastInspection?.length ? lastInspection : 'N/A'}
              style={actionElementStyle.date}
            />
          </View>
        </View>
        <View style={actionElementStyle.columnThree}>
          {item && (
            <Checkbox isChecked={!!isSelected} onChange={handleSelect} />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const actionElementStyle = StyleSheet.create({});

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
  labelColumOne: { width: 80 },
  labelColumTwo: { flex: 1 },
  labelColumThree: { flex: 1 },
  labelColumFour: { width: 80 },
});

export default Action;
