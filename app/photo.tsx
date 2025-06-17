import { Bookmark } from '@/components/detailView/common/Bookmark';
import { ImageGallery } from '@/components/UI/Photos';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ButtonTHS } from '@/components/UI';
import { Input } from '@/components/UI/Input/Input';
import { SafeAreaView } from 'react-native-safe-area-context';

const Photo = () => {
  const [hoseId, setHoseId] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [dirUri, setDirUri] = useState<string | null>(null);
  const [time, setTime] = useState<number | null>(null);

  const setLocation = () =>
    setDirUri(`${FileSystem.documentDirectory}THM/${locationId}/${hoseId}`);

  const getImages = async () => {
    const getMockedImages = async () => {
      try {
        // 1. Prepare target directory
        const imageDir = `${FileSystem.documentDirectory}THM/${locationId}/${hoseId}/images/`;

        // Create directory if needed
        await FileSystem.makeDirectoryAsync(imageDir, { intermediates: true });

        // 2. Determine how many images to download
        const imageCount = Math.floor(Math.random() * 5);
        const downloadedImages = [];
        if ((await FileSystem.readDirectoryAsync(imageDir)).length > 5) {
          console.log('Folder already exists and have 5 images');
          return;
        }
        // 3. Download images sequentially
        for (let i = 0; i < imageCount; i++) {
          try {
            // Generate unique image URL
            const imageId = Math.floor(Math.random() * 1000);
            const imageUrl = `https://picsum.photos/id/${imageId}/200/300`;

            // Create unique filename
            const fileName = `img_${Date.now()}_${i}.jpg`;
            const localPath = `${imageDir}${fileName}`;

            // 4. Download and save
            const { uri } = await FileSystem.downloadAsync(imageUrl, localPath);
            console.log(`Downloaded image ${i} to ${uri}`);
          } catch (error) {
            console.error(`Failed to download image ${i}:`, error);
          }
        }
      } catch (error) {
        console.error('Directory creation failed:', error);
        return;
      }
    };
    await getMockedImages();
    setLocation();
    setTime(Date.now());
  };

  return (
    <SafeAreaView style={{ flex: 1, gap: 20 }}>
      <Bookmark title='Photo' />
      <View style={styles.container}>
        <Input
          label='Hose ID'
          placeholder='Hose'
          value={hoseId ?? ''}
          onChangeText={setHoseId}
        />
        <Input
          label='Location ID'
          placeholder='Location'
          value={locationId ?? ''}
          onChangeText={setLocationId}
        />
        <ButtonTHS title='Get albums' onPress={getImages} />
      </View>
      <View style={styles.container}>
        <ScrollView>
          {!!dirUri && (
            <ImageGallery dirUri={dirUri} title='Hose' rerender={time} />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
  },
});

export default Photo;
