import React from 'react';
import {StyleSheet} from 'react-native';
import {AnimatedIcon, ButtonView, Text} from 'components';
import {AnimatedIconType} from 'assets/animated-icons';
import {ITextProps} from 'components/text/type';
import Animated from 'react-native-reanimated';
import {hasTextLength} from 'utils';

interface SectionProps {
  title: ITextProps['tx'];
  icon: AnimatedIconType;
  onPress?: () => void;
  address?: string;
}
export const SearchLocationView = (props: SectionProps) => {
  const {title, address, icon, onPress} = props;

  return (
    <ButtonView
      onPress={onPress}
      className="flex-row bg-white rounded-full border border-w-1 self-center border-gray-200 shadow-sm items-center py-3 px-2 w-full">
      <AnimatedIcon autoPlay name={icon} style={styles.pin} />
      <Text {...(!hasTextLength(address) && {tx: title})} text={address} />
    </ButtonView>
  );
};
const styles = StyleSheet.create({
  pin: {width: 30, height: 30, marginTop: 1},
});
