import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { Checkbox } from '@/components/UI/Checkbox';
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { dateStringToDDMMYY } from '@/lib/util/formatDate';
import { FC, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface ElementProps {
  item: Partial<HoseData>;
  canBeSelected?: boolean;
  isSelected?: boolean;
  onSelectedChange?: (id: number) => void;
  onRowPress: () => void;
}
export const ListElement: FC<ElementProps> = ({
  item,
  canBeSelected,
  isSelected,
  onSelectedChange,
  onRowPress,
}) => {
  const {
    assetId,
    s1Code,
    RFID,
    missingData,
    hoseCondition,
    inspectedDate,
    S2Equipment,
  } = item;
  const { state } = useAppContext();
  const handleSelect = () => {
    if (!canBeSelected || !onSelectedChange) return;
    onSelectedChange(assetId!);
  };
  console.log('item', inspectedDate);
  const hasAttachment = useMemo(() => Math.random() > 0.5, []);
  return (
    <Pressable onPress={onRowPress}>
      <View
        style={[
          elementStyle.container,
          isSelected && elementStyle.containerSelected,
        ]}
      >
        <View style={elementStyle.columnOne}>
          <Typography
            name='tableContentNumber'
            text={assetId?.toString() ?? 'no id'}
          />
          <View style={elementStyle.iconsContainer}>
            <View style={elementStyle.iconContainer}>
              {!!RFID && (
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
            text={
              item.S2Equipment ??
              state.data.s1Items.find((s) => s.S1Code === s1Code)?.S1Name ??
              ''
            }
            numberOfLines={1}
          />
          <View style={elementStyle.subtitleDateContainer}>
            <Typography
              name='tableContent'
              text={hoseCondition}
              style={elementStyle.subtitle}
              numberOfLines={1}
            />
            <Typography
              name='tableContentNumber'
              text={dateStringToDDMMYY(inspectedDate ?? '')}
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
