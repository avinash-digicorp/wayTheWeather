import {StyleSheet} from 'react-native';
import React from 'react';
import {routes} from 'navigation/navigation-routes';
import {AnimatedIcon} from 'components';
import {AnimatedIconType} from 'assets/animated-icons';

const icons = {
  [routes.MAIN_HOME]: 'home',
  [routes.MAIN_WEATHER]: 'weather',
  [routes.MAIN_SETTINGS]: 'settings',
};
const TabButton = props => {
  const {focused, routeName} = props;
  const isWeatherScreen = routeName === routes.MAIN_WEATHER;
  const icon = icons[routeName] ?? ('home' as AnimatedIconType);
  return (
    <AnimatedIcon
      loop={isWeatherScreen}
      autoPlay={isWeatherScreen || focused}
      name={icon}
      style={[styles.icon, isWeatherScreen && styles.iconWeather]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {width: 24, height: 24},
  iconWeather: {transform: [{scale: 1.3}, {translateY: -1}]},
});

export default TabButton;
