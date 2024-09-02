import {useNotification} from 'hooks';
import {useEffect, useRef} from 'react';
import {navigationRef} from './navigation-action';
import {Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DefaultTheme} from '@react-navigation/native';
import colors from 'theme';
import {RootState} from 'store';
import {fetchCurrentLocation, fetchWeather} from 'store/common/slice';

export const useAppNavigationContainer = () => {
  useNotification();
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);
  const {location} = useSelector((state: RootState) => state.common);

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
  const dispatch = useDispatch();
  useEffect(() => {
    animation2();
    return () => {};
  }, [isLoggedIn, routeName]);
  useEffect(() => {
    // dispatch(fetchCurrentLocation());
  }, []);
  useEffect(() => {
    if (!location) return;
    dispatch(fetchWeather(location));
  }, [location]);
  const theme = {
    ...DefaultTheme,
    colors: {...DefaultTheme.colors, background: colors.background},
  };
  const style = {opacity: fadeAnim, transform: [{scale: scaleAnim}]};
  return {style, isLoggedIn, theme};
};
