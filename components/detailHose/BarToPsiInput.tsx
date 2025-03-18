import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import UnitInput from './UnitInput';
import { Icon } from '../Icon/Icon';
import { colors } from '@/lib/tokens/colors';
import { Typography } from '../typography';

type BarToPsiInputProps = {
  bar: string;
  psi: string;
  onBarChange: (value: string) => void;
  onPsiChange: (value: string) => void;
};

const BarToPsiInput = (props: BarToPsiInputProps) => {
  const [bar, setBar] = useState(props.bar);
  const [psi, setPsi] = useState(props.psi);

  const barToPsi = 14.5038;
  const psiToBar = 0.0689476;

  useEffect(() => {
    setBar(props.bar);
  }, [props.bar]);

  useEffect(() => {
    setPsi(props.psi);
  }, [props.psi]);

  const updatePsi = (barValue: string) => {
    const newPsiValue = barValue
      ? (parseFloat(barValue) * barToPsi).toFixed(2)
      : '';
    setPsi(newPsiValue);
    props.onPsiChange(newPsiValue);
  };

  const updateBar = (psiValue: string) => {
    const newBarValue = psiValue
      ? (parseFloat(psiValue) * psiToBar).toFixed(2)
      : '';
    setBar(newBarValue);
    props.onBarChange(newBarValue);
  };

  const handleBarChange = (text: string) => {
    setBar(text);
  };

  const handlePsiChange = (text: string) => {
    setPsi(text);
  };

  const handleBarBlur = () => {
    if (bar !== '') {
      updatePsi(bar);
    } else {
      setPsi('');
      props.onPsiChange('');
    }
  };

  const handlePsiBlur = () => {
    if (psi !== '') {
      updateBar(psi);
    } else {
      setBar('');
      props.onBarChange('');
    }
  };

  return (
    <View>
      <Typography name='fieldLabel' text='Working Pressure (BAR or PSI)' />
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <UnitInput
            unit='BAR'
            value={bar}
            onChangeText={handleBarChange}
            onBlur={handleBarBlur}
          />
        </View>
        <View style={styles.inputWrapper}>
          <UnitInput
            unit='PSI'
            value={psi}
            onChangeText={handlePsiChange}
            onBlur={handlePsiBlur}
          />
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
