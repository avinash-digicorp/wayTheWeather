import {useNotification} from 'hooks';
import {useEffect, useRef} from 'react';
import {navigationRef} from './navigation-action';
import {Animated} from 'react-native';
import {useSelector} from 'react-redux';
import {DefaultTheme} from '@react-navigation/native';
import colors from 'theme';
import {RootState} from 'store';

export const useAppNavigationContainer = () => {
  useNotification();
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const routeName = navigationRef?.current?.getCurrentRoute?.()?.name;

  const animation2 = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.8);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };
  useEffect(() => {
    animation2();
    return () => {};
  }, [isLoggedIn, routeName]);
  const theme = {
    ...DefaultTheme,
    colors: {...DefaultTheme.colors, background: colors.background},
  };
  const style = {opacity: fadeAnim, transform: [{scale: scaleAnim}]};
  return {style, isLoggedIn, theme};
};
