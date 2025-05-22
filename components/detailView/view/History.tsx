import { Bookmark } from '@/components/detailView/common/Bookmark';
import { Typography } from '@/components/Typography';
import { View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { formatDate } from '@/lib/util/formatDate';
import { Icon } from '@/components/Icon/Icon';
import { colors } from '@/lib/tokens/colors';
import { LinkButton } from '@/components/UI/Button/LinkButton';
import React, { useState } from 'react';

interface HistoryItemProps {
  id: string;
  date: Date;
  name: string;
  comments?: string;
}

interface HistoryViewProps {
  items: HistoryItemProps[];
}

const INITIAL_ITEMS_TO_SHOW = 2;

export const HistoryView = ({ items }: HistoryViewProps) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowComments = (item: HistoryItemProps) => {
    if (!item.comments) return;
    const alertTitle = `(${formatDate(item.date)}) ${item.id} - ${item.name}`;
    Alert.alert(alertTitle, item.comments);
  };

  const itemsToShow = showAll ? items : items.slice(0, INITIAL_ITEMS_TO_SHOW);
  const remainingItemsCount = items.length - INITIAL_ITEMS_TO_SHOW;

  return (
    <View>
      <Bookmark title='History' />
      {itemsToShow && itemsToShow.length > 0 ? (
        itemsToShow.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Icon name='Time' size={'sm'} color={colors.primary} />
            <View style={styles.itemContent}>
              <Typography name='navigation'>
                ({formatDate(item.date)}) {item.id} - {item.name}
                {item.comments && (
                  <LinkButton
                    onPress={() => handleShowComments(item)}
                    title={' - See comments for details'}
                  />
                )}
              </Typography>
            </View>
          </View>
        ))
      ) : (
        <Typography name='navigation'> No history items to display.</Typography>
      )}
      {!showAll && items.length > INITIAL_ITEMS_TO_SHOW && (
        <View style={styles.showAllContainer}>
          <Icon name='Plus' size='xsm' color={colors.primary} />
          <LinkButton
            title={`Show all (${remainingItemsCount})`}
            onPress={() => setShowAll(true)}
          />
        </View>
      )}
      {showAll && (
        <View style={styles.showAllContainer}>
          <Icon name='ChevronUp' size='xsm' color={colors.primary} />
          <LinkButton title={'Show less'} onPress={() => setShowAll(false)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    gap: 12,
  },
  icon: {
    marginRight: 10,
  },
  itemContent: {
    flex: 1,
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  showAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 8,
    gap: 8,
  },
  showAllText: {
    color: colors.primary,
  },
  showAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
});
