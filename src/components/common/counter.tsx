import React from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';

export const Counter = ({value, setValue}) => {
  const increment = () => {
    setValue(value + 1);
  };

  const decrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleInputChange = text => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setValue(numericValue);
    } else if (text === '') {
      setValue(0);
    }
  };

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={styles.container}>
      <Button title="-" onPress={decrement} />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(value)}
        onChangeText={handleInputChange}
      />
      <Button title="+" onPress={increment} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    flex: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 18,
    paddingVertical: 5,
    borderRadius: 4,
  },
});
