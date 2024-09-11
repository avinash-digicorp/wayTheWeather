import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    borderRadius: 28,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 100,
    zIndex: 1,
    elevation: 1,
  },

  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

type AddButtonProps = {
  onAdd: () => void;
};

import {Animated} from 'react-native';

const AddButton = ({onAdd}: AddButtonProps) => {
  const [scaleValue] = useState(new Animated.Value(0));
  const onButtonClicked = () => {
    // Don't forget about the callback function for Animated.timing.
    // After we finish scaling, we need to set the scale value back to 0;
    // If we don't do that, when we go back to the Home screen our button will still be scaled
    Animated.timing(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 700,
    }).start(() => {
      scaleValue.setValue(0);
    });
    onAdd();
  };

  // You can test different input and output values.
  // Just don't forget that inputRange is from 0 to 1 and outputRange starts from 1;
  // These ranges looks the best for me
  const scaleValueInterpolation = scaleValue.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [1, 20, 30],
  });
  const backgroundColor = scaleValue.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: ['green', 'white', 'white'],
  });

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor,
          },
          {transform: [{scale: scaleValueInterpolation}]},
        ]}
      />
      <TouchableOpacity style={styles.container} onPress={onButtonClicked}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </>
  );
};

export default AddButton;
