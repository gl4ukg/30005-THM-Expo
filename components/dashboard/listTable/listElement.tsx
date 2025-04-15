import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface ElementProps {
  item: HoseData;
  canBeSelected?: boolean;
  isSelected?: boolean;
  onSelectedChange?: (id: string) => void;
  onRowPress: () => void;
}
export const ListElement: FC<ElementProps> = ({
  item,
  canBeSelected,
  isSelected,
  onSelectedChange,
  onRowPress,
}) => {
  const { id, s1PlantVesselUnit, RFid, missingData } = item;
  const handleSelect = () => {
    if (!canBeSelected || !onSelectedChange) return;
    onSelectedChange(id);
  };
  const hasAttachment = Math.random() > 0.5;
  return (
    <Pressable onPress={onRowPress}>
      <View
        style={[
          elementStyle.container,
          isSelected && elementStyle.containerSelected,
        ]}
      >
        <View style={elementStyle.columnOne}>
          <Typography name='tableContentNumber' text={id} />
          <View style={elementStyle.iconsContainer}>
            <View style={elementStyle.iconContainer}>
              {!!RFid && (
                <Icon
                  name='RfidIdentificator'
                  color={colors.black}
                  size='xsm'
                />
              )}
            </View>
            <View style={elementStyle.iconContainer}>
              {missingData && (
                <Icon name='Alert' color={colors.error} size='xsm' />
              )}
            </View>
            <View style={elementStyle.iconContainer}>
              {hasAttachment && (
                <Icon name='Attachment' color={colors.black} size='xsm' />
              )}
            </View>
          </View>
        </View>
        <View style={elementStyle.columnTwo}>
          <Typography
            name='tableContent'
            text={s1PlantVesselUnit}
            numberOfLines={1}
            ellipsizeMode='tail'
          />
          <View style={elementStyle.subtitleDateContainer}>
            <Typography
              name='tableContent'
              text={'44-Visible leakage - and some more defects'}
              style={elementStyle.subtitle}
              numberOfLines={1}
            />
            <Typography
              name='tableContentNumber'
              text={'H_CODED'}
              style={elementStyle.date}
            />
          </View>
        </View>
        <View style={elementStyle.columnThree}>
          {canBeSelected && (
            <Checkbox isChecked={!!isSelected} onChange={handleSelect} />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const elementStyle = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    paddingTop: 10,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderColor: colors.secondary95,
  },
  containerSelected: {
    backgroundColor: colors.lightContrast25,
    borderColor: colors.primary25,
  },
  columnOne: {
    width: 80,
    paddingLeft: 10,
  },
  columnTwo: {
    flex: 1,
  },
  columnThree: {
    width: 40,
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    width: 16,
    height: 16,
  },
  subtitleDateContainer: {
    flexDirection: 'row',
    gap: 5,
    flex: 1,
  },
  subtitle: {
    flex: 1,
  },
  date: {
    width: 70,
    textAlign: 'right',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
});
