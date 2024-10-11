import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {Portal} from 'react-native-paper';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

export const ExpandableComponent = ({normal, expanded}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pressPosition, setPressPosition] = useState({x: 0, y: 0});

  const scale = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: scale.value},
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  const handleLongPress = event => {
    const {pageX, pageY} = event.nativeEvent;
    setPressPosition({x: pageX, y: pageY});

    // Calculate adjusted position for the expanded view
    const adjustedX = Math.max(0, Math.min(pageX - width / 2, width - 250)); // 250 is the width of the expanded view
    const adjustedY = Math.max(0, Math.min(pageY - height / 2, height - 200)); // 200 is the height of the expanded view

    translateX.value = withTiming(adjustedX, {
      duration: 200,
      easing: Easing.ease,
    });
    translateY.value = withTiming(adjustedY, {
      duration: 200,
      easing: Easing.ease,
    });
    scale.value = withTiming(1, {duration: 200, easing: Easing.ease});

    setIsExpanded(true);
  };

  const handleClose = () => {
    scale.value = withTiming(0, {duration: 200, easing: Easing.ease});
    setIsExpanded(false);
  };

  return (
    <>
      <Pressable onLongPress={handleLongPress}>
        <View style={styles.container}>
          <View style={styles.normalView}>{normal}</View>
        </View>
      </Pressable>

      {isExpanded && (
        <Portal>
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.fullScreenOverlay}>
              <BlurView
                style={styles.fullScreenBlur}
                blurType="light"
                blurAmount={10}
              />
              <Animated.View style={[styles.expandedView, animatedStyle]}>
                {expanded}
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenOverlay: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  fullScreenBlur: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  normalView: {
    width: 150,
    height: 100,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  expandedView: {
    position: 'absolute',
    width: 250,
    height: 200,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    // Optional: Add a shadow for better visibility
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
