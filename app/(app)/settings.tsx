import { Bookmark } from '@/components/detailView/common/Bookmark';
import { DataField } from '@/components/detailView/common/Datafield';
import { Typography } from '@/components/Typography';
import { ButtonTHS } from '@/components/UI';
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

const User = () => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/');
  };
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
      <Bookmark title='App settings' />
      <DataField label='Version:' value={'223949MOB'} />
      <DataField label='Environment:' value={'223949MOB'} />
      <DataField label='Web Service Endpoint:' value={'223949MOB'} />
      <Bookmark title='Locations / Structures' />
      <DataField label='Customer Number:' value={'223949MOB'} />
      <DataField label='Customer Description:' value={'223949MOB'} />
      <DataField label='Location:' value={'223949MOB'} />
      <Bookmark title='Synchronization status' />
      <DataField label='Last synced:' value={'223949MOB'} />
    </ScrollView>
  );
};

export default User;

const styles = StyleSheet.create({
  scrollView: { paddingHorizontal: 10, paddingBottom: 30 },
  headerWrapper: {
    paddingTop: 30,
    paddingBottom: 40,
  },
  header: { textAlign: 'center' },
  section: {
    gap: 20,
  },
  sectionData: {
    gap: 10,
  },
});
