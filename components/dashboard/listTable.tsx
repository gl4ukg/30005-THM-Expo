import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { colors } from '@/lib/tokens/colors';
import { FC, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

interface Props {
  data: {
    id: string;
    position: string;
    condition: string;
    lastInspection: string;
    missingData?: boolean;
  }[];
}

const spacing = {
  paddingBlock: 10,
};
export const ListTable: FC<
  Props & {
    onSelectionChange?: (count: number) => void;
  }
> = ({ data, onSelectionChange }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedIds.length);
    }
  }, [selectedIds]);

  const handleRowPress = (item: (typeof data)[0]) => {
    router.push(`/(tabs)/dashbord/hoses/hose/${item.id}?id=${item.id}`);
  };

  return (
    <View style={style.container}>
      <View
        style={[
          style.tableHeader,
          {
            paddingLeft: spacing.paddingBlock,
            paddingRight: spacing.paddingBlock,
          },
        ]}
      >
        <Typography
          name='tableHeader'
          text='Hose ID'
          style={[style.label, style.labelColumOne]}
        />
        <Typography
          name='tableHeader'
          text='Position/Condition'
          style={[style.label, style.labelColumTwo]}
        />
        <Typography
          name='tableHeader'
          text='Inspected'
          style={[style.label, style.labelColumThree]}
        />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Element
            item={item}
            isSelected={selectedIds.includes(item.id)}
            onSelectedChange={
              selectedIds.includes(item.id)
                ? () =>
                    setSelectedIds(selectedIds.filter((id) => id !== item.id))
                : () => {
                    setSelectedIds([...selectedIds, item.id]);
                  }
            }
            canBeSelected={true}
            onRowPress={() => handleRowPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

interface ElementProps {
  item: {
    id: string;
    position: string;
    condition: string;
    lastInspection: string;
    missingData?: boolean;
  };
  canBeSelected?: boolean;
  isSelected?: boolean;
  onSelectedChange?: () => void;
  onRowPress: () => void;
}
const Element: FC<ElementProps> = ({
  item,
  canBeSelected,
  isSelected,
  onSelectedChange,
  onRowPress,
}) => {
  const [selected, setSelected] = useState<boolean>(isSelected || false);
  const handleSelect = () => {
    setSelected((selected) => !selected);
    onSelectedChange && onSelectedChange();
  };
  return (
    <Pressable onPress={onRowPress}>
      <View
        style={[
          elementStyle.container,
          selected && elementStyle.containerSelected,
        ]}
      >
        <View style={elementStyle.columnOne}>
          <Typography name='tableContentNumber' text={item.id} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 22,
            }}
          >
            {item.missingData && (
              <Icon name='Alert' color={colors.error} size='xsm' />
            )}
          </View>
        </View>
        <View style={elementStyle.columnTwo}>
          <Typography
            name='tableContent'
            text={item.position}
            numberOfLines={1}
            ellipsizeMode='tail'
          />
          <View style={elementStyle.subtitleDateContainer}>
            <Typography
              name='tableContent'
              text={
                item.condition.length
                  ? item.condition
                  : '44-Visible leakage - and some more defects'
              }
              style={elementStyle.subtitle}
              numberOfLines={1}
            />
            <Typography
              name='tableContentNumber'
              text={item.lastInspection.length ? item.lastInspection : 'N/A'}
              style={elementStyle.date}
            />
          </View>
        </View>
        <View style={elementStyle.columnThree}>
          {canBeSelected && (
            <Checkbox isChecked={selected} onChange={handleSelect} />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const elementStyle = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    paddingTop: 10,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderColor: colors.secondary95,
  },
  containerSelected: {
    backgroundColor: colors.lightContrast25,
    borderColor: colors.primary25,
  },
  columnOne: {
    width: 80,
    paddingLeft: 10,
  },
  columnTwo: {
    flex: 1,
  },
  columnThree: {
    width: 40,
    alignItems: 'center',
  },
  subtitleDateContainer: {
    flexDirection: 'row',
    gap: 5,
    flex: 1,
  },
  subtitle: {
    flex: 1,
  },
  date: {
    width: 70,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
});

const style = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  tableHeader: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    paddingTop: 20,
    paddingBottom: 2,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    // flex: 1,
  },
  label: {
    alignSelf: 'flex-start',
    paddingTop: 20,
  },
  labelColumOne: { width: 70 },
  labelColumTwo: { flex: 1 },
  labelColumThree: { width: 105 },
});
