import React, {Fragment, useEffect, useRef} from 'react'
import {Animated} from 'react-native'
import {IProps} from './type.d'

export const FadeIn = (props: IProps) => {
  const {show = true} = props
  let opacity = useRef(new Animated.Value(0)).current
  let scale = useRef(new Animated.Value(0.8)).current
  const {children, duration = 400, friction = 5, delay = 0} = props
  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction,
        useNativeDriver: true
      })
    ]).start()
  }

  useEffect(() => {
    setTimeout(startAnimation, delay)
    return () => {}
  }, [])

  const animatedStyle = {
    opacity,
    transform: [{scale}]
  }
  if (!show) return <Fragment />
  return (
    <Animated.View className={props?.className} style={animatedStyle}>
      {children}
    </Animated.View>
  )
}
export const FadeOut = (props: IProps) => {
  const {
    show = true,
    scale: initialScale = 2,
    opacity: initialOpacity = 0
  } = props
  let opacity = useRef(new Animated.Value(initialOpacity)).current
  let scale = useRef(new Animated.Value(initialScale)).current
  const {children, duration = 400, delay = 0} = props
  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true
      })
    ]).start()
  }

  useEffect(() => {
    setTimeout(startAnimation, delay)
    return () => {}
  }, [])

  const animatedStyle = {opacity, transform: [{scale}]}
  if (!show) return <Fragment />
  return (
    <Animated.View className={props?.className} style={animatedStyle}>
      {children}
    </Animated.View>
  )
}
