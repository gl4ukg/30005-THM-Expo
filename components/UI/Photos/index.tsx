import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI/Button/Button';
import { colors } from '@/lib/tokens/colors';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

interface Props {
  title: string;
  dirUri: string;
}

export interface ImageFileData {
  uri: string;
  name: string;
  path: string;
}
export const ImageGallery: React.FC<Props> = ({ title, dirUri }) => {
  // console.log('album', album?.length, dirUri);
  const [album, setAlbum] = useState<ImageFileData[]>([]);
  useEffect(() => {
    const getHoseImages = async () => {
      const imageDir = `${dirUri}/images/`;
      const dirInfo = await FileSystem.getInfoAsync(imageDir);
      console.log('dirInfo: ', dirInfo);
      if (!dirInfo.exists) {
        // Folder doesn't exist = no images
        setAlbum([]);
        // create folder
        console.log('Folder creating');
        await FileSystem.makeDirectoryAsync(imageDir, {
          intermediates: true,
        });
        console.log('Folder created');
        return;
      }
      const imageFiles = await FileSystem.readDirectoryAsync(imageDir);
      const hoseImages: ImageFileData[] = imageFiles.map((fileName) => ({
        uri: `${imageDir}${fileName}`, // Full file path
        name: fileName,
        path: `${imageDir}${fileName}`,
      }));
      console.log('hImg: ', hoseImages);
      setAlbum(hoseImages);
    };
    getHoseImages();
  }, [dirUri]);
  const takeImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      cameraType: ImagePicker.CameraType.back,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      const dirInfo = await FileSystem.getInfoAsync(dirUri);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
        console.log('Folder created', dirUri);
      }
      const sourceUri = result.assets[0].uri; // Temporary camera file
      const fileName = `hose_${Date.now()}.jpg`; // Unique filename TODO: Use UUID
      const newUri = `${dirUri}/images/${fileName}`;

      // Move file from temp location to permanent storage
      await FileSystem.moveAsync({
        from: sourceUri,
        to: newUri,
      });

      setAlbum((prev) => [
        ...prev,
        { uri: newUri, name: fileName, path: newUri },
      ]);
      console.log('Image saved to:', newUri);
      return newUri; // Return new path for use
    }
  };
  const removeImage = async (image: ImageFileData) => {
    await FileSystem.deleteAsync(image.uri);
    setAlbum((prev) => prev.filter((img) => img.uri !== image.uri));
  };
  return (
    <View style={styles.container}>
      <Typography name={'sectionText'} style={styles.title}>
        {title}
      </Typography>
      <Gallery
        album={album}
        dirUri={dirUri}
        takeImage={takeImage}
        removeImage={removeImage}
      />
      <AddImage takeImage={takeImage} />
    </View>
  );
};

const isAssetType = (asset: any): asset is ImageFileData => {
  return Object.prototype.hasOwnProperty.call(asset, 'uri');
};

const Gallery: React.FC<{
  album: ImageFileData[];
  dirUri: string;
  takeImage: () => void;
  removeImage?: (image: ImageFileData) => void;
}> = ({ album, takeImage, removeImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const first3Images = album.slice(0, 3);
  // const [assets, setAssets] = useState<ImageFileData[]>(album);
  const [selected, setSelected] = useState<ImageFileData | null>(null);
  return (
    <>
      <Pressable style={styles.miniatures} onPress={() => setIsOpen(true)}>
        {first3Images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.uri }}
            style={{ width: 70, height: 70, backgroundColor: 'red' }}
          />
        ))}
        <Typography name={'sectionText'} style={styles.moreImages}>
          +{album.length - first3Images.length}
        </Typography>
      </Pressable>
      <Modal visible={isOpen} transparent>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.extended333,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              marginTop: 100,
              marginBottom: 20,
              zIndex: 100,
            }}
          >
            <Typography
              name={'sectionText'}
              style={{ textAlign: 'center', color: colors.white }}
            >
              Hose: ID:{' '}
              <Typography name={'sectionText'} style={{ fontWeight: '600' }}>
                1234
              </Typography>
            </Typography>
            <Typography
              name={'sectionText'}
              style={{ textAlign: 'center', color: colors.white }}
            >
              Photos
            </Typography>
          </View>
          {selected ? (
            <View style={{ flex: 1, padding: 20 }}>
              <Pressable
                onPress={() => setSelected(null)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  zIndex: 100,
                  padding: 10,
                  backgroundColor: colors.extended333,
                }}
              >
                <Icon name='Cross' size={'lg'} color={colors.white} />
              </Pressable>
              {removeImage && (
                <Pressable
                  onPress={() => {
                    removeImage(selected);
                    setSelected(null);
                  }}
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    zIndex: 100,
                    padding: 10,
                    backgroundColor: colors.extended333,
                  }}
                >
                  <Icon
                    name='Trash'
                    size={'lg'}
                    color={colors.dashboardRedText}
                  />
                </Pressable>
              )}

              <Image
                source={{ uri: selected.uri }}
                style={{ width: '100%', aspectRatio: 1 }}
              />
            </View>
          ) : (
            <FlatList
              data={[...album, { addImage: true }]}
              keyExtractor={(item) =>
                `${typeof item === 'string' ? item : ''} ${Math.random()}`
              }
              numColumns={4}
              columnWrapperStyle={{ gap: 10 }}
              contentContainerStyle={{
                gap: 10,
                marginBottom: 20,
              }}
              renderItem={({ item, index }) => {
                return isAssetType(item) ? (
                  <Pressable onPress={() => setSelected(item)}>
                    <Image
                      source={{ uri: item.uri }}
                      style={{
                        width: 80,
                        aspectRatio: 1,
                      }}
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => takeImage()}
                    style={{
                      height: 80,
                      width: 80,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Icon name='Camera' size='lg' color={colors.white} />
                  </Pressable>
                );
              }}
              ListFooterComponent={() => (
                <ButtonTHS
                  title='Close'
                  onPress={() => setIsOpen(false)}
                  variant='primary'
                />
              )}
              ListFooterComponentStyle={{ marginTop: 50 }}
            />
          )}
        </SafeAreaView>
      </Modal>
    </>
  );
};

const AddImage: React.FC<{ takeImage: () => void }> = ({ takeImage }) => {
  return (
    <Pressable onPress={takeImage}>
      <Typography name={'sectionText'} style={styles.addButton}>
        + Add Photos
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginBottom: 3,
  },
  miniatures: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    color: colors.extended666,
  },
  moreImages: {
    color: colors.extended666,
    fontSize: 32,
    lineHeight: 70,
    width: 70,
    textAlign: 'center',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: colors.secondary95,
  },
  addButton: {
    color: colors.primary25,
  },
});
