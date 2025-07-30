import { ActivityStatus } from '@/components/dashboard/activitiesList/activityStatus';
import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { useAppContext } from '@/context/ContextProvider';
import {
  PartialFormData,
  PartialReplaceHoseFormData,
  PartialRFQFormData,
  PartialSendMailFormData,
} from '@/context/Reducer';
import { colors } from '@/lib/tokens/colors';
import { HoseData } from '@/lib/types/hose';
import { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export type ActivityType =
  | 'INSPECT'
  | 'REGISTER_HOSE'
  | 'SCRAP'
  | 'REPLACE_HOSE'
  | 'RFQ'
  | 'CONTACT'
  | 'CONTACT_SUPPORT';

export interface Activity {
  id: number;
  type: ActivityType;
  status: 'done' | 'draft';
  selectedIds: number[];
  modifiedAt: Date;
  description?: string;
  formData:
    | PartialRFQFormData
    | PartialFormData
    | PartialReplaceHoseFormData
    | PartialSendMailFormData
    | Partial<HoseData>;
}

interface Props {
  item: Activity;
  onRemove: (id: string) => void;
  onRowPress: () => void;
}
export const Activity: FC<Props> = ({ item, onRowPress, onRemove }) => {
  console.log('Activity item:', item);
  const { type, status, id, formData } = item;
  const { state } = useAppContext();
  const actionTilte = (): string => {
    if ('subtitle' in item.formData && item.selectedIds.length === 0)
      return (item.formData.subtitle as string) ?? '';
    if (item.selectedIds.length > 1) return `${item.selectedIds.length} hoses`;

    if (item.selectedIds.length === 1) {
      const hose = state.data.hoses.find(
        (hose) => hose.assetId === item.selectedIds[0],
      );
      if (!hose) return '';

      return hose.itemDescription || '';
    }
    return '';
  };
  const singleHose =
    item.selectedIds.length === 1
      ? state.data.hoses.find((hose) => hose.assetId === item.selectedIds[0])
      : undefined;

  return (
    <Pressable onPress={() => (status === 'draft' ? onRowPress() : null)}>
      <View style={[elementStyle.container]}>
        <View style={elementStyle.columnOne}>
          <Typography name='tableContentNumber' text={`${id}`} />
          <View style={elementStyle.iconsContainer}>
            {singleHose && (
              <>
                <View style={elementStyle.iconContainer}>
                  {!!singleHose.RFID && (
                    <Icon
                      name='RfidIdentificator'
                      color={colors.black}
                      size='xsm'
                    />
                  )}
                </View>
                <View style={elementStyle.iconContainer}>
                  {singleHose.missingData && (
                    <Icon name='Alert' color={colors.error} size='xsm' />
                  )}
                </View>
                <View style={elementStyle.iconContainer}>
                  {singleHose.documentName && (
                    <Icon name='Attachment' color={colors.black} size='xsm' />
                  )}
                </View>
              </>
            )}
          </View>
        </View>
        <View style={elementStyle.columnTwo}>
          <Typography
            name='tableContent'
            text={actionTilte()}
            style={elementStyle.subtitle}
            numberOfLines={1}
          />
          <View style={elementStyle.subtitleDateContainer}>
            <ActivityStatus status={status} type={type} />
            <Typography
              name='tableContentNumber'
              text={new Date(item.modifiedAt)
                .toLocaleDateString()
                .replaceAll('/', '')}
              style={elementStyle.date}
            />
          </View>
        </View>
        <View style={elementStyle.columnThree}>
          {status === 'draft' && (
            <Pressable
              onPress={() => onRemove(`${id}`)}
              style={elementStyle.removeButton}
            >
              <Icon name='Cross' color={colors.error} size='md' />
            </Pressable>
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
    justifyContent: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    padding: 5,
  },
  subtitleDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
