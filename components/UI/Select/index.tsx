import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { colors } from '@/lib/tokens/colors';
import { FC, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Option<T> = {
  icon?: FC<any>;
  label: string;
  value: T;
};
interface Props<T> {
  menuTitle?: string;
  selected: T | null;
  options: Option<T>[];
  onChange: (value: T) => void;
}

export const Select: FC<Props<string>> = ({
  selected,
  options,
  onChange,
  menuTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };
  return (
    <View>
      <Pressable onPress={() => setIsOpen(!isOpen)} style={style.button}>
        <Text style={style.buttonText}>
          {selected
            ? options.find((o) => o.value === selected)?.label
            : menuTitle || 'Select'}
        </Text>
        {isOpen ? (
          <Icon name='ChevronUp' color={colors.primary} />
        ) : (
          <Icon name='ChevronDown' color={colors.primary} />
        )}
      </Pressable>
      <Modal visible={isOpen} transparent>
        <Pressable onPress={() => setIsOpen(false)} style={style.modal}>
          <View style={style.options}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => handleChange(option.value)}
              >
                <View key={option.value} style={style.option}>
                  {option.icon && <option.icon />}
                  <Typography name='navigation' text={option.label} />
                </View>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  modal: {
    flex: 1,
    position: 'relative',
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
    backgroundColor: colors.dashbordGreen,
    width: '90%',
    position: 'absolute',
    top: '20%',
    left: 20,
    right: 20,
    padding: 20,
    gap: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: colors.primary,
    borderBottomColor: colors.primary,
  },
  option: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
});
