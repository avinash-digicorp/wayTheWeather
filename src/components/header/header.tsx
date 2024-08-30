import {StatusBar} from 'react-native';
import React from 'react';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  ButtonView,
  AssetSvg,
  ITextProps,
  AssetSvgProps,
} from 'components';
import {StyleSheet} from 'react-native';
import {hasTextLength, isFunctionExist} from 'utils';
import {cn} from 'theme';

interface HeaderProps {
  title?: ITextProps['tx'];
  titleClassName?: string;
  containerClassName?: string;
  onTitlePress?: () => void;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  rightIcon?: AssetSvgProps['name'];
  leftIcon?: AssetSvgProps['name'];
  withBack?: boolean;
}
export const Header = (props: HeaderProps) => {
  const {
    withBack,
    containerClassName,
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
  } = props;
  const navigation = useNavigation();
  const onLeftPressHandler = isFunctionExist(onLeftPress)
    ? onLeftPress
    : navigation.goBack;

  return (
    <Animated.View
      entering={FadeInUp.delay(100)}
      style={styles.container}
      className={cn([
        'w-full pb-4 flex-row items-center justify-between',
        containerClassName,
      ])}>
      <ButtonView style={styles.iconSpace} onPress={onLeftPressHandler}>
        <AssetSvg
          hide={!leftIcon || !withBack}
          width={22}
          height={22}
          autoPlay
          name={leftIcon}
        />
      </ButtonView>
      <Title {...props} />
      <ButtonView
        style={styles.iconSpace}
        class="flex-1"
        onPress={onRightPress}>
        <AssetSvg width={28} height={28} autoPlay name={rightIcon} />
      </ButtonView>
    </Animated.View>
  );
};

export const Title = (props: Partial<HeaderProps>) => (
  <ButtonView class="flex-1" onPress={props?.onTitlePress}>
    <Text
      hide={!hasTextLength(props?.title)}
      tx={props?.title}
      className={cn([
        'text-center font-medium text-gray-900 text-lg',
        props.titleClassName,
      ])}
    />
  </ButtonView>
);

Header.defaultProps = {
  onTitlePress: () => {},
  onLeftPress: null,
  onRightPress: () => {},
  leftIcon: 'left_arrow',
  withBack: true,
};

const styles = StyleSheet.create({
  container: {marginTop: StatusBar.currentHeight ?? 60},
  iconSpace: {minWidth: 28},
});
