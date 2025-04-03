import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, KeyboardTypeOptions } from 'react-native';
import UnitInput from './UnitInput';
import { colors } from '@/lib/tokens/colors';
import { Typography } from '../typography';

type BarToPsiInputProps = {
  pressureInBars: number;
  onChange: (pressure: { bar: number; psi: number }) => void;
  keyboardType?: KeyboardTypeOptions;
};

const barToPsi = (bar: number): number => bar * 14.5038;
const psiToBar = (psi: number): number => psi / 14.5038;

const BarToPsiInput: React.FC<BarToPsiInputProps> = ({
  pressureInBars,
  onChange,
}) => {
  const [bar, setBar] = useState<number>(pressureInBars);
  const [psi, setPsi] = useState<number>(barToPsi(pressureInBars));

  const handleBarChange = useCallback(
    (value: number) => {
      setBar(value);
      const psiValue = barToPsi(value);
      setPsi(psiValue);
      onChange({ bar: value, psi: psiValue });
    },
    [onChange],
  );

  const handlePsiChange = useCallback(
    (value: number) => {
      setPsi(value);
      const barValue = psiToBar(value);
      setBar(barValue);
      onChange({ bar: barValue, psi: value });
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

export default BarToPsiInput;
