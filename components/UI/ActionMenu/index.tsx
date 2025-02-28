import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { colors } from '@/lib/tokens/colors';
import { FC, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { IconName } from '@/components/Icon/iconMapping';
import { Section } from '@/app/(tabs)/dashbord/hoses/hose/[slug]';

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

  const handleChange = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleShortcutPress = (sectionId: string) => {
    setIsOpen(false);
    scrollToSection?.(sectionId);
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
            {options.map((option, i) => (
              <Pressable
                key={option.value}
                onPress={() => handleChange(option.value)}
              >
                <View key={option.value} style={style.option}>
                  {option.icon && <Icon name={option.icon} size='sm' />}
                  <Typography name='navigation' text={option.label} />
                </View>
              </Pressable>
            ))}
            {detailPage && shortcuts !== undefined && (
              <>
                <View style={style.divider} />
                <Typography style={style.boldText} name='navigation'>
                  Jump to:
                </Typography>
                <View
                  style={style.jumpToContainer}
                  key={`jumpTo${options.length}`}
                >
                  {shortcuts.map((section: any) => (
                    <Pressable
                      key={section.value}
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
