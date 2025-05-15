import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { useState } from 'react';
import {
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  selectedUnit: string | null;
  optionalUnits: { unitId: string; unitName: string }[];
  onSelectUnit: (unit: string) => void;
}

export const TopBarNavigation: React.FC<Props> = ({
  onSelectUnit,
  selectedUnit,
  optionalUnits,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const insets = useSafeAreaInsets();

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((exp) => !exp);
  };

  const selectSubUnit = (unitId: string) => {
    onSelectUnit(unitId);
    setIsExpanded(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.selectContainer} onPress={toggleExpanded}>
        <Icon name='Industry' color={colors.white} size='xsm' />
        <Typography
          name='navigation'
          text={
            optionalUnits.find((unit) => unit.unitId === selectedUnit)
              ?.unitName || 'Select'
          }
          style={styles.selectText}
        />
        <Icon name='ChevronDown' color={colors.white} size='xsm' />
      </Pressable>

      <Modal visible={isExpanded} transparent style={styles.modal}>
        <Pressable onPress={toggleExpanded} style={styles.modal} />
        <View
          style={[
            styles.dropdownContainer,
            { top: Platform.OS === 'ios' ? insets.top : 0 },
          ]}
        >
          {optionalUnits.map((unit) => (
            <Pressable
              key={unit.unitId}
              style={({ pressed }) => [
                styles.option,
                pressed && styles.optionPressed,
              ]}
              onPress={() => selectSubUnit(unit.unitId)}
            >
              {unit.unitId === selectedUnit && (
                <Icon name='Industry' color={colors.white} size='xsm' />
              )}
              <Typography
                name='navigation'
                text={unit.unitName}
                style={styles.optionText}
              />
            </Pressable>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'visible',
    zIndex: 1000,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary25,
    justifyContent: 'center',
    gap: 10,
    height: 28,
    shadowColor: colors.black,
    shadowOpacity: 0.25, // 25% opacity
    shadowRadius: 4, // blur 8
    shadowOffset: {
      width: 0, // no x-offset
      height: 8, // y-offset 2
    },
    elevation: 4, // android
  },
  selectText: {
    color: colors.white,
    marginLeft: 5,
  },
  dropdownContainer: {
    backgroundColor: colors.linkLightGreen,
    width: '100%',
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    gap: 1,
  },
  option: {
    backgroundColor: colors.secondary25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  optionPressed: {
    backgroundColor: colors.secondary50,
  },
  optionText: {
    color: colors.white,
  },
});
