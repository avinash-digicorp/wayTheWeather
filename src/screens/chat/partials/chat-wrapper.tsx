import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WrapperProps} from './types';
import {isAndroidPlatform, SCREEN_HEIGHT} from 'utils';

export default ({children}: WrapperProps) => {
  const insets = useSafeAreaInsets();

  if (isAndroidPlatform) {
    return children;
  }

  const marginTop = insets.top > 0 ? insets.top : 24;

  return (
    <View style={{height: SCREEN_HEIGHT - 112 - marginTop - insets.bottom}}>
      {children}
    </View>
  );
};
