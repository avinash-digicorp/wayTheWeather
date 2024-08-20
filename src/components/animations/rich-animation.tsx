import React, {useEffect, useRef} from 'react'
import {Animated} from 'react-native'
import {SCREEN_WIDTH} from 'utils/size'
import {hasValue} from '@/utils'
import {IProps} from './type.d'

const DEFAULT_DURATION = 400
export const ReachAnimation = (props: IProps) => {
  const {index, className, delay = 0, rightToLeft = true, children} = props
  let opacity = useRef(new Animated.Value(0)).current
  const to = rightToLeft ? SCREEN_WIDTH * 0.7 : -SCREEN_WIDTH * 0.7
  const startAnimation = duration => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true
    }).start(() => {})
  }

  const getDuration = () => {
    if (props?.duration) return props?.duration
    if (!hasValue(index)) return DEFAULT_DURATION
    let duration = index * 100
    index === 0 && (duration = 180)
    index === 1 && (duration = 220)
    index === 2 && (duration = 280)
    return duration
  }

  useEffect(() => {
    const duration = getDuration()
    setTimeout(startAnimation, delay)

    return () => {}
  }, [])

  const translateX = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [to, 0]
  })

  const animatedStyle = {opacity, transform: [{translateX}]}
  return (
    <Animated.View className={className} key={index} style={[animatedStyle]}>
      {children}
    </Animated.View>
  )
}
