import { mockedData } from '@/context/mocked';
import { ListTable } from '@/components/dashboard/listTable';
import { SelectedHoseCounter } from '@/components/dashboard/selectedHoseCounter';
import { Typography } from '@/components/typography';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconName } from '@/components/Icon/iconMapping';
import { ActionsFab } from '@/components/UI/ActionMenu/fab';
import { colors } from '@/lib/tokens/colors';

interface Props {
  slug: string;
}

export type HoseType = {
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
  const random7DigitString = (): string =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
  const randomDateString = () => {
    const dateNum =
      Math.random() * (+new Date('01-01-2026') - +new Date('01-01-2000') + 1) +
      +new Date('01-01-2026');
    const date = new Date(dateNum);
    return date.toLocaleDateString().replace(/\/20/g, '').replace(/\//g, '');
  };
  const mockedList: HoseType[] = mockedData.map((item) => ({
    id: item.id,
    name: item.Description,
    position: item.S2Equipment,
    condition: item.hoseCondition,
    lastInspection: randomDateString(),
    lastInspectionDate: randomDateString(),
    nextInspection: randomDateString(),
    nextInspectionDate: randomDateString(),
    missingData: Math.random() > 0.5,
    hasRFID: Math.random() > 0.5,
    hasAttachment: Math.random() > 0.5,
    prodDate: item.prodDate,
  }));
  return {
    listLength: mockedList.length,
    listTitle: `Failed inspections (${mockedList.length})`,
    filteredList: mockedList,
  };
};
const list = getFilteredHoses('all').filteredList;

const Hose: React.FC<Props> = (props) => {
  const options = [
    {
      value: 'contactTessTeam',
      label: 'Contact TESS Team',
      subtitle: '(add hoses to message)',
      icon: 'Email' as IconName,
    },
    {
      value: 'requestForQuote',
      label: 'Request for quote',
      subtitle: '(add hoses to quote)',
      icon: 'Cart' as IconName,
    },
    {
      value: 'scrapHoses',
      label: 'Scrap hoses',
      subtitle: '(add hoses to bin)',
      icon: 'Trash' as IconName,
    },
    {
      value: 'callToYourMother',
      label: 'Call to your mother',
      subtitle: '(add hoses for your mother)',
      icon: 'Phone' as IconName,
    },
  ];
  const [action, setAction] = useState<{
    value: string;
    label: string;
    subtitle: string;
    icon: IconName;
    actionSelectedItems: string[];
  } | null>(null);
  const { filter } = useLocalSearchParams();

  const { filteredList, listTitle, listLength } = getFilteredHoses(
    Array.isArray(filter) ? filter[0] : filter,
  );

  const onChangeAction = (value: string) => {
    setAction({
      value,
      label: options.find((option) => option.value === value)?.label || '',
      subtitle:
        options.find((option) => option.value === value)?.subtitle || '',
      icon: options.find((option) => option.value === value)?.icon || 'Cart',
      actionSelectedItems: [],
    });
  };
  const handleSelectionChange = (id: string) => {
    if (action) {
      setAction({
        ...action,
        actionSelectedItems: action.actionSelectedItems.includes(id)
          ? action.actionSelectedItems.filter((item) => item !== id)
          : [...action.actionSelectedItems, id],
      });
    }
  };

  return (
    <>
      <ActionsFab
        selected={action?.value || null}
        options={options}
        onChange={onChangeAction}
        menuTitle='Actions'
      />
      <View style={style.header}>
        <Typography name='sectionHeader' text={listTitle} style={style.title} />
        {action && (
          <View style={style.selectedCounterContainer}>
            <View style={style.selectedCounterTitle}>
              <Typography name='navigation' text={action.label} />
              <Typography
                name='navigation'
                text={action.subtitle || ''}
                style={style.selectedCounterTitle}
              />
            </View>
            <View style={style.selectionCounter}>
              <SelectedHoseCounter
                icon={action.icon}
                counter={action.actionSelectedItems.length}
                handlePress={() => {}}
              />
            </View>
          </View>
        )}
      </View>
      <ListTable
        items={list}
        selectedIds={action?.actionSelectedItems || []}
        onSelectionChange={handleSelectionChange}
        canSelect={action !== null}
        onSelectAll={() => {
          if (action) {
            setAction({
              ...action,
              actionSelectedItems:
                action.actionSelectedItems.length === listLength
                  ? []
                  : [...filteredList.map((item) => item.id)],
            });
          }
        }}
      />
    </>
  );
};

export default Hose;

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
  selectedCounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  selectedCounterTitle: {
    alignItems: 'center',
  },
  selectedCounterSubtitle: {
    color: colors.extended666,
  },
  selectionCounter: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
  },
});
