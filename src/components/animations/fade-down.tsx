import React, {useEffect, useRef} from 'react'
import {Animated} from 'react-native'

export const FadeDown = props => {
  const {children, duration = 400, delay = 0, translateYValue = -30} = props
  let translateY = useRef(new Animated.Value(translateYValue)).current
  let opacity = useRef(new Animated.Value(0)).current

  const startAnimation = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration,
      useNativeDriver: true
    }).start(() => {})

    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true
    }).start(() => {})
  }

  useEffect(() => {
    setTimeout(startAnimation, delay)
    return () => {}
  }, [])

  const animatedStyle = {
    opacity,
    transform: [{translateY}]
  }
  return (
    <Animated.View className={props?.className} style={animatedStyle}>
      {children}
    </Animated.View>
  )
}
