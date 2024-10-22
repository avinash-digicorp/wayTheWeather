import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {KeyboardAwareScrollViewProps} from 'react-native-keyboard-aware-scroll-view';

export interface IProps extends KeyboardAwareScrollViewProps {
  /**
   * Styling for the view container.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  children?: React.ReactNode | any;

  /**
   * Handle the component will render or not.
   * @default true
   */
  show?: boolean;

  /**
   * Handle the container will render KeyboardAvoidView or not.
   */
  avoidKeyboard?: boolean;

  /**
   * Handle additional non-existing type.
   */
  [key: string]: string | number | any;

  /**
   * Type of scrollView.
   */
  type?: 'normal' | 'gesture';
  extraHeightAndroid?: number;
  extraHeightIos?: number;
}
