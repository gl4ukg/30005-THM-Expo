import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// type SubUnit = {
//   id: number;
//   name: string;
// };

// const mockSubUnits = [
//   {
//     id: 1,
//     name: 'SubUnit 1',
//   },
//   {
//     id: 2,
//     name: 'SubUnit 2',
//   },
//   {
//     id: 3,
//     name: 'SubUnit 3',
//   },
// ];

interface Props {
  selectedUnit: string | null;
  optionalUnits: { id: string; name: string }[];
  onSelectUnit: (unit: string) => void;
}

export const SubUnitSelect: React.FC<Props> = ({
  onSelectUnit,
  selectedUnit,
  optionalUnits,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const selectSubUnit = (unitId: string) => {
    onSelectUnit(unitId);
    setIsDropdownVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.selectContainer} onPress={toggleDropdown}>
        <Icon name='Industry' color={colors.white} size='sm' />
        <Typography
          name='navigation'
          text={
            optionalUnits.find((unit) => unit.id === selectedUnit)?.name ||
            'Select'
          }
          style={styles.selectText}
        />
        <Icon name='ChevronDown' color={colors.white} size='sm' />
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          {optionalUnits.map((unit) => (
            <TouchableOpacity
              key={unit.id}
              style={styles.dropdownOption}
              onPress={() => selectSubUnit(unit.id)}
            >
              <Icon name='Industry' color={colors.white} size='sm' />
              <Text style={styles.dropdownOptionText}>{unit.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary25,
    alignItems: 'center',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.secondary25,
    justifyContent: 'center',
  },
  selectText: {
    color: colors.white,
    marginLeft: 5,
  },
  dropdownContainer: {
    width: '100%',
    backgroundColor: colors.secondary25,
    borderWidth: 1,
    borderTopColor: colors.lightContrast25,
  },
  dropdownOption: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightContrast25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 35,
  },
  dropdownOptionText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 5,
  },
});
