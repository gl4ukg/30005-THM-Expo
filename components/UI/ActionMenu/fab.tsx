import { Section } from '@/app/(app)/dashboard/hoses/hose/[hoseId]';
import { Icon } from '@/components/Icon/Icon';
import { IconName } from '@/components/Icon/iconMapping';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { FC, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type Option<T> = {
  icon?: IconName;
  label: string;
  value: T;
};
interface Props<T> {
  menuTitle?: string;
  options: Option<T>[];
  onChange: (value: T) => void;
  scrollToSection?: (sectionId: string) => void;
  shortcuts?: Section[];
}

export const ActionsFab: FC<Props<string>> = ({
  options,
  onChange,
  scrollToSection,
  shortcuts,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: Partial<string>) => {
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
            {shortcuts !== undefined && (
              <View style={style.jumpToContainer} key='jumpTo'>
                <Typography
                  name='navigationBold'
                  style={style.jumpToItem}
                  text='Jump to:'
                />
                {shortcuts.map((section: any) => (
                  <Pressable
                    key={section.value}
                    onPress={() => handleShortcutPress(section.id)}
                    style={style.jumpToItem}
                  >
                    <Typography name='navigation' text={section.title} />
                    <Icon
                      name='ArrowRight'
                      size='sm'
                      color={colors.primary25}
                    />
                  </Pressable>
                ))}
              </View>
            )}
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
          </View>
        </Pressable>
      </Modal>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        style={[style.button, { bottom: 20 + insets.bottom }]}
      >
        <Typography
          name='navigation'
          text={'Action'}
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
    backgroundColor: colors.dashboardGreen,
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
  divider: {},
  jumpToContainer: {
    marginLeft: 10,
    gap: 0,
    borderBottomWidth: 3,
    borderBottomColor: colors.primary25,
    paddingBottom: 10,
  },
  jumpToItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'right',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    gap: 10,
  },
});
