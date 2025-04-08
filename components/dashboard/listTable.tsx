import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { colors } from '@/lib/tokens/colors';
import { FC } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

interface Props {
  items: {
    id: string;
    position: string;
    condition: string;
    lastInspection: string;
    missingData?: boolean;
    hasRFID?: boolean;
    hasAttachment?: boolean;
  }[];
  selectedIds: string[];
  canSelect?: boolean;
  onSelectionChange?: (id: string) => void;
  onSelectAll?: () => void;
}

const spacing = {
  paddingBlock: 10,
};
export const ListTable: FC<Props> = ({
  items,
  selectedIds,
  onSelectionChange,
  canSelect,
  onSelectAll,
}) => {
  const router = useRouter();
  const handleRowPress = (item: (typeof items)[0]) => {
    router.push(`/(app)/dashbord/hoses/hose/${item.id}?id=${item.id}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            {canSelect && onSelectAll && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Typography name='tableHeader' text='Select all:' />
                <Checkbox
                  isChecked={selectedIds.length === items.length}
                  onChange={onSelectAll}
                />
              </View>
            )}
            {canSelect && !onSelectAll && (
              <Typography
                name='fieldLabel'
                text={`Total: ${selectedIds.length} ${items.length > 1 ? 'hoses' : 'hose'}`}
                style={styles.counter}
              />
            )}

            <View
              style={[
                styles.tableHeader,
                {
                  paddingLeft: spacing.paddingBlock,
                  paddingRight: spacing.paddingBlock,
                },
              ]}
            >
              <Typography
                name='tableHeader'
                text='Hose ID'
                style={[styles.label, styles.labelColumnOne]}
              />
              <Typography
                name='tableHeader'
                text='Position/Condition'
                style={[styles.label, styles.labelColumnTwo]}
              />
              <Typography
                name='tableHeader'
                text='Inspected'
                style={[styles.label, styles.labelColumnThree]}
              />
            </View>
          </>
        }
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Element
            item={item}
            isSelected={selectedIds.includes(item.id)}
            onSelectedChange={onSelectionChange}
            canBeSelected={canSelect}
            onRowPress={() => handleRowPress(item)}
          />
        )}
      />
    </View>
  );
};

interface ElementProps {
  item: {
    id: string;
    position: string;
    condition: string;
    lastInspection: string;
    missingData?: boolean;
    hasAttachment?: boolean;
    hasRFID?: boolean;
  };
  canBeSelected?: boolean;
  isSelected?: boolean;
  onSelectedChange?: (id: string) => void;
  onRowPress: () => void;
}
const Element: FC<ElementProps> = ({
  item,
  canBeSelected,
  isSelected,
  onSelectedChange,
  onRowPress,
}) => {
  const {
    id,
    position,
    condition,
    lastInspection,
    missingData,
    hasAttachment,
    hasRFID,
  } = item;
  const handleSelect = () => {
    if (!canBeSelected || !onSelectedChange) return;
    onSelectedChange(id);
  };
  return (
    <Pressable onPress={onRowPress}>
      <View
        style={[
          elementStyle.container,
          isSelected && elementStyle.containerSelected,
        ]}
      >
        <View style={elementStyle.columnOne}>
          <Typography name='tableContentNumber' text={id} />
          <View style={elementStyle.iconsContainer}>
            <View style={elementStyle.iconContainer}>
              {hasRFID && (
                <Icon
                  name='RfidIdentificator'
                  color={colors.black}
                  size='xsm'
                />
              )}
            </View>
            <View style={elementStyle.iconContainer}>
              {missingData && (
                <Icon name='Alert' color={colors.error} size='xsm' />
              )}
            </View>
            <View style={elementStyle.iconContainer}>
              {hasAttachment && (
                <Icon name='Attachment' color={colors.black} size='xsm' />
              )}
            </View>
          </View>
        </View>
        <View style={elementStyle.columnTwo}>
          <Typography
            name='tableContent'
            text={position}
            numberOfLines={1}
            ellipsizeMode='tail'
          />
          <View style={elementStyle.subtitleDateContainer}>
            <Typography
              name='tableContent'
              text={
                condition?.length
                  ? condition
                  : '44-Visible leakage - and some more defects'
              }
              style={elementStyle.subtitle}
              numberOfLines={1}
            />
            <Typography
              name='tableContentNumber'
              text={lastInspection?.length ? lastInspection : 'N/A'}
              style={elementStyle.date}
            />
          </View>
        </View>
        <View style={elementStyle.columnThree}>
          {canBeSelected && (
            <Checkbox isChecked={!!isSelected} onChange={handleSelect} />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const elementStyle = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    paddingTop: 10,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderColor: colors.secondary95,
  },
  containerSelected: {
    backgroundColor: colors.lightContrast25,
    borderColor: colors.primary25,
  },
  columnOne: {
    width: 80,
    paddingLeft: 10,
  },
  columnTwo: {
    flex: 1,
  },
  columnThree: {
    width: 40,
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    width: 16,
    height: 16,
  },
  subtitleDateContainer: {
    flexDirection: 'row',
    gap: 5,
    flex: 1,
  },
  subtitle: {
    flex: 1,
  },
  date: {
    width: 70,
    textAlign: 'right',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  counter: {
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    textAlign: 'right',
  },
  tableHeader: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    paddingBottom: 2,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    // flex: 1,
  },
  label: {
    alignSelf: 'flex-start',
  },
  labelColumnOne: { width: 70 },
  labelColumnTwo: { flex: 1 },
  labelColumnThree: { width: 105 },
});
