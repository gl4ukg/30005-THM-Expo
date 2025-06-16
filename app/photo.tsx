import { Bookmark } from '@/components/detailView/common/Bookmark';
import { ImageFileData, ImageGallery } from '@/components/UI/Photos';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import * as FileSystem from 'expo-file-system';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonTHS } from '@/components/UI';
import { Input } from '@/components/UI/Input/Input';

const Photo = () => {
  const [hoseId, setHoseId] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [dirUri, setDirUri] = useState<string | null>(null);

  const setLocation = () =>
    setDirUri(`${FileSystem.documentDirectory}THM/${locationId}/${hoseId}`);

  return (
    <SafeAreaView style={{ flex: 1, gap: 20 }}>
      <Bookmark title='Photo' />
      <Input placeholder='Hose' value={hoseId ?? ''} onChangeText={setHoseId} />
      <Input
        placeholder='Location'
        value={locationId ?? ''}
        onChangeText={setLocationId}
      />
      <ButtonTHS title='Get albums' onPress={setLocation} />
      <View style={styles.container}>
        <ScrollView>
          {!!dirUri && <ImageGallery dirUri={dirUri} title='Hose' />}
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
