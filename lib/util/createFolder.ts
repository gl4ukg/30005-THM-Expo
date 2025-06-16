import * as FileSystem from 'expo-file-system';

const createHoseDirectory = async (
  locationID: string | number,
  hoseID: string | number,
) => {
  const baseDir = `${FileSystem.documentDirectory}THM/`;
  const paths = [
    `${baseDir}${locationID}/`,
    `${baseDir}${locationID}/${hoseID}/`,
    `${baseDir}${locationID}/${hoseID}/images/`,
  ];

  for (const path of paths) {
    const { exists } = await FileSystem.getInfoAsync(path);
    if (!exists) {
      await FileSystem.makeDirectoryAsync(path, { intermediates: true });
    }
  }
  return `${baseDir}${locationID}/${hoseID}/images/`;
};
