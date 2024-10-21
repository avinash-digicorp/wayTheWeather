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
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'utils/size';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {haptic} from 'utils';

const CONTENT_WIDTH = 200;
const CONTENT_HEIGHT = 300;
export const ExpandableComponent = ({normal, expanded}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pressPosition, setPressPosition] = useState({x: 0, y: 0});

  const scale = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translateX.value},
      {translateY: translateY.value},
    ],
  }));

  const handleLongPress = event => {
    const {pageX, pageY} = event.nativeEvent;
    setPressPosition({x: pageX, y: pageY});
    translateX.value = pageX;
    translateY.value = pageY;
    scale.value = 0;
    let adjustedX = pageX - (SCREEN_WIDTH - CONTENT_WIDTH) / 2;
    let adjustedY = pageY - (SCREEN_HEIGHT - CONTENT_HEIGHT) / 2;
    haptic();
    if (pageX + CONTENT_WIDTH > SCREEN_WIDTH) {
      adjustedX = 50;
    }

    if (adjustedY + adjustedY + CONTENT_HEIGHT > SCREEN_HEIGHT) {
      adjustedY = (pageY - adjustedY) / 2;
    }

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
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignSelf: 'center',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  fullScreenBlur: {
    position: 'absolute',
    width: '100%',
    height: '120%',
    top: 0,
    left: 0,
  },
  normalView: {
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  expandedView: {
    position: 'absolute',
    width: CONTENT_WIDTH,
    height: CONTENT_HEIGHT,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
