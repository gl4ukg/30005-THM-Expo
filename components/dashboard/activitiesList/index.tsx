import { Activity } from '@/components/dashboard/activitiesList/activity';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface Props {
  onRemove: (id: string) => void;
  items: Activity[];
}

const spacing = {
  paddingBlock: 10,
};
export const ActivitiesList: FC<Props> = ({ onRemove, items }) => {
  const router = useRouter();
  //   const { state, dispatch } = useAppContexºt();
  const handleRowPress = (item: (typeof items)[0]) => {
    if (item.type === 'INSPECT') {
      router.push(
        `/dashboard/hoses/inspect?hoseId=${item.selectedIds[0]}&draftId=${item.id}`,
      );
    } else if (item.type === 'REGISTER_HOSE') {
      router.push(
        `/dashboard/hoses/register?hoseId=${item.selectedIds[0]}&draftId=${item.id}`,
      );
    } else {
      router.push(
        `/(app)/dashboard/actions?action=${item.type}&allowScan=true&draftId=${item.id}`,
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
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
                text='ID#'
                style={[styles.label, styles.labelColumnOne]}
              />
              <Typography
                name='tableHeader'
                text='Equipment/Status'
                style={[styles.label, styles.labelColumnTwo]}
              />
              <Typography
                name='tableHeader'
                text='Modified'
                style={[styles.label, styles.labelColumnThree]}
              />
            </View>
          </>
        }
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Activity
            onRowPress={handleRowPress.bind(null, item)}
            onRemove={onRemove}
            item={item}
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
