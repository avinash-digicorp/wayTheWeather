import {Vibration} from 'react-native'
import {definePlatformParam} from './platform'
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes
} from 'react-native-haptic-feedback'

export const vibrate = () => {
  const duration = definePlatformParam(20, 100)
  Vibration.vibrate(duration)
}

export const haptic = (type: keyof typeof HapticFeedbackTypes = 'soft') => {
  ReactNativeHapticFeedback.trigger(type, {
    ignoreAndroidSystemSettings: false
  })
}
