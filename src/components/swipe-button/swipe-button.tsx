import React, {useEffect} from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  interpolateColor,
  runOnJS
} from 'react-native-reanimated'
import {useState} from 'react'
import colors from 'theme'
import {AssetSvg} from 'components/asset-svg'
import {haptic} from 'utils'
import {AnimatedIcon} from 'components/animated-icon'
import {useIsFocused} from '@react-navigation/native'

const BUTTON_WIDTH = 350
const BUTTON_HEIGHT = 60
const BUTTON_PADDING = 10
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export const SwipeButton = ({onToggle, value}) => {
  // Animated value for X translation
  const X = useSharedValue(0)
  const arrowWidth = useSharedValue(50)
  // Toggled State
  const [toggled, setToggled] = useState(value)
  const [showArrow, setShowArrow] = useState(false)
  const changeCounter = useSharedValue(0) // Initialize the change counter
  const lastHapticTime = useSharedValue(0) // Track the last haptic feedback time

  // Fires when animation ends
  const handleComplete = isToggled => {
    if (isToggled !== toggled) {
      setToggled(isToggled)
      onToggle?.(isToggled)
    }
  }

  // Gesture Handler Events
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled
      runOnJS(haptic)('effectTick')
    },
    onActive: (e, ctx) => {
      let newValue
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX
      } else {
        newValue = e.translationX
      }

      const currentTime = Date.now()
      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue
        changeCounter.value += +1
      }
      if (
        changeCounter.value % 10 === 0 &&
        currentTime - lastHapticTime.value > 100
      ) {
        runOnJS(haptic)()
        lastHapticTime.value = currentTime
      }
    },
    onEnd: () => {
      if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withSpring(0)
        runOnJS(handleComplete)(false)
      } else {
        X.value = withSpring(H_SWIPE_RANGE)
        runOnJS(handleComplete)(true)
      }
      runOnJS(haptic)('virtualKeyRelease')
      changeCounter.value = 0 // Reset the counter after gesture ends
    }
  })
  const isFocused = useIsFocused()
  useEffect(() => {
    if (!isFocused) {
      return
    }
    value && (X.value = withSpring(H_SWIPE_RANGE))
    setShowArrow(true)
    setTimeout(() => {
      setShowArrow(false)
    }, 4000)
    return () => {}
  }, [isFocused])

  const InterpolateXInput = [0, H_SWIPE_RANGE]
  const AnimatedStyles = {
    swipeCont: useAnimatedStyle(() => {
      return {}
    }),
    colorWave: useAnimatedStyle(() => {
      return {
        width: H_WAVE_RANGE + X.value,

        opacity: interpolate(X.value, InterpolateXInput, [0, 1])
      }
    }),
    icon1: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [1, 0],
          Extrapolate.CLAMP
        ),
        transform: [
          {
            scale: interpolate(
              X.value,
              InterpolateXInput,
              [1, 0],
              Extrapolate.CLAMP
            )
          }
        ]
      }
    }),
    icon2: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [0, 1],
          Extrapolate.CLAMP
        ),
        transform: [
          {
            scale: interpolate(
              X.value,
              InterpolateXInput,
              [0, 1],
              Extrapolate.EXTEND
            )
          }
        ]
      }
    }),
    swipeable: useAnimatedStyle(() => {
      const rotate = interpolate(
        X.value,
        InterpolateXInput,
        [0, BUTTON_WIDTH + BUTTON_PADDING],
        [0, 360], // Rotation angle in degrees
        Extrapolate.CLAMP
      )

      return {
        backgroundColor: interpolateColor(
          X.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
          ['#06d6a0', '#fff']
        ),
        transform: [{translateX: X.value}, {rotate: `${rotate}deg`}]
      }
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        width: interpolate(
          X.value,
          InterpolateXInput,
          [BUTTON_WIDTH, 0],
          Extrapolate.CLAMP
        ),
        alignItems: 'center',
        justifyContent: 'center',
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [1, 0],
          Extrapolate.CLAMP
        )
      }
    }),
    swipeText2: useAnimatedStyle(() => {
      return {
        width: interpolate(
          X.value,
          InterpolateXInput,
          [0, BUTTON_WIDTH],
          Extrapolate.CLAMP
        ),
        alignItems: 'center',
        justifyContent: 'center',
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [0.2, 1],
          Extrapolate.CLAMP
        )
      }
    })
  }

  return (
    <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
      <AnimatedLinearGradient
        style={[AnimatedStyles.colorWave, styles.colorWave]}
        colors={['#06d6a0', '#1b9aaa']}
        start={{x: 0.0, y: 0.5}}
        end={{x: 1, y: 0.5}}
      />
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]}>
          <Animated.View
            style={[styles.iconContainer, {opacity: 1}, AnimatedStyles.icon1]}>
            <AssetSvg
              width={20}
              height={20}
              style={styles.icon}
              fill="black"
              name="icon_1"
            />
          </Animated.View>
          <Animated.View style={[styles.iconContainer, AnimatedStyles.icon2]}>
            <AssetSvg
              width={20}
              height={20}
              style={styles.icon}
              fill="white"
              name="icon_2"
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        style={AnimatedStyles.swipeText2}
        className="flex-row items-center justify-center">
        <Animated.View
          style={[styles.arrow, {transform: [{scaleX: -1}]}]}
          className="overflow-hidden">
          {showArrow && (
            <AnimatedIcon
              autoPlay
              loop
              duration={1000}
              name="rightArrow"
              style={{width: '100%', height: 40}}
            />
          )}
        </Animated.View>
        <Animated.Text style={[styles.swipeText2]}>I am swiped</Animated.Text>
      </Animated.View>
      <Animated.View
        style={AnimatedStyles.swipeText}
        className="flex-row items-center justify-center">
        <Animated.Text style={[styles.swipeText]}>Swipe Me</Animated.Text>
        <Animated.View style={styles.arrow} className="overflow-hidden">
          {showArrow && (
            <AnimatedIcon
              autoPlay
              loop
              duration={1000}
              name="rightArrow2"
              style={{width: '100%', height: 40}}
            />
          )}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  swipeCont: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    backgroundColor: colors.gray1,
    borderRadius: BUTTON_HEIGHT,
    padding: BUTTON_PADDING,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  colorWave: {
    position: 'absolute',
    left: 0,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT
  },
  swipeable: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: BUTTON_PADDING,
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 3
  },
  swipeText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 2,
    color: '#1b9aaa',
    paddingLeft: 50
  },
  swipeText2: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingRight: 50
  },
  arrow: {width: 50, alignItems: 'center'}
})
