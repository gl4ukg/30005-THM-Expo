import * as MediaLibrary from 'expo-media-library';

const createAlbumIfNeeded = async (albumName: string) => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') return;

  const album = await MediaLibrary.getAlbumAsync(albumName);
  if (!album) {
    await MediaLibrary.createAlbumAsync(albumName);
  }
};

const saveToAlbum = async (uri: string, albumName: string) => {
  await createAlbumIfNeeded(albumName);
  const asset = await MediaLibrary.createAssetAsync(uri);
  await MediaLibrary.addAssetsToAlbumAsync([asset], albumName, false);
};
