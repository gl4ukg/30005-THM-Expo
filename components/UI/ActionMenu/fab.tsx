import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { colors } from '@/lib/tokens/colors';
import { FC, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { IconName } from '@/components/Icon/iconMapping';
import { Section } from '@/app/(tabs)/dashbord/hoses/hose/[slug]';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

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
  scrollToSection?: (sectionId: string) => void;
  shortcuts?: Section[];
}

export const ActionsFab: FC<Props<string>> = ({
  selected,
  options,
  onChange,
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
  const insets = useSafeAreaInsets();

  return (
    <>
      <Modal visible={isOpen} transparent style={{ zIndex: 1 }}>
        <Pressable onPress={() => setIsOpen(false)} style={style.modal}>
          <View style={[style.options, { bottom: 150 + insets.bottom }]}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => handleChange(option.value)}
              >
                <View key={option.value} style={style.option}>
                  <Typography name='navigation' text={option.label} />
                  {option.icon && (
                    <Icon
                      name={option.icon}
                      size='sm'
                      color={colors.primary25}
                    />
                  )}
                </View>
              </Pressable>
            ))}
            {shortcuts !== undefined && (
              <>
                <View style={style.divider} />
                <Typography style={style.boldText} name='navigation'>
                  Jump to:
                </Typography>
                <View style={style.jumpToContainer} key='jumpTo'>
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
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        style={[style.button, { bottom: 20 + insets.bottom }]}
      >
        <Typography
          name='navigation'
          text={!!selected ? selected : 'Action'}
          style={style.buttonText}
        ></Typography>
        {<Icon name={isOpen ? 'Cross' : 'ChevronDown'} color={colors.white} />}
      </Pressable>
    </>
  );
};

const style = StyleSheet.create({
  container: {},
  modal: {
    flex: 1,
    zIndex: -1,
    position: 'relative',
    backgroundColor: colors.black + '75',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.black,
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 10000,
  },
  buttonText: {
    color: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    backgroundColor: colors.dashbordGreen,
    width: '980%',
    maxWidth: 300,
    position: 'absolute',
    right: 0,
    padding: 10,
    gap: 0,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: colors.primary,
    borderBottomColor: colors.primary,
  },
  option: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    padding: 10,
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
