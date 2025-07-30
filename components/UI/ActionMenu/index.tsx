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
}

export const SelectDropdown: FC<Props<string>> = ({
  selected,
  options,
  onChange,
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

  const handleOverlayPress = () => {
    setIsOpen(false);
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
  const displayLabel =
    selectedOption?.label ||
    (options.length > 0 ? options[0].label : 'No options available');

  return (
    <>
      <Pressable
        ref={buttonRef}
        onPress={handleButtonPress}
        style={[styles.button, isOpen && styles.buttonOpen]}
      >
        <View>
          <Typography
            name='navigation'
            text={displayLabel}
            style={styles.buttonText}
          />
        </View>
        <Icon
          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
          color={colors.primary}
          size='sm'
        />
      </Pressable>

      {isOpen && (
        <Modal
          visible={isOpen}
          transparent
          animationType='fade'
          onRequestClose={handleOverlayPress}
        >
          <Pressable onPress={handleOverlayPress} style={styles.overlay}>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View
                style={[styles.dropdown, getDropdownPosition(buttonLayout)]}
              >
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
          </Pressable>
        </Modal>
      )}
    </>
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
    color: colors.black,
    marginRight: 8,
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
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.primary,
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
