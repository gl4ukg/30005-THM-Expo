import { colors } from '@/lib/tokens/colors';
import { StyleSheet, View } from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../typography';

interface BookmarkProps {
  title: string;
}

export const Bookmark: React.FC<BookmarkProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.content}>
        <Icon name='ArrowRight' size='sm' color={colors.primary} />
        <Typography name={'sectionHeader'} style={styles.title}>
          {title}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  line: {
    width: '100%',
    borderBottomWidth: 3,
    borderBottomColor: colors.primary25,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    color: colors.primary25,
  },
  title: {
    fontWeight: 'bold',
    color: colors.primary25,
    marginTop: 5,
  },
});
