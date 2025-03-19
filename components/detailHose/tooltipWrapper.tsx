import { View, StyleSheet, Alert } from 'react-native';
import { IconButton } from './iconButton';
import { colors } from '@/lib/tokens/colors';

interface TooltipWrapperProps {
  tooltipData?: { title: string; message: string };
  children?: React.ReactNode;
}

export const TooltipWrapper: React.FC<
  React.PropsWithChildren<TooltipWrapperProps>
> = ({ tooltipData, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>{children}</View>
      <View style={styles.iconContainer}>
        {tooltipData && (
          <IconButton
            icon='Tooltip'
            color={colors.primary}
            handlePress={() =>
              Alert.alert(tooltipData.title, tooltipData.message)
            }
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  fieldContainer: {
    marginBottom: 15,
    width: '90%',
  },
  iconContainer: {
    flexDirection: 'row',
    width: '15%',
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
