import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import colors from 'theme';
import {fonts} from 'utils/fonts';
import t from 'locales/use-translation';
import {ITextProps} from './type';

export default (props: ITextProps) => {
  const {tx, txOptions = {}, hide = false, style, text, children} = props;
  if (hide) return <React.Fragment />;
  const txText = t(tx as any, txOptions);
  const styles = [stylesBase.base, style];
  const content = children ? children : tx ? txText : text;

  return (
    <RNText allowFontScaling={false} {...props} style={styles}>
      {content as string}
    </RNText>
  );
};

const stylesBase = StyleSheet.create({
  base: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.gray9,
    includeFontPadding: false,
  },
});
