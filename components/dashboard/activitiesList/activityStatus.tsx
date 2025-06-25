import { Activity } from '@/components/dashboard/activitiesList/activity';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

type Props = Pick<Activity, 'status' | 'type'>;

const typeTextDictionary: Record<Activity['type'], string> = {
  INSPECT: 'Inspected',
  REGISTER_HOSE: 'Registered',
  SCRAP: 'Scraped',
  REPLACE_HOSE: 'Replaced',
  RFQ: 'RFQ',
  CONTACT_SUPPORT: 'Support',
  CONTACT: 'Contact',
  // EDIT: 'Edited',
};

export const ActivityStatus: FC<Props> = ({ status, type }) => {
  return (
    <View style={styles.container}>
      <Typography
        name='tableContent'
        text={status}
        style={[
          styles.textBox,
          styles[`status_${status}`],
          styles[`status_${status}Text`],
        ]}
      />
      <Typography
        name='tableContent'
        text={typeTextDictionary[type]}
        style={[styles.textBox, styles.type, styles.typeText]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 9,
  },
  textBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  type: {
    borderColor: colors.black,
    width: 'auto',
  },
  typeText: {
    color: colors.black,
  },
  status_done: {
    backgroundColor: colors.primary50,
  },
  status_doneText: {
    color: colors.white,
  },
  status_draft: {
    backgroundColor: colors.dashboardYellow,
  },
  status_draftText: {
    color: colors.black,
  },
});
