import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface Props extends React.PropsWithChildren {
  header: string;
  style?: ViewStyle;
}
export const LoginHeader: React.FC<Props> = ({ header, children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Typography
        text={header}
        name={'sectionHeaderCapslock'}
        style={[
          styles.header,
          children !== undefined && styles.headerWithChildren,
        ]}
      />
      {children && <View>{children}</View>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: `${colors.black}75`,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 5,
  },
  header: {
    color: colors.white,
    textAlign: 'center',
  },
  headerWithChildren: {
    textAlign: 'left',
  },
});
