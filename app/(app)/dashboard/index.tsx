import { BarChart, Primary, Secondary } from '@/components/dashboard';
import { BarData } from '@/components/dashboard/BarChart';
import { SyncStatus } from '@/components/dashboard/SyncStatus';
import { Typography } from '@/components/Typography';
import { SelectDropdown } from '@/components/UI/ActionMenu';
import { AppContext } from '@/context/Reducer';
import { useDataManager } from '@/hooks/useDataManager';
import { useLoginManager } from '@/hooks/useLoginManager';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';

const month: BarData = [];
const day: BarData = [];
const week: BarData = [];
const year: BarData = [
  // {
  //   value: 2022,
  //   label: '2020',
  // },
  // {
  //   value: 3122,
  //   label: '2021',
  // },
  // {
  //   value: 2122,
  //   label: '2022',
  // },
  // {
  //   value: 5121,
  //   label: '2023',
  // },
  // {
  //   value: 1012,
  //   label: '2024',
  // },
  // {
  //   value: 1221,
  //   label: '2025',
  // },
];

const options = [
  {
    label: 'pr Month',
    value: 'month',
  },
  {
    label: 'pr Week',
    value: 'week',
  },
  {
    label: 'pr Day',
    value: 'day',
  },
  {
    label: 'pr Year',
    value: 'year',
  },
];

const Dashboard = () => {
  const [selected, setSelected] =
    useState<(typeof options)[0]['value']>('month');
  const { dispatch, state } = useContext(AppContext);
  const { hoses } = useDataManager();

  const fetchData = useCallback(async () => {
    try {
      const { status, message } = await hoses.get();
      if (status === 'error') {
        Alert.alert('Data Loading Error', message, [
          {
            text: 'Logout',
            onPress: logout,
          },
        ]);
        return;
      }
    } catch (dataError) {
      console.error('Failed to initialize user data:', dataError);
      Alert.alert(
        'Data Loading Error',
        'Login successful but failed to load user data. Please try again.',
        [{ text: 'OK' }],
      );
      return;
    }
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: 'FINISH_SELECTION',
      });
      fetchData();
    }, [dispatch]),
  );

  useEffect(() => {
    dispatch({
      type: 'SET_IS_CANCELABLE',
      payload: false,
    });
  }, []);

  const [barData, setBarData] = useState<BarData>(month);
  useEffect(() => {
    switch (selected) {
      case 'month':
        setBarData(month);
        break;
      case 'week':
        setBarData(week);
        break;
      case 'day':
        setBarData(day);
        break;
      case 'year':
        setBarData(year);
        break;
    }
  }, [selected]);
  const router = useRouter();

  const goToFilter = (filter: string) => {
    router.push(`/(app)/dashboard/hoses/${filter}`);
  };

  return (
    <View>
      <ScrollView contentContainerStyle={style.container}>
        <SyncStatus
          timestamp={state.data.lastUpdate?.getTime() ?? null}
          status={state.data.lastUpdateStatus}
          onRetry={fetchData}
        />
        <Typography name='sectionHeader' text='Inspections' />
        <SelectDropdown
          selected={selected}
          options={options}
          onChange={(value) => setSelected(value)}
        />

        <BarChart barData={barData} />
        <View
          style={[
            style.menu,
            Dimensions.get('window').width <= 320 && { gap: 5 },
          ]}
        >
          <Primary
            label='Failed'
            value={0}
            trend={1}
            state='error'
            onPress={() => goToFilter('failed')}
          />
          <Primary
            label='Overdue'
            value={0}
            trend={-1}
            state='warning'
            onPress={() => goToFilter('overdue')}
          />
          <Primary
            label='w/Remarks'
            value={0}
            trend={0}
            state='success'
            onPress={() => goToFilter('withRemarks')}
          />
        </View>
        <Secondary
          onPress={() => goToFilter('upcoming')}
          label='Hoses soon to be inspected'
          value={state.data.hoses.length}
          trend={0}
        />
        <View style={style.replacements}>
          <Typography name='sectionHeader' text='Replacements' />
        </View>
        <Secondary
          onPress={() => goToFilter('overdue')}
          label='Replacements overdue'
          value={0}
          trend={0}
        />
        <Secondary
          onPress={() => goToFilter('upcoming')}
          label='Replacements upcoming'
          value={0}
          trend={0}
        />
        <Secondary
          onPress={() => goToFilter('iInTransit')}
          label='New hoses in transit'
          value={0}
          trend={0}
        />
        <Secondary
          onPress={() => goToFilter('recycled')}
          label='Hoses recycled'
          value={0}
          trend={0}
        />
        <View></View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: -10,
  },
  menu: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    padding: 0,
    gap: 12,
    flexDirection: 'row',
  },
  replacements: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    gap: 12,
  },
});

export default Dashboard;
