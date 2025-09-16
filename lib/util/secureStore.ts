import * as SecureStore from 'expo-secure-store';

export const saveInStore = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    throw new Error('Error saving to AsyncStorage:');
  }
};

export const deleteFromStore = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    throw new Error('Error deleting from AsyncStorage:');
  }
};

export const getFromStore = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (!value) {
      throw new Error('Value not found in AsyncStorage');
    }
    return value;
  } catch (error) {
    throw new Error('Error getting from AsyncStorage:');
  }
};
