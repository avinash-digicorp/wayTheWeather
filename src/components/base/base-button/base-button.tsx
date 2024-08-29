import {StyleProp, TextStyle, View} from 'react-native';
import React from 'react';
import {ButtonView, IButtonViewProps, Text} from 'components';
import {cn} from 'theme';
import {ITextProps} from 'components/text/type';

export interface IBaseButton extends IButtonViewProps {
  title?: string;
  baseClass?: string;
  className?: string;
  titleClass?: string;
  titleStyle?: StyleProp<TextStyle> | undefined;
  tx?: ITextProps['tx'];
  txOptions?: ITextProps['txOptions'];
}

export const BaseButton = (props: IBaseButton) => {
  const {
    baseClass,
    className,
    loading,
    title,
    titleClass,
    onPress,
    style,
    titleStyle,
    tx,
    txOptions,
  } = props;
  const baseClasses = cn([baseClass, 'w-full py-4 items-center']);
  const buttonClasses = cn([
    'w-full px-4 py-3 rounded-full bg-primary border border-primary items-center flex-row',
    className,
  ]);
  const titleClasses = cn([
    'text-center px-2 text-white font-semi-bold',
    titleClass,
  ]);
  const titleText = title;
  return (
    <View className={baseClasses}>
      <ButtonView
        {...props}
        onPress={onPress}
        className={buttonClasses}
        style={style}>
        <Text
          style={titleStyle}
          className={titleClasses}
          txOptions={txOptions}
          tx={tx}
          text={titleText}
        />
      </ButtonView>
    </View>
  );
};
