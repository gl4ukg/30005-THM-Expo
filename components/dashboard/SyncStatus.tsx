import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import React, { useEffect } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

interface Props {
  timestamp: number | null;
  status?: 'synced' | 'syncing' | 'error';
  onRetry?: () => void;
}

const syncStatusDictionary: Record<
  'synced' | 'syncing' | 'error' | 'uptoDate',
  string
> = {
  synced: 'Last sync: ',
  syncing: 'Syncing',
  error: 'Syncing failed',
  uptoDate: 'Sync complete',
};

export const SyncStatus: React.FC<Props> = ({
  timestamp,
  onRetry,
  status = 'error',
}) => {
  const [syncState, setSyncState] = React.useState<
    Props['status'] | 'uptoDate'
  >('synced');
  const [returnString, setReturnString] = React.useState<string>('');

  useEffect(() => {
    if (status === 'error') {
      setSyncState('error');
      setReturnString(syncStatusDictionary.error);
      return;
    } else if (status === 'syncing') {
      setSyncState('syncing');
      setReturnString(syncStatusDictionary.syncing);
      return;
    } else {
      if (timestamp) {
        const date = new Date(timestamp);
        // is today
        if (new Date().toDateString() === date.toDateString()) {
          // less then 5 min
          const diffInMinutes = Math.floor(
            (Date.now() - timestamp) / (1000 * 60),
          );

          if (diffInMinutes < 5) {
            setReturnString(syncStatusDictionary.uptoDate);
            setSyncState('uptoDate');
            return;
          } else if (diffInMinutes < 60) {
            setSyncState('synced');
            setReturnString(`Last sync: ${diffInMinutes} minutes ago`);
          } else {
            setSyncState('synced');
            setReturnString(`Last sync: ${date.toLocaleTimeString()}`);
          }
        } else {
          setReturnString(
            `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
          );
        }
      }
    }
  }, [timestamp, status]);
  return (
    <Pressable
      onPress={() => {
        Alert.alert(
          returnString,
          `Inspection data may not be current. New inspections from other users may not be visible. ${timestamp !== null ? `Last sync: ${new Date(timestamp).toLocaleDateString()}` : ''} `,
          [
            {
              text: 'Retry sync',
              onPress: onRetry,
            },
            {
              text: 'Cancel',
              onPress: () => {},
            },
          ],
        );
      }}
    >
      <View style={[styles.container, syncState && styles[syncState]]}>
        <Typography name={'boldOnBlack'} style={{ color: colors.white }}>
          {`${returnString ? returnString : ''}`}
        </Typography>
        {syncState !== 'synced' && (
          <Icon
            name={
              syncState === 'uptoDate'
                ? 'Success'
                : syncState === 'error'
                  ? 'Alert'
                  : 'Syncing'
            }
            size={'xsm'}
            color={colors.white}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBlock: 2,
    paddingInline: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    gap: 10,
  },
  synced: { backgroundColor: colors.black },
  syncing: { backgroundColor: colors.extendedBlue },
  error: { backgroundColor: colors.error },
  uptoDate: { backgroundColor: colors.primary },
});
