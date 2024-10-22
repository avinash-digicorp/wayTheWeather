import React, {Fragment} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isAndroidPlatform} from '@/utils/platform';
import {IProps} from './type.d';

export default (props: IProps) => {
  const {
    show = true,
    horizontal = false,
    scrollRef,
    keyboardShouldPersistTaps = 'handled',
    children,
    extraHeightAndroid = 300,
    extraHeightIos = 150,
  } = props;
  if (!show) return <Fragment />;
  const extraHeight = isAndroidPlatform ? extraHeightAndroid : extraHeightIos;
  return (
    <KeyboardAwareScrollView
      extraHeight={extraHeight}
      horizontal={horizontal}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      ref={scrollRef}
      bounces={false}
      {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
};
