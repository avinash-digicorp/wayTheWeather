import React from 'react'
import {PressableProps, View, Pressable} from 'react-native'
import Animated, {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent
} from 'react-native-gesture-handler'

interface IProps extends PressableProps {
  withRipple?: boolean
  rippleColor?: string
}
export const Ripple = (props: IProps) => {
  const {
    withRipple = true,
    onPress,
    rippleColor = '#ffffff99',
    children
  } = props
  const centerX = useSharedValue(0)
  const centerY = useSharedValue(0)
  const scale = useSharedValue(0)

  const aRef = useAnimatedRef<View>()
  const width: any = useSharedValue(0)
  const height: any = useSharedValue(0)

  const rippleOpacity = useSharedValue(1)

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: tapEvent => {
        const layout = measure(aRef)
        width.value = layout?.width
        height.value = layout?.height

        centerX.value = tapEvent.x
        centerY.value = tapEvent.y

        rippleOpacity.value = 1
        scale.value = 0
        scale.value = withTiming(1, {duration: 400})
      },
      onActive: () => {
        // @ts-ignore
        if (onPress) runOnJS(onPress)()
      },
      onFinish: () => {
        rippleOpacity.value = withTiming(0)
      }
    })
  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2)

    const translateX = centerX.value - circleRadius
    const translateY = centerY.value - circleRadius

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      backgroundColor: rippleColor,
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [{translateX}, {translateY}, {scale: scale.value}]
    }
  })

  if (!withRipple) return <>{children}</>
  const AnimatedPressable: any = Animated.createAnimatedComponent(Pressable)
  return (
    <View style={{overflow: 'hidden'}} ref={aRef}>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <AnimatedPressable ref={aRef} style={{overflow: 'hidden'}}>
          {children}
          <Animated.View style={rStyle} />
        </AnimatedPressable>
      </TapGestureHandler>
    </View>
  )
}
