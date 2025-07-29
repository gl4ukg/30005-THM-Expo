import { RadioButton } from '@/components/detailView/common/RadioButton';
import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { FC, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

type Option<T> = {
  label: string;
  value: T;
};

interface Props<T> {
  selected?: T | null;
  options: Option<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
}

export const SelectDropdown: FC<Props<string>> = ({
  selected,
  options,
  onChange,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const buttonRef = useRef<View>(null);

  const handleChange = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleButtonPress = () => {
    if (!isOpen) {
      buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setButtonLayout({ x: pageX, y: pageY, width, height });
      });
    }
    setIsOpen(!isOpen);
  };

  const getDropdownPosition = (buttonLayout: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => ({
    top: buttonLayout.y + buttonLayout.height + 5,
    left: 20,
    right: 20,
  });

  const selectedOption = options.find((o) => o.value === selected);

  return (
    <View>
      <Pressable
        ref={buttonRef}
        onPress={handleButtonPress}
        style={[styles.button, isOpen && styles.buttonOpen]}
      >
        <Typography
          name='navigation'
          text={selectedOption?.label || placeholder}
          style={[styles.buttonText, !selectedOption && styles.placeholderText]}
        />
        <Icon
          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
          color={colors.primary}
          size='sm'
        />
      </Pressable>

      <Modal visible={isOpen} transparent animationType='fade'>
        <Pressable onPress={() => setIsOpen(false)} style={styles.overlay}>
          <View style={[styles.dropdown, getDropdownPosition(buttonLayout)]}>
            {options.map((option) => (
              <RadioButton
                key={option.value}
                label={option.label}
                isSelected={selected === option.value}
                onChange={() => handleChange(option.value)}
                menu
                id={option.value}
              />
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  buttonOpen: {
    borderColor: colors.primary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonText: {
    flex: 1, // Allows the text to take up available space
    color: colors.black,
    marginRight: 8, // <-- RE-INTRODUCED: This creates space to the left of the chevron
  },
  placeholderText: {
    color: colors.extended333,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdown: {
    backgroundColor: colors.lightContrast25,
    position: 'absolute',
    paddingTop: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
});
