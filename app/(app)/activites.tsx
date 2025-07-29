import { Activity } from '@/components/dashboard/activitiesList/activity';
import { ActivitiesList } from '@/components/dashboard/activitiesList/indext';
import { Typography } from '@/components/Typography';
import { SelectDropdown } from '@/components/UI/ActionMenu';
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

const options = [
  {
    label: 'All activities',
    value: 'ALL',
  },
  {
    label: 'Inspected hoses',
    value: 'INSPECT',
  },
  {
    label: 'Register hose ',
    value: 'REGISTER_HOSE',
  },
  {
    label: 'Scrapped hoses',
    value: 'SCRAP',
  },
  {
    label: 'Hose replacement',
    value: 'REPLACE_HOSE',
  },
  {
    label: 'Request for quote (RFQ)',
    value: 'RFQ',
  },
  {
    label: 'Contact requests to TESS',
    value: 'CONTACT',
  },
];
const Activities: React.FC = () => {
  const { state } = useAppContext();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<(typeof options)[0]['value']>('ALL');
  const [status, setStatus] = useState<'all' | 'draft' | 'done'>('all');
  const [activitiesToShow, setActivitiesToShow] = useState<Activity[]>([]);

  const removeActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== +id));
    // TODO remove from state, add reducer
  };
  useEffect(() => {
    const filteredActivities = activities.filter((activity) => {
      return (
        (status === 'all' || activity.status === status) &&
        (filter === 'ALL' || activity.type === filter)
      );
    });
    setActivitiesToShow(filteredActivities);
  }, [activities, filter, status, state]);
  useEffect(() => {
    const activities = [...state.data.drafts, ...state.data.done].sort(
      (a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime(),
    );
    setActivities(activities);
    setActivitiesToShow(activities);
  }, [state.data.drafts, state.data.done]);
  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.listHeaderComponent}>
          <Typography
            name='navigationBold'
            text='Recent activities'
            style={styles.contactTitle}
          />
          <SelectDropdown
            selected={filter}
            options={options}
            onChange={setFilter}
            placeholder='Select activity type'
          />
          <View style={styles.switchContainer}>
            <Pressable
              onPress={() => setStatus('all')}
              style={[
                styles.switchButton,
                status === 'all' && styles.switchButtonSelected,
              ]}
            >
              <Typography
                name='navigation'
                text='All'
                style={[
                  styles.switchButtonText,
                  status === 'all' && styles.switchButtonTextSelected,
                ]}
              />
            </Pressable>
            <Pressable
              onPress={() => setStatus('draft')}
              style={[
                styles.switchButton,
                status === 'draft' && styles.switchButtonSelected,
              ]}
            >
              <Typography
                name='navigation'
                text='Drafts'
                style={[
                  styles.switchButtonText,
                  status === 'draft' && styles.switchButtonTextSelected,
                ]}
              />
            </Pressable>
            <Pressable
              onPress={() => setStatus('done')}
              style={[
                styles.switchButton,
                status === 'done' && styles.switchButtonSelected,
              ]}
            >
              <Typography
                name='navigation'
                text='Done'
                style={[
                  styles.switchButtonText,
                  status === 'done' && styles.switchButtonTextSelected,
                ]}
              />
            </Pressable>
          </View>
        </View>
      }
      data={['one']}
      renderItem={() => (
        <ActivitiesList onRemove={removeActivity} items={activitiesToShow} />
      )}
      keyExtractor={(_, index) => `form-content-${index}`}
    />
  );
};

const styles = StyleSheet.create({
  listHeaderComponent: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 30,
  },
  contactTitle: {
    color: colors.black,
  },
  switchContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: colors.secondary95,
    borderRadius: 8,
    padding: 2,
    width: '80%',
  },
  switchButton: {
    borderRadius: 8,
    backgroundColor: 'transparent',
    margin: 4,
    paddingInline: 10,
    paddingVertical: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchButtonSelected: {
    backgroundColor: colors.white,
  },
  switchButtonText: {
    color: colors.extended333,
  },
  switchButtonTextSelected: {
    color: colors.primary95,
  },
});

export default Activities;
