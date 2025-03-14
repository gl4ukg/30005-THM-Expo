import { View, StyleSheet } from 'react-native';
import Bookmark from './Bookmark';
import { Typography } from '../typography';
import { Icon } from '../Icon/Icon';
import { colors } from '@/lib/tokens/colors';

type structureProps = {
  structure: string[];
  name: string;
};
const Structure: React.FC<structureProps> = ({ structure, name }) => {
  return (
    <View>
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
            text={name}
          />
        </View>
      </View>
    </View>
  );
};

export default Structure;
const styles = StyleSheet.create({
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
