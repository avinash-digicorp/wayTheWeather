import React, {Fragment} from 'react';
import {ScrollView as RNScrollView} from 'react-native';
import {ScrollView as RNGestureScrollView} from 'react-native-gesture-handler';
import {IProps} from './type.d';

const Component = {
  normal: RNScrollView,
  gesture: RNGestureScrollView,
};

export default (props: IProps) => {
  const {
    hide = false,
    horizontal = false,
    scrollRef,
    children,
    type = 'gesture',
  } = props;
  if (hide) return <Fragment />;
  const ScrollView = Component[type];

  return (
    <ScrollView
      horizontal={horizontal}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      ref={scrollRef}
      {...props}>
      {children}
    </ScrollView>
  );
};
