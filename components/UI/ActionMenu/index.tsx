import { Section } from '@/app/(app)/dashboard/hoses/hose/[hoseId]';
import { Icon } from '@/components/Icon/Icon';
import { IconName } from '@/components/Icon/iconMapping';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { FC, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Option<T> = {
  icon?: IconName;
  label: string;
  value: T;
};
interface Props<T> {
  menuTitle?: string;
  selected?: T | null;
  options: Option<T>[];
  onChange: (value: T) => void;
  detailPage?: boolean;
  scrollToSection?: (sectionId: string) => void;
  shortcuts?: Section[];
}

export const ActionMenu: FC<Props<string>> = ({
  selected,
  options,
  onChange,
  menuTitle,
  detailPage,
  scrollToSection,
  shortcuts,
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

  const handleShortcutPress = (sectionId: string) => {
    setIsOpen(false);
    scrollToSection?.(sectionId);
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
    top: buttonLayout.y + buttonLayout.height,
    left: 20,
    right: 20,
  });

  return (
    <View>
      <Pressable
        ref={buttonRef}
        onPress={handleButtonPress}
        style={style.button}
      >
        <Text style={style.buttonText}>
          {selected
            ? options.find((o) => o.value === selected)?.label
            : menuTitle || 'Select'}
        </Text>
        <Icon
          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
          color={colors.primary}
        />
      </Pressable>

      <Modal visible={isOpen} transparent>
        <Pressable onPress={() => setIsOpen(false)} style={style.modal}>
          <View style={[style.options, getDropdownPosition(buttonLayout)]}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => handleChange(option.value)}
                style={style.option}
              >
                {option.icon && <Icon name={option.icon} size='sm' />}
                <Typography name='navigation' text={option.label} />
              </Pressable>
            ))}

            {detailPage && shortcuts && (
              <>
                <View style={style.divider} />
                <Typography style={style.boldText} name='navigation'>
                  Jump to:
                </Typography>
                <View style={style.jumpToContainer}>
                  {shortcuts.map((section, index) => (
                    <Pressable
                      key={`${section.id}-${index}`}
                      onPress={() => handleShortcutPress(section.id)}
                      style={style.jumpToItem}
                    >
                      <Typography name='navigation' text={section.title} />
                      <Icon name='ArrowRight' size='sm' />
                    </Pressable>
                  ))}
                </View>
              </>
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: colors.black + '75',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonText: {
    color: colors.primary,
  },
  options: {
    backgroundColor: colors.dashboardGreen,
    position: 'absolute',
    padding: 20,
    gap: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: colors.primary,
    borderBottomColor: colors.primary,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary25,
  },
  jumpToContainer: {
    marginLeft: 10,
    gap: 8,
  },
  jumpToItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
