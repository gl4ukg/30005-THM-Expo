import { Bookmark } from '@/components/detailView/common/Bookmark';
import { Typography } from '@/components/Typography';
import { View, Alert, StyleSheet } from 'react-native';
import { DateFormatter } from '@/lib/util/date';
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
  initialItemsToShow?: number;
}

export const HistoryView = ({
  items,
  initialItemsToShow = 2,
}: HistoryViewProps) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowComments = (item: HistoryItemProps) => {
    if (!item.comments) return;
    const alertTitle = `(${DateFormatter.fromDate(item.date)?.sql}) ${item.id} - ${item.name}`;
    Alert.alert(alertTitle, item.comments);
  };

  const itemsToDisplay = showAll ? items : items.slice(0, initialItemsToShow);
  const canShowMore = items.length > initialItemsToShow;
  const remainingItemsCount = items.length - initialItemsToShow;

  return (
    <View>
      <Bookmark title='History' />
      {items.length === 0 ? (
        <Typography name='navigation' style={styles.noItemsText}>
          No history items to display.
        </Typography>
      ) : (
        itemsToDisplay.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Icon name='Time' size={'sm'} color={colors.primary} />
            <View style={styles.itemContent}>
              <Typography name='navigation'>
                ({DateFormatter.fromDate(item.date)?.sql}) {item.id} - {item.name}
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
      )}

      {canShowMore && (
        <View style={styles.showAllContainer}>
          {showAll ? (
            <>
              <Icon name='ChevronUp' size='xsm' color={colors.primary} />
              <LinkButton
                title={' Show less'}
                onPress={() => setShowAll(false)}
              />
            </>
          ) : (
            <>
              <Icon name='Plus' size='xsm' color={colors.primary} />
              <LinkButton
                title={` Show all (${remainingItemsCount})`}
                onPress={() => setShowAll(true)}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    gap: 12,
  },
  itemContent: {
    flex: 1,
  },
  showAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noItemsText: {
    paddingVertical: 8,
  },
});
