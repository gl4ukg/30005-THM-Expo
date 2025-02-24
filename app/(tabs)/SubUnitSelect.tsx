import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useState } from 'react';

type SubUnit = {
  id: number;
  name: string;
};

const mockSubUnits = [
  {
    id: 1,
    name: 'SubUnit 1',
  },
  {
    id: 2,
    name: 'SubUnit 2',
  },
  {
    id: 3,
    name: 'SubUnit 3',
  },
];

const SubUnitSelect = () => {
  const [selectedSubUnit, setSelectedSubUnit] = useState(mockSubUnits[0]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const selectSubUnit = (subUnit: SubUnit) => {
    setSelectedSubUnit(subUnit);
    setIsDropdownVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.selectContainer} onPress={toggleDropdown}>
        <Typography
          name='navigation'
          text={selectedSubUnit?.name}
          style={styles.selectText}
        />
        <Icon name='Down' color='white' size='sm' />
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          {mockSubUnits.map((subUnit) => (
            <TouchableOpacity
              key={subUnit.id}
              style={styles.dropdownOption}
              onPress={() => selectSubUnit(subUnit)}
            >
              <Text style={styles.dropdownOptionText}>{subUnit.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

export default SubUnitSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004636',
    alignItems: 'center',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#004636',
    justifyContent: 'center',
  },
  selectText: {
    color: 'white',
    marginLeft: 5,
  },
  dropdownContainer: {
    width: '100%',
    backgroundColor: '#004636',
    borderWidth: 1,
    borderTopColor: '#A2F0B8',
  },
  dropdownOption: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#A2F0B8',
    alignItems: 'center',
  },
  dropdownOptionText: {
    color: 'white',
    fontSize: 16,
  },
});
