import { ListTable } from '@/components/dashboard/listTable';
import { SelectedHoseCounter } from '@/components/dashboard/selectedHoseCounter';
import { IconName } from '@/components/Icon/iconMapping';
import { Typography } from '@/components/typography';
import { ActionsFab } from '@/components/UI/ActionMenu/fab';
import { useAppContext } from '@/context/ContextProvider';
import { Hose, SelectionActionsType, isMultiSelection } from '@/context/state';
import { colors } from '@/lib/tokens/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

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
const getFilteredHoses = (filter: string, data: Hose[]) => {
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

  const router = useRouter();
  type Option<T extends string> = {
    value: T;
    label: string;
    subtitle?: string;
    icon?: IconName;
  };
  const options: Option<SelectionActionsType>[] = [
    {
      value: 'CONTACT',
      label: 'Contact TESS Team',
      subtitle: '(add hoses to message)',
      icon: 'Email',
    },
    {
      value: 'RFQ',
      label: 'Request for quote',
      subtitle: '(add hoses to quote)',
      icon: 'Cart',
    },
    {
      value: 'SCRAP',
      label: 'Scrap hoses',
      subtitle: '(add hoses to bin)',
      icon: 'Trash',
    },
  ] as const;

  const { filteredList, listTitle, listLength } = getFilteredHoses(
    filter ?? '',
    state.data.hoses,
  ); //TODO
  const onChangeAction = (value: SelectionActionsType) => {
    dispatch({
      type: 'START_MULTI_SELECTION',
      payload: value,
    });
  };
  const handleSelectionChange = (id: string) => {
    const selection = state.data.selection;
    if (isMultiSelection(selection)) {
      console.log('handleSelectionChange', id);
      dispatch({
        type: 'TOGGLE_HOSE_MULTI_SELECTION',
        payload: id,
      });
    }
  };
  const toggleSelectAll = () => {
    if (isMultiSelection(state.data.selection)) {
      const allIds = filteredList.map((item) => item.id);
      const isAllSelected = state.data.selection.ids.length === listLength;

      if (isAllSelected) {
        dispatch({ type: 'DESELECT_ALL_HOSES_MULTI_SELECTION' });
      } else {
        dispatch({
          type: 'SELECT_MANY_HOSES_MULTI_SELECTION',
          payload: allIds,
        });
      }
    }
  };
  const handleSelectionAction = () => {
    if (isMultiSelection(state.data.selection)) {
      const action = state.data.selection.type;
      router.push({
        pathname: `/dashbord/actions/[action]`,
        params: { action },
      });
    }
  };
  return (
    <>
      <ActionsFab
        selected={state.data.selection?.type || null}
        options={options}
        onChange={onChangeAction}
        menuTitle='Actions'
      />
      <View style={style.header}>
        <Typography name='sectionHeader' text={listTitle} style={style.title} />
        {isMultiSelection(state.data.selection) && (
          <View style={style.selectedCounterContainer}>
            <View style={style.selectedCounterTitle}>
              <Typography
                name='navigation'
                text={
                  options.find((o) => o.value === state.data.selection?.type)
                    ?.label
                }
              />
              <Typography
                name='navigation'
                text={
                  options.find((o) => o.value === state.data.selection?.type)
                    ?.subtitle
                }
                style={style.selectedCounterTitle}
              />
            </View>
            <View style={style.selectionCounter}>
              <SelectedHoseCounter
                icon={
                  options.find((o) => o.value === state.data.selection?.type)
                    ?.icon || 'Alert'
                }
                counter={state.data.selection.ids.length}
                handlePress={handleSelectionAction}
              />
            </View>
          </View>
        )}
      </View>
      <ListTable
        items={filteredList}
        selectedIds={
          (isMultiSelection(state.data.selection) &&
            state.data.selection?.ids) ||
          []
        }
        onSelectionChange={handleSelectionChange}
        canSelect={isMultiSelection(state.data.selection)}
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
