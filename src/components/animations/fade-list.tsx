import React, {useEffect, useRef} from 'react'
import {Animated} from 'react-native'

export const FadeList = props => {
  let opacity = useRef(new Animated.Value(0)).current
  let translateY = useRef(new Animated.Value(15)).current
  const {children, duration = 400, delay = 0, style} = props

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver: true
      })
    ]).start(() => {})
  }

  useEffect(() => {
    setTimeout(startAnimation, delay)
    return () => {}
  }, [])

  const animatedStyle = {opacity, transform: [{translateY}]}

  return (
    <Animated.View className={props?.className} style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  )
}
