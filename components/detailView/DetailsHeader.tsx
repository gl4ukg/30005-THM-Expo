import { colors } from '@/lib/tokens/colors';
import { formatDate } from '@/lib/util/formatDate';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '../Icon/Icon';
import { Typography } from '../typography';
import { ActionMenu } from '../UI/ActionMenu';
import { useState } from 'react';

type DetailsHeaderProps = {
  id: string;
  date: string;
  missingData?: boolean;
};

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  id,
  date,
  missingData,
}) => {
  const [action, setAction] = useState<string | null>(null);

  const options = [
    { value: 'inspect', label: 'Inspect', icon: 'Inspect' },
    { value: 'scrap', label: 'Scrap', icon: 'Trash' },
    { value: 'requestForQuote', label: 'Request for quote', icon: 'Cart' },
    { value: 'contactTessTeam', label: 'Contact TESS Team', icon: 'Email' },
  ];
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerRow}>
            {missingData && (
              <Icon name='Alert' color={colors.error} size='sm' />
            )}
            <Typography style={styles.hoseData} name={'fieldLabel'}>
              Hose ID:{' '}
              <Typography name={'fieldValue'} style={styles.boldText}>
                {id}
              </Typography>
            </Typography>
          </View>
          <Typography style={styles.hoseData} name={'fieldLabel'}>
            Production Date:
            <Typography name={'fieldValue'} style={styles.boldText}>
              {formatDate(date)}
            </Typography>
          </Typography>
          <ActionMenu
            menuTitle='Actions'
            selected={action}
            options={options}
            onChange={() => {}}
            detailPage
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    gap: 5,
  },
  hoseData: {
    fontSize: 16,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
export default DetailsHeader;
