import { ListTable } from '@/components/dashboard/listTable';
import { SelectedHoseCounter } from '@/components/dashboard/SelectedHoseCounter';
import { IconName } from '@/components/Icon/iconMapping';
import { Typography } from '@/components/Typography';
import { ActionsFab } from '@/components/UI/ActionMenu/fab';
import { useAppContext } from '@/context/ContextProvider';
import { MultiSelectionActionsType } from '@/context/state';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { needsThisCodeToGetAccess } from '@/lib/util/getAccess';
import { generateNumericDraftId } from '@/lib/util/unikId';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  slug: string;
}

const getFilteredHoses = (filter: string, data: HoseData[]) => {
  let filteredList = [...data];
  return {
    listLength: filteredList.length,
    listTitle: `Failed inspections (${filteredList.length})`,
    filteredList: filteredList,
  };
};

const FilteredHosesList: React.FC<Props> = (props) => {
  const { state, dispatch } = useAppContext();

  let { filter } = useLocalSearchParams();

  if (Array.isArray(filter)) {
    filter = filter[0];
  }
  const [selected, setSelected] = useState<number[]>([]);
  const [selectionType, setSelectionType] =
    useState<MultiSelectionActionsType | null>(null);
  const router = useRouter();
  type Option<T extends string> = {
    value: T;
    label: string;
    subtitle?: string;
    icon?: IconName;
    isAccessDenied?: true;
  };
  const options: Option<MultiSelectionActionsType>[] = [
    {
      value: 'CONTACT',
      label: 'Contact TESS Team',
      subtitle: '(add hoses to message)',
      icon: 'Email',
      isAccessDenied: needsThisCodeToGetAccess(
        2,
        state.auth.user?.userAccessCode,
      ),
    },
    {
      value: 'RFQ',
      label: 'Request for quote',
      subtitle: '(add hoses to quote)',
      icon: 'Cart',
      isAccessDenied: needsThisCodeToGetAccess(
        4,
        state.auth.user?.userAccessCode,
      ),
    },
    {
      value: 'SCRAP',
      label: 'Scrap hoses',
      subtitle: '(add hoses to bin)',
      icon: 'Trash',
      isAccessDenied: needsThisCodeToGetAccess(
        7,
        state.auth.user?.userAccessCode,
      ),
    },
  ] as const;

  const { filteredList, listTitle, listLength } = getFilteredHoses(
    filter ?? '',
    state.data.hoses,
  ); //TODO
  const onChangeAction = (value: MultiSelectionActionsType) => {
    setSelectionType(value);
  };
  const handleSelectionChange = (id: number) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const toggleSelectAll = () => {
    setSelected((prev) => {
      if (prev.length === listLength) {
        return [];
      } else {
        return filteredList.map((item) => item.assetId);
      }
    });
  };
  const handleSelectionAction = () => {
    if (selectionType) {
      const draftId = generateNumericDraftId(
        state.data.drafts.map((d) => d.id),
      ).toString();
      dispatch({
        type: 'SAVE_DRAFT',
        payload: {
          formData: {},
          selectedIds: selected,
          type: selectionType,
          id: +draftId,
          status: 'draft',
        },
      });
      router.push({
        pathname: `/dashboard/actions`,
        params: { action: selectionType, draftId: draftId, allowScan: 'true' },
      });
    }
  };
  return (
    <>
      <ActionsFab
        options={options}
        onChange={onChangeAction as (value: string) => void}
        menuTitle='Actions'
      />
      <View style={style.header}>
        <Typography name='sectionHeader' text={listTitle} style={style.title} />
        {selectionType && (
          <View style={style.selectedCounterContainer}>
            <View style={style.selectedCounterTitle}>
              <Typography
                name='navigation'
                text={options.find((o) => o.value === selectionType)?.label}
              />
              <Typography
                name='navigation'
                text={options.find((o) => o.value === selectionType)?.subtitle}
                style={style.selectedCounterTitle}
              />
            </View>
            <View style={style.selectionCounter}>
              <SelectedHoseCounter
                icon={
                  options.find((o) => o.value === selectionType)
                    ?.icon as IconName
                }
                counter={selected.length}
                handlePress={handleSelectionAction}
              />
            </View>
          </View>
        )}
      </View>
      <ListTable
        items={filteredList}
        selectedIds={selected}
        onSelectionChange={handleSelectionChange}
        canSelect={selectionType !== null}
        onSelectAll={toggleSelectAll}
      />
    </>
  );
};

export default FilteredHosesList;

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
