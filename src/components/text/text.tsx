import React from 'react'
import {Text as RNText, StyleSheet, TextProps} from 'react-native'
import colors from 'theme'
import {fonts} from 'utils/fonts'
import {useTranslation} from 'react-i18next'
interface IProps extends TextProps {
  text?: string
  tx?: any
  txOptions?: any
  hide?: boolean
}

export default (props: IProps) => {
  const {tx, txOptions = {}, hide = false, style, text, children} = props
  if (hide) return <React.Fragment />
  const {t} = useTranslation()
  const txText = t(tx, txOptions)
  const styles = [stylesBase.base, style]
  const content = children ? children : tx ? txText : text

  return (
    <RNText allowFontScaling={false} {...props} style={styles}>
      {content as string}
    </RNText>
  )
}

const stylesBase = StyleSheet.create({
  base: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.gray9,
    includeFontPadding: true
  }
})
