import {Platform} from 'react-native'

export const isIosPlatform = Platform.OS === 'ios'
export const isAndroidPlatform = Platform.OS === 'android'

export const definePlatformParam = (ios: any, android: any) =>
  isIosPlatform ? ios : android
