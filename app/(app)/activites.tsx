import { Activity } from '@/components/dashboard/activitiesList/activity';
import { ActivitiesList } from '@/components/dashboard/activitiesList/';
import { Typography } from '@/components/Typography';
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SelectDropdown } from '@/components/UI/ActionMenu';
import { useDataManager } from '@/hooks/useDataManager';
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
    label: 'Register hose',
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
  const { activities: activitiesData } = useDataManager();

  const removeActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== +id));
    activitiesData.draft.remove(+id);
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
      (a, b) =>
        new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime(),
    );
    setActivities(activities);
    setActivitiesToShow(activities);
  }, [state.data.drafts, state.data.done]);
  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.listHeaderComponent}>
          <Typography
            name='sectionHeader'
            text='Recent activities'
            style={styles.contactTitle}
          />
          <SelectDropdown
            selected={filter}
            options={options}
            onChange={setFilter}
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
                name='navigationBold'
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
                name='navigationBold'
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
                name='navigationBold'
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
    backgroundColor: colors.baseMuted,
    borderRadius: 8,
    padding: 2,
    width: '80%',
  },
  switchButton: {
    borderRadius: 3,
    backgroundColor: 'transparent',
    margin: 4,
    paddingVertical: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchButtonSelected: {
    backgroundColor: colors.white,
  },
  switchButtonText: {
    color: colors.baseMutedForeground,
  },
  switchButtonTextSelected: {
    color: colors.primary,
  },
});

export default Activities;
