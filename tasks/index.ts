import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';

export const BACKGROUND_TASK_IDENTIFIER = 'ADD_TEN';

TaskManager.defineTask(BACKGROUND_TASK_IDENTIFIER, async () => {
  try {
    const now = Date.now();
    console.log(
      `Got background task call at date: ${new Date(now).toISOString()}`,
    );
  } catch (error) {
    console.error('Failed to execute the background task:', error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
  return BackgroundTask.BackgroundTaskResult.Success;
});

export const registerBackgroundTaskAsync = async () => {
  await BackgroundTask.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER, {
    minimumInterval: 15,
  });
};

export const unregisterBackgroundTaskAsync = async () => {
  return BackgroundTask.unregisterTaskAsync(BACKGROUND_TASK_IDENTIFIER);
};
