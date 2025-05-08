import { Bookmark } from '@/components/detailView/common/Bookmark';
import { DataField } from '@/components/detailView/common/Datafield';
import { Typography } from '@/components/Typography';
import { useAppContext } from '@/context/ContextProvider';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

const User = () => {
  const { state, dispatch } = useAppContext();

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.headerWrapper}>
        <Typography
          name='sectionHeader'
          text='Settings'
          style={styles.header}
        />
      </View>
      <View style={styles.section}>
        <Bookmark title='User' />
        <View style={styles.sectionData}>
          <DataField label='User ID:' value={'223949MOB'} />
          <DataField label='Full name:' value={'223949MOB'} />
        </View>
      </View>
      <View style={styles.section}>
        <Bookmark title='App settings' />
        <View style={styles.sectionData}>
          <DataField label='Version:' value={'223949MOB'} />
          <DataField label='Environment:' value={'223949MOB'} />
          <DataField label='Web Service Endpoint:' value={'223949MOB'} />
        </View>
      </View>
      <View style={styles.section}>
        <Bookmark title='Locations / Structures' />
        <View style={styles.sectionData}>
          <DataField label='Customer Number:' value={'223949MOB'} />
          <DataField label='Customer Description:' value={'223949MOB'} />
          <DataField label='Location:' value={'223949MOB'} />
        </View>
      </View>
      <View style={styles.section}>
        <Bookmark title='Synchronization status' />
        <DataField label='Last synced:' value={'223949MOB'} />
      </View>
    </ScrollView>
  );
};

export default User;

const styles = StyleSheet.create({
  scrollView: { paddingHorizontal: 10, paddingBottom: 30, gap: 30 },
  headerWrapper: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  header: { textAlign: 'center' },
  section: {
    gap: 20,
  },
  sectionData: {
    gap: 10,
  },
});
