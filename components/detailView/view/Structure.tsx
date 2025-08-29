import { Bookmark } from '@/components/detailView/common/Bookmark';
import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { StyleSheet, View } from 'react-native';

type StructureProps = {
  hose: Partial<HoseData>;
};
export const Structure: React.FC<StructureProps> = ({ hose }) => {
  const { state } = useAppContext();
  const customer = state.data.customers.find(
    (c) => c.customerNumber === hose.customerNumber,
  );
  const S1 = state.data.s1Items.find((s) => s.S1Code === hose.s1Code);
  const structure: string[] = [
    customer?.customerName,
    S1?.S1Name,
    hose.S2Equipment,
  ].filter((s): s is string => !!s && s.trim() !== '');

  return (
    <View style={styles.container}>
      <Bookmark title='Structure' />
      <View style={styles.structureList}>
        {structure.map((item, index) => (
          <View key={index} style={[{ paddingLeft: index * 30 }]}>
            <View style={styles.element}>
              <Icon name={'CaretDown'} color={colors.primary} />
              <Typography
                name={'navigation'}
                text={item}
                style={styles.textContent}
              />
            </View>
          </View>
        ))}
        <View style={{ paddingLeft: structure.length * 30 }}>
          <Typography
            style={[styles.name, styles.textContent]}
            name={'navigationBold'}
            text={hose.itemDescription}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 30,
  },
  structureList: {
    gap: 10,
  },
  element: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  name: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  textContent: {
    color: colors.extended333,
    flex: 1,
  },
});
