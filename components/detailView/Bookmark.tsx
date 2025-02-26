import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/lib/tokens/colors';
import { Icon } from '../Icon/Icon';
import { Typography } from '../typography';

interface BookmarkProps {
  title: string;
}

const Bookmark: React.FC<BookmarkProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.content}>
        <Typography name={'sectionHeader'} style={styles.title}>
          {title}
        </Typography>
        <Icon name='ArrowRight' size='sm' color={colors.primary} />
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
    height: 1,
    backgroundColor: colors.secondary95,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    marginTop: 5,
  },
});

export default Bookmark;
