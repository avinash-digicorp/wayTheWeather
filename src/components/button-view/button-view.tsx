import React, {JSXElementConstructor, useState} from 'react';
import {
  Animated,
  GestureResponderEvent,
  NativeMethods,
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightComponent,
  TouchableMixin,
  TouchableOpacity,
} from 'react-native';
import {hitSlop} from 'utils/size';
import colors from 'theme';
import {IButtonViewProps} from './type.d';
import {Ripple} from 'components/animations';
import {Constructor} from 'react-native/types/private/Utilities';
import {TimerMixin} from 'react-native/types/private/TimerMixin';

export const ButtonView = (props: IButtonViewProps) => {
  const {
    withRipple = false,
    hide,
    loading = false,
    disabled,
    isCard = false,
    applyDisabledStyle = true,
    withHitSlop,
    button = 'ripple',
    underlayColor = colors.gray1,
  } = props;
  if (hide) return <React.Fragment />;

  const [animatedScale] = useState(new Animated.Value(1));

  const toggleAnimatedScale = (toValue: number) => {
    Animated.timing(animatedScale, {
      toValue,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const disabledStyle = applyDisabledStyle && disabled && {opacity: 0.6};
  const styles = [isCard && style.card, disabledStyle, props.style];
  const animatedStyle = {transform: [{scale: animatedScale}]};

  const onPress:
    | null
    | ((event: GestureResponderEvent) => void)
    | undefined = e => {
    if (!props?.disableAction) return;
    if (loading) return;
    props?.onPress?.(e);
  };

  const buttons = {
    normal: TouchableOpacity,
    highlight: TouchableHighlight,
  };

  let ActionButton = buttons[button as keyof typeof buttons];
  return (
    <Animated.View className={props?.baseClass} style={animatedStyle}>
      <Ripple withRipple={withRipple} onPress={onPress}>
        <ActionButton
          onLongPress={() => toggleAnimatedScale(1)}
          onPressIn={() => toggleAnimatedScale(props?.scale ?? 0.98)}
          onPressOut={() => toggleAnimatedScale(1)}
          activeOpacity={0.9}
          {...(withHitSlop && {
            hitSlop: hitSlop(20),
          })}
          {...(button === 'highlight' && {underlayColor})}
          {...props}
          onPress={withRipple ? null : onPress}
          style={styles}>
          {props.children}
        </ActionButton>
      </Ripple>
    </Animated.View>
  );
};

ButtonView.defaultProps = {
  hide: false,
  button: 'normal',
};

const style = StyleSheet.create({
  card: {
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowColor: colors.gray8,
    backgroundColor: 'white',
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 10,
    alignSelf: 'center',
  },
});
