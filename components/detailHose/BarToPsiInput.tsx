import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import UnitInput from './UnitInput';
import { Icon } from '../Icon/Icon';
import { colors } from '@/lib/tokens/colors';
import { Typography } from '../typography';

type BarToPsiInputProps = {
  pressureInBars: string;
  onChange: (pressure: { bar: string; psi: string }) => void;
};

const barToPsi = (bar: number): number => bar * 14.5038;
const psiToBar = (psi: number): number => psi / 14.5038;

const BarToPsiInput = (props: BarToPsiInputProps) => {
  const [bar, setBar] = useState<string>(props.pressureInBars);
  const [psi, setPsi] = useState<string>(
    barToPsi(parseFloat(props.pressureInBars)).toFixed(2),
  );

  const handleBarChange = (text: string) => {
    setBar(text);
    const barValue = parseFloat(text);
    const psiValue = !isNaN(barValue) ? barToPsi(barValue).toFixed(2) : '';
    setPsi(psiValue);
    props.onChange({ bar: text, psi: psiValue });
  };

  const handlePsiChange = (text: string) => {
    setPsi(text);
    const psiValue = parseFloat(text);
    const barValue = !isNaN(psiValue) ? psiToBar(psiValue).toFixed(2) : '';
    setBar(barValue);
    props.onChange({ bar: barValue, psi: text });
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
        <View style={styles.tooltipContainer}>
          <Icon name='Tooltip' size='lg' color={colors.primary} />
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
  tooltipContainer: {
    marginLeft: 7,
    marginRight: -7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
  },
});

export default BarToPsiInput;
