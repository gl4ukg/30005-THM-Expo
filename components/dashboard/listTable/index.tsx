import { Typography } from '@/components/Typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListElement } from './listElement';

interface Props {
  items: HoseData[];
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
          <ListElement
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
