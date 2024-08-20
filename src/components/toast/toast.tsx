import {StyleSheet, Text, View, useWindowDimensions} from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {useCallback, useEffect} from 'react'

import type {ToastType} from './context'

type ToastProps = {
  index: number
  toast: ToastType
  onDismiss: (toastId: number) => void
}

const ToastOffset = 20
const ToastHeight = 70
const HideToastOffset = ToastOffset + ToastHeight
const BaseSafeArea = 50

const Toast: React.FC<ToastProps> = ({toast, index, onDismiss}) => {
  const {width: windowWidth} = useWindowDimensions()

  const isActiveToast = toast.id === 0

  const initialBottomPosition = isActiveToast
    ? -HideToastOffset
    : BaseSafeArea + (toast.id - 1) * ToastOffset

  const bottom = useSharedValue(initialBottomPosition)

  useEffect(() => {
    bottom.value = withSpring(BaseSafeArea + toast.id * ToastOffset)
  }, [toast.id])

  const translateX = useSharedValue(0)
  const isSwiping = useSharedValue(false)

  const dismissItem = useCallback(() => {
    'worklet'
    translateX.value = withTiming(-windowWidth, undefined, isFinished => {
      if (isFinished) {
        runOnJS(onDismiss)(toast.id)
      }
    })
  }, [onDismiss, toast.id, translateX, windowWidth])

  const gesture = Gesture.Pan()
    .enabled(isActiveToast)
    .onBegin(() => {
      isSwiping.value = true
    })
    .onUpdate(event => {
      if (event.translationX > 0) {
      }
      translateX.value = event.translationX
    })
    .onEnd(event => {
      if (event.translationX < -50) {
        dismissItem()
      } else if (event.translationX < 50) {
        dismissItem()
      } else {
        translateX.value = withSpring(0)
      }
    })
    .onFinalize(() => {
      isSwiping.value = false
    })

  useEffect(() => {
    if (!toast.autodismiss || !isActiveToast) return
    const timeout = setTimeout(() => {
      dismissItem()
    }, 2500)
    return () => {
      clearTimeout(timeout)
    }
  }, [dismissItem, isActiveToast, toast.autodismiss])

  const rToastStyle = useAnimatedStyle(() => {
    const baseScale = 1 - toast.id * 0.05
    const scale = isSwiping.value ? baseScale * 0.96 : baseScale
    return {
      bottom: bottom.value,
      zIndex: 1000 - toast.id,
      transform: [{scale: withTiming(scale)}, {translateX: translateX.value}]
    }
  }, [toast])

  const rVisibleContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(toast.id <= 1 ? 1 : 0)
    }
  }, [toast.id])

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        key={index}
        style={[
          {
            width: windowWidth * 0.9,
            left: windowWidth * 0.05,
            shadowRadius: Math.max(10 - toast.id * 2, 5),
            zIndex: 100 - toast.id,
            borderCurve: 'continuous'
          },
          styles.container,
          rToastStyle
        ]}>
        <Animated.View style={styles.textContainer}>
          <Animated.View style={[rVisibleContainerStyle, styles.rowCenter]}>
            {Boolean(toast.leading) && <>{toast.leading?.()}</>}
            <View
              style={[
                styles.columnCenter,
                {marginLeft: toast.leading ? 10 : 0}
              ]}>
              <Text style={styles.title}>{toast.title}</Text>
              {toast.subtitle && (
                <Text style={styles.subtitle}>{toast.subtitle}</Text>
              )}
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 70,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    elevation: 5,
    paddingHorizontal: 25
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnCenter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 13,
    color: '#666'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 2
  }
})

export {Toast}
