// need a function to go through done activities for the state.
// activities: ActivityDone[], if ActivityDone.syncingTimestamp is  null, then its need to be synced with the right api.
//  ActivityDone.syncingTimestamp should be the timestamp of the success return from call to api.
// i do not have all apis yet. so i need to mock it.
// important is that i need to update context and storage for the done activities.
// function need to be designed in a way that it can be called from anywhere.
// function need to be call after user clicks the sync button, from background tasks, in every time the app is open. and if the internet becomes available.

import { AppAction } from '@/context/Reducer';
import { ActivityDone } from '@/context/state';

// Global flag to prevent concurrent sync operations
let isSyncing = false;

// Mock API service - replace with real implementations later
const mockActivityApis = {
  createInspection: async (activity: ActivityDone) => {
    console.log('Mock API: Creating inspection', activity.id);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    return { success: true, timestamp: Date.now() };
  },
  updateHose: async (activity: ActivityDone) => {
    console.log('Mock API: Updating hose', activity.id);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, timestamp: Date.now() };
  },
  registerHose: async (activity: ActivityDone) => {
    console.log('Mock API: Registering hose', activity.id);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, timestamp: Date.now() };
  },
};

// Type for sync function dependencies
type SyncDependencies = {
  dispatch: React.Dispatch<AppAction>;
  updateActivityInStorage: (activity: ActivityDone) => void;
  getUnsyncedActivities: () => ActivityDone[];
};

export const syncActivities = async (deps: SyncDependencies): Promise<void> => {
  if (isSyncing) {
    console.log('Sync already in progress. Skipping...');
    return;
  }

  isSyncing = true;

  try {
    const { dispatch, updateActivityInStorage, getUnsyncedActivities } = deps;
    const unsynced = getUnsyncedActivities();

    if (unsynced.length === 0) {
      console.log('No activities to sync');
      return;
    }

    dispatch({ type: 'SET_DATA_LOADING', payload: true });

    // Process each unsynced activity
    for (const activity of unsynced) {
      try {
        let result;

        // Route to appropriate API based on activity type
        switch (activity.type) {
          case 'INSPECT':
            result = await mockActivityApis.createInspection(activity);
            break;
          case 'CONTACT':
            result = await mockActivityApis.updateHose(activity);
            break;
          case 'REGISTER_HOSE':
            result = await mockActivityApis.registerHose(activity);
            break;
          default:
            console.warn(`Unknown activity type: ${activity.type}`);
            continue;
        }

        if (result.success) {
          // Update activity with sync timestamp
          const updatedActivity: ActivityDone = {
            ...activity,
            syncingTimestamp: result.timestamp,
            status: 'done',
          };

          // Update storage
          updateActivityInStorage(updatedActivity);

          // Update context
          dispatch({
            type: 'SET_TIMESTAMP',
            payload: {
              id: activity.id,
              timestamp: result.timestamp,
            },
          });
        }
      } catch (error) {
        console.error(`Failed to sync activity ${activity.id}:`, error);

        // Update activity with error status
        // const failedActivity: ActivityDone = {
        //   ...activity,
        //   status: 'failed',
        //   lastError: (error as Error).message,
        // };

        // updateActivityInStorage(failedActivity);
        // dispatch({
        //   type: 'UPDATE_ACTIVITY',
        //   payload: failedActivity,
        // });
      }
    }

    // dispatch({ type: 'SET_SYNC_STATUS', payload: 'idle' });
  } catch (error) {
    console.error('Global sync error:', error);
    // Handle global error if needed
  } finally {
    isSyncing = false;
  }
};
