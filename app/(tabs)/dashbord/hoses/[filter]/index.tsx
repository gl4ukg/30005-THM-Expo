import { mockedData } from '@/app/(tabs)/dashbord/hoses/[filter]/mocked';
import { ListTable } from '@/components/dashboard/listTable';
import { SelectedHoseCounter } from '@/components/dashboard/selectedHoseCounter';
import { Typography } from '@/components/typography';
import { Select } from '@/components/UI/Select';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconName } from '@/components/Icon/iconMapping';

interface Props {
  slug: string;
}

export type HostType = {
  id: string;
  name: string;
  position: string;
  condition: string;
  lastInspection: string;
  lastInspectionDate: string;
  nextInspection: string;
  nextInspectionDate: string;
  missingData: boolean;
  prodDate: string;
};
const getFilteredHoses = (filter: string) => {
  const random7DiggetString = (): string =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
  const randomDateString = () => {
    const dateNum =
      Math.random() * (+new Date('01-01-2026') - +new Date('01-01-2000') + 1) +
      +new Date('01-01-2026');
    const date = new Date(dateNum);
    return date.toLocaleDateString().replace(/\/20/g, '').replace(/\//g, '');
  };
  const mockedList: HostType[] = mockedData.map((item) => ({
    id: item.id,
    name: item.Description,
    position: item.S2Equipment,
    condition: item.hoseCondition,
    lastInspection: randomDateString(),
    lastInspectionDate: randomDateString(),
    nextInspection: randomDateString(),
    nextInspectionDate: randomDateString(),
    missingData: Math.random() > 0.5,
    prodDate: item.prodDate,
  }));
  return {
    listLength: mockedList.length,
    listTitle: `Failed inspections (${mockedList.length})`,
    filteredList: mockedList,
  };
};

const Host: React.FC<Props> = (props) => {
  const options = [
    { value: 'contactTessTeam', label: 'Contact TESS Team' },
    { value: 'requestForQuote', label: 'Request for quote' },
    { value: 'scrapHoses', label: 'Scrap hoses' },
  ];
  const [action, setAction] = useState<string | null>(null);
  const { filter } = useLocalSearchParams();
  const [selectedCount, setSelectedCount] = useState(0);
  const [icon, setIcon] = useState<IconName>('Cart');

  const { filteredList, listTitle, listLength } = getFilteredHoses(
    Array.isArray(filter) ? filter[0] : filter,
  );

  const actionIconMap: Record<string, IconName> = {
    contactTessTeam: 'Email',
    requestForQuote: 'Cart',
    scrapHoses: 'Trash',
  };

  const onChangeAction = (value: string) => {
    setAction(value);
    setIcon(actionIconMap[value]);
  };
  const handleSelectionChange = (count: number) => {
    setSelectedCount(count);
  };

  return (
    <SafeAreaView style={style.safeView}>
      <View style={style.header}>
        <Typography name='tableHeader' text={listTitle} style={style.title} />
        <Select
          selected={action}
          options={options}
          onChange={onChangeAction}
          menuTitle='Actions'
        />
        {action && (
          <View style={style.selectionCounter}>
            <SelectedHoseCounter
              icon={icon}
              counter={selectedCount}
              handlePress={function (): void {
                console.log(`${selectedCount} items selected for ${action} `);
              }}
            />
          </View>
        )}
      </View>
      <ListTable
        data={[...getFilteredHoses('filter').filteredList]}
        onSelectionChange={handleSelectionChange}
      />
    </SafeAreaView>
  );
};

export default Host;

const style = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menu: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    // justifyContent: "space-evenly",
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
  title: {
    marginBottom: 6,
  },
  selectionCounter: {
    width: '100%',
    alignItems: 'flex-end',
  },
});
