import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/typography';
import { colors } from '@/lib/tokens/colors';
import { FC, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { IconName } from '@/components/Icon/iconMapping';

type Option<T> = {
  icon?: IconName;
  label: string;
  value: T;
};
interface Props<T> {
  menuTitle?: string;
  selected: T | null;
  options: Option<T>[];
  onChange: (value: T) => void;
  detailPage?: boolean;
}

export const ActionMenu: FC<Props<string>> = ({
  selected,
  options,
  onChange,
  menuTitle,
  detailPage,
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
                  {option.icon && <Icon name={option.icon} size='sm' />}
                  <Typography name='navigation' text={option.label} />
                </View>
              </Pressable>
            ))}
            {detailPage && (
              <>
                <View style={style.divider} />
                <Typography style={style.jumpToHeader} name='navigation'>
                  Jump to:
                </Typography>
                <View style={style.jumpToContainer}>
                  <Pressable
                    onPress={() => setIsOpen(false)}
                    style={style.jumpToItem}
                  >
                    <Typography name={'navigation'}>Photos</Typography>
                    <Icon name='ArrowRight' color={colors.primary} size='sm' />
                  </Pressable>
                  <Pressable
                    onPress={() => setIsOpen(false)}
                    style={style.jumpToItem}
                  >
                    <Typography name={'navigation'}>Hose module</Typography>
                    <Icon name='ArrowRight' color={colors.primary} size='sm' />
                  </Pressable>
                  <Pressable
                    onPress={() => setIsOpen(false)}
                    style={style.jumpToItem}
                  >
                    <Typography name={'navigation'}>
                      TESS Part Numbers
                    </Typography>
                    <Icon name='ArrowRight' color={colors.primary} size='sm' />
                  </Pressable>
                  <Pressable
                    onPress={() => setIsOpen(false)}
                    style={style.jumpToItem}
                  >
                    <Typography name={'navigation'}>
                      Maintenance info
                    </Typography>
                    <Icon name='ArrowRight' color={colors.primary} size='sm' />
                  </Pressable>
                  <Pressable
                    onPress={() => setIsOpen(false)}
                    style={style.jumpToItem}
                  >
                    <Typography name={'navigation'}>Documents</Typography>
                    <Icon name='ArrowRight' color={colors.primary} size='sm' />
                  </Pressable>
                  <Pressable
                    onPress={() => setIsOpen(false)}
                    style={style.jumpToItem}
                  >
                    <Typography name={'navigation'}>Structure</Typography>
                    <Icon name='ArrowRight' color={colors.primary} size='sm' />
                  </Pressable>
                  <Pressable
                    onPress={() => setIsOpen(false)}
                    style={style.jumpToItem}
                  >
                    <Typography name={'navigation'}>History</Typography>
                    <Icon name='ArrowRight' color={colors.primary} size='sm' />
                  </Pressable>
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
  jumpToHeader: {
    marginLeft: 10,
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
