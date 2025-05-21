import { UnitInput } from '@/components/detailView/edit/UnitInput';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { useCallback, useState } from 'react';
import { KeyboardTypeOptions, StyleSheet, View } from 'react-native';

type BarToPsiInputProps = {
  pressureInBars: number | null;
  onChange: (pressure: { bar: number | null; psi: number | null }) => void;
  keyboardType?: KeyboardTypeOptions;
};

export const barToPsi = (bar: number): number => bar * 14.5038;
const psiToBar = (psi: number): number => psi / 14.5038;

export const BarToPsiInput: React.FC<BarToPsiInputProps> = ({
  pressureInBars,
  onChange,
}) => {
  const [bar, setBar] = useState<number | null>(
    pressureInBars && Math.floor(pressureInBars),
  );
  const [psi, setPsi] = useState<number | null>(
    pressureInBars && Math.floor(barToPsi(pressureInBars)),
  );

  const handleBarChange = useCallback(
    (value: number | null) => {
      setBar(value);
      const psiValue = value && Math.floor(barToPsi(value));
      setPsi(psiValue);
      onChange({ bar: value, psi: psiValue });
    },
    [onChange],
  );

  const handlePsiChange = useCallback(
    (value: number | null) => {
      const roundedPsi = value && Math.floor(value);
      setPsi(roundedPsi);
      const barValue = roundedPsi && Number(psiToBar(roundedPsi).toFixed(1));
      setBar(barValue);
      onChange({ bar: barValue, psi: roundedPsi });
    },
    [onChange],
  );

  return (
    <View style={styles.container}>
      <Typography
        name='navigation'
        text='Working Pressure (BAR or PSI)'
        style={styles.label}
      />
      <View style={styles.innerContainer}>
        <UnitInput unit='BAR' value={bar} onChange={handleBarChange} required />
        <UnitInput unit='PSI' value={psi} onChange={handlePsiChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  inputWrapper: {
    // flex: 1,
  },
  label: {
    marginBottom: 5,
    color: colors.extended666,
  },
});
