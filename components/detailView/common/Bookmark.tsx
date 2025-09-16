import { colors } from '@/lib/tokens/colors';
import { StyleSheet, View } from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography';

interface BookmarkProps {
  title: string;
}

export const Bookmark: React.FC<BookmarkProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Icon name='ArrowRight' size='sm' color={colors.primary} />
      <Typography name={'sectionHeader'} style={styles.title}>
        {title}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 6,
    paddingTop: 11,
    borderTopWidth: 2,
    borderTopColor: colors.primary25,
  },
  title: {
    color: colors.primary25,
  },
});
