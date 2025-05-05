import { UnitInput } from '@/components/detailView/edit/UnitInput';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { useCallback, useState } from 'react';
import { KeyboardTypeOptions, StyleSheet, View } from 'react-native';

type BarToPsiInputProps = {
  pressureInBars: number;
  onChange: (pressure: { bar: number; psi: number }) => void;
  keyboardType?: KeyboardTypeOptions;
};

export const barToPsi = (bar: number): number => bar * 14.5038;
const psiToBar = (psi: number): number => psi / 14.5038;

export const BarToPsiInput: React.FC<BarToPsiInputProps> = ({
  pressureInBars,
  onChange,
}) => {
  const [bar, setBar] = useState<number>(Math.round(pressureInBars));
  const [psi, setPsi] = useState<number>(Math.round(barToPsi(pressureInBars)));

  const handleBarChange = useCallback(
    (value: number) => {
      const roundedBar = Math.round(value);
      setBar(roundedBar);
      const psiValue = Math.round(barToPsi(roundedBar));
      setPsi(psiValue);
      onChange({ bar: roundedBar, psi: psiValue });
    },
    [onChange],
  );

  const handlePsiChange = useCallback(
    (value: number) => {
      const roundedPsi = Math.round(value);
      setPsi(roundedPsi);
      const barValue = Math.round(psiToBar(roundedPsi));
      setBar(barValue);
      onChange({ bar: barValue, psi: roundedPsi });
    },
    [onChange],
  );

  return (
    <View>
      <Typography
        name='navigation'
        text='Working Pressure (BAR or PSI)'
        style={styles.label}
      />
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <UnitInput
            unit='BAR'
            value={bar}
            onChangeText={handleBarChange}
            keyboardType='numeric'
            required
          />
        </View>
        <View style={styles.inputWrapper}>
          <UnitInput
            unit='PSI'
            value={psi}
            onChangeText={handlePsiChange}
            keyboardType='numeric'
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    marginBottom: 5,
    color: colors.extended666,
  },
});
