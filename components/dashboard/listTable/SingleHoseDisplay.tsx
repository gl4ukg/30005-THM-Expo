import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListElement } from './listElement';

interface Props {
  item: Partial<HoseData>;
}

const spacing = {
  paddingBlock: 10,
};

export const SingleHoseDisplay: FC<Props> = ({ item }) => {
  const router = useRouter();

  const handleRowPress = () => {
    router.push(
      `/(app)/dashboard/hoses/hose/${item.assetId}?id=${item.assetId}`,
    );
  };

  return (
    <View style={styles.container}>
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

      <ListElement
        item={item}
        canBeSelected={false}
        onRowPress={handleRowPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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

  labelColumnOne: { width: 70 },
  labelColumnTwo: { flex: 1 },
  labelColumnThree: { width: 105 },
});
