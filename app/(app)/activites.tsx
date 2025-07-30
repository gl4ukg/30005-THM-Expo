import { Activity } from '@/components/dashboard/activitiesList/activity';
import { ActivitiesList } from '@/components/dashboard/activitiesList';
import { Typography } from '@/components/Typography';
import { SelectDropdown } from '@/components/UI/ActionMenu';
import { Icon } from '@/components/Icon/Icon';
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

  // Get the label of the currently selected filter option
  const getSelectedOptionLabel = () => {
    const selectedOption = options.find((option) => option.value === filter);
    return selectedOption ? selectedOption.label : 'All activities';
  };

  const getActionLabel = (filterValue: string) => {
    switch (filterValue) {
      case 'REGISTER_HOSE':
        return 'Register Hose';
      case 'RFQ':
        return 'Create RFQ';
      case 'INSPECT':
        return 'Start Inspection';
      case 'SCRAP':
        return 'Scrap Hose';
      case 'REPLACE_HOSE':
        return 'Replace Hose';
      case 'CONTACT':
        return 'Contact TESS';
      default:
        return getSelectedOptionLabel();
    }
  };

  const handleDirectAction = () => {
    navigateToAction(filter);
  };

  const navigateToAction = (actionType: string) => {
    switch (actionType) {
      case 'REGISTER_HOSE':
        router.push('/dashboard/hoses/register');
        break;
      case 'RFQ':
        router.push('/dashboard/actions');
        break;
      case 'INSPECT':
        router.push('/dashboard/hoses/inspect');
        break;
      case 'SCRAP':
        router.push('/dashboard/actions');
        break;
      case 'REPLACE_HOSE':
        router.push('/dashboard/actions');
        break;
      case 'CONTACT':
        router.push('/dashboard/actions');
        break;
      default:
        console.log(`No navigation defined for action: ${actionType}`);
    }
  };
  useEffect(() => {
    const filteredActivities = activities.filter((activity) => {
      const activityStatus = activity.status.toLowerCase();
      return (
        (status === 'all' || activityStatus === status) &&
        (filter === 'ALL' || activity.type === filter)
      );
    });
    setActivitiesToShow(filteredActivities);
  }, [activities, filter, status, state]);

  useEffect(() => {
    const mappedActivities = [...state.data.drafts, ...state.data.done]
      .map(
        (activity): Activity => ({
          ...activity,
          status: activity.status === 'draft' ? 'draft' : 'done',
        }),
      )
      .sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());
    setActivities(mappedActivities);
    setActivitiesToShow(mappedActivities);
  }, [state.data.drafts, state.data.done]);
  return (
    <View style={styles.container}>
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
      {filter !== 'ALL' && (
        <DirectActionButton
          label={getActionLabel(filter)}
          onPress={handleDirectAction}
        />
      )}
    </View>
  );
};

const DirectActionButton: React.FC<{ label: string; onPress: () => void }> = ({
  label,
  onPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.directActionButton, { bottom: 20 + insets.bottom }]}
    >
      <Typography
        name='navigation'
        text={label}
        style={styles.directActionButtonText}
      />
      <Icon name='Plus' color={colors.white} size='sm' />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  directActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.black,
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 10000,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  directActionButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
});

export default Activities;
