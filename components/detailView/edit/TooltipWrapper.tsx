import { colors } from '@/lib/tokens/colors';
import { Alert, StyleSheet, View } from 'react-native';
import { IconButton } from './IconButton';

interface TooltipWrapperProps {
  tooltipData?: { title: string; message: string };
  children?: React.ReactNode;
  iconPadding?: number;
}

export const TooltipWrapper: React.FC<
  React.PropsWithChildren<TooltipWrapperProps>
> = ({ tooltipData, iconPadding = 26, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>{children}</View>
      <View style={[styles.iconContainer, { paddingTop: iconPadding }]}>
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 5,
  },
  fieldContainer: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    width: 32,
    flexShrink: 0,
  },
});
