import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import UnitInput from './UnitInput';
import { Icon } from '../Icon/Icon';
import { colors } from '@/lib/tokens/colors';
import { Typography } from '../typography';

type BarToPsiInputProps = {
  pressureInBars: number;
  onChange: (pressure: { bar: number; psi: number }) => void;
};

const barToPsi = (bar: number): number => bar * 14.5038;
const psiToBar = (psi: number): number => psi / 14.5038;

const BarToPsiInput: React.FC<BarToPsiInputProps> = ({
  pressureInBars,
  onChange,
}) => {
  const [bar, setBar] = useState<number>(pressureInBars);
  const [psi, setPsi] = useState<number>(barToPsi(pressureInBars));

  const handleBarChange = (value: number) => {
    setBar(value);
    const psiValue = barToPsi(value);
    setPsi(psiValue);
    onChange({ bar: value, psi: psiValue });
  };

  const handlePsiChange = (value: number) => {
    setPsi(value);
    const barValue = psiToBar(value);
    setBar(barValue);
    onChange({ bar: barValue, psi: value });
  };

  return (
    <View>
      <Typography name='fieldLabel' text='Working Pressure (BAR or PSI)' />
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <UnitInput unit='BAR' value={bar} onChangeText={handleBarChange} />
        </View>
        <View style={styles.inputWrapper}>
          <UnitInput unit='PSI' value={psi} onChangeText={handlePsiChange} />
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
});

export default BarToPsiInput;
