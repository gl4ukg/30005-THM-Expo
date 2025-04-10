import { colors } from '@/lib/tokens/colors';
import { Alert, StyleSheet, View } from 'react-native';
import { IconButton } from './IconButton';

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

// TODO: Fix tooltipl placement
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  fieldContainer: {
    marginBottom: 10,
    width: '88%',
  },
  iconContainer: {
    flexDirection: 'row',
    width: '15%',
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
