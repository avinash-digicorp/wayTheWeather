import React from 'react'
import {View} from 'react-native'
import LottieView from 'lottie-react-native'
import {IProps} from './type.d'
import {ANIMATED_ICONS} from 'assets/animated-icons'

export const AnimatedIcon = (props: IProps) => {
  const {
    name,
    loop = false,
    hide = false,
    style = {},
    autoPlay = false,
    progress = 1
  } = props

  if (hide) return null
  const icon = ANIMATED_ICONS[name as keyof typeof ANIMATED_ICONS]
  const lottieStyles = [style]

  return (
    <View>
      <LottieView
        source={icon}
        loop={loop}
        autoPlay={autoPlay}
        style={lottieStyles}
        progress={progress}
        {...props}
      />
    </View>
  )
}
