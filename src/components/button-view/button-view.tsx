import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {hitSlop} from 'utils/size';
import {IProps} from './type.d';
import colors from 'theme';

export const ButtonView = (props: IProps) => {
  const {
    hide,
    activeOpacity = 0.8,
    disabled,
    isCard = false,
    applyDisabledStyle = true,
    withHitSlop,
    button = 'normal',
    underlayColor = colors.gray1,
  } = props;
  if (hide) return <React.Fragment />;

  const [animatedScale] = useState(new Animated.Value(1));

  const toggleAnimatedScale = toValue => {
    Animated.timing(animatedScale, {
      toValue,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const disabledStyle = applyDisabledStyle && disabled && {opacity: 0.6};
  const styles = [isCard && style.card, disabledStyle, props.style];
  const animatedStyle = {transform: [{scale: animatedScale}]};
  const onPress = () => !props?.disableAction && props?.onPress?.();

  const buttons = {
    normal: TouchableOpacity,
    highlight: TouchableHighlight,
  };

  let ActionButton = buttons[button as keyof typeof buttons];
  return (
    <Animated.View className={props?.['base-class']} style={animatedStyle}>
      <ActionButton
        activeOpacity={activeOpacity}
        onLongPress={() => toggleAnimatedScale(1, 2)}
        onPressIn={() => toggleAnimatedScale(props?.scale ?? 0.98, 0)}
        onPressOut={() => toggleAnimatedScale(1, 2)}
        {...(withHitSlop && {
          hitSlop: hitSlop(20),
        })}
        {...(button === 'highlight' && {underlayColor})}
        {...props}
        onPress={onPress}
        style={styles}>
        {props.children}
      </ActionButton>
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
