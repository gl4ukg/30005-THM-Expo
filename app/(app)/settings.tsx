import { Bookmark } from '@/components/detailView/common/Bookmark';
import { DataField } from '@/components/detailView/common/Datafield';
import { Typography } from '@/components/Typography';
import { useAppContext } from '@/context/ContextProvider';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const User = () => {
  const router = useRouter();
  const { state } = useAppContext();

  let { user } = state.auth;
  const { appInfo } = state.settings;
  const { customer, workingUnitId, assignedUnits, lastUpdate } = state.data;
  const location = assignedUnits.find((unit) => unit.unitId === workingUnitId);
  if (!user) {
    router.push('/');
    return null;
  }
  useEffect(() => {
    user = state.auth.user;
  }, [state.auth.user]);

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
          <DataField label='User ID:' value={state.auth.user?.id} />
          <DataField label='Full name:' value={user.name} />
          {state.auth.user?.phoneNumber && (
            <DataField label='Phone number:' value={user.phoneNumber} />
          )}
          {user.customerNumbers &&
            user.customerNumbers.map((number) => (
              <DataField key={number} label='Customer number:' value={number} />
            ))}
        </View>
      </View>
      <View style={styles.section}>
        <Bookmark title='App settings' />
        <View style={styles.sectionData}>
          <DataField label='Version:' value={appInfo.version} />
          <DataField label='Environment:' value={appInfo.environment} />
          <DataField
            label='Web Service Endpoint:'
            value={appInfo.webServiceEndpoint}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Bookmark title='Locations / Structures' />
        <View style={styles.sectionData}>
          <DataField label='Customer Number:' value={`${customer.id}`} />
          <DataField label='Customer Description:' value={`${customer.name}`} />
          <DataField
            label='Location:'
            value={`${location?.unitId} - ${location?.unitName}`}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Bookmark title='Synchronization status' />
        <DataField label='Last synced:' value={lastUpdate?.toLocaleString()} />
      </View>
    </ScrollView>
  );
};

export default User;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    paddingBottom: 30,
    gap: 30,
  },
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
