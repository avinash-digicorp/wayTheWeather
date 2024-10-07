import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigation-action';
import {CommonNavigator} from './navigators';
import {BottomTabNavigator} from './navigators/bottom-tab-navigation';
import {Animated} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppNavigationContainer} from './navigation-container';
import {routes} from './navigation-routes';

const Stack = createNativeStackNavigator();

export const ApplicationNavigator = () => {
  const {style, theme} = useAppNavigationContainer();

  return (
    <Animated.View style={style} className="w-full flex-1 h-full">
      <NavigationContainer theme={theme} ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={routes.CHAT_LIST}>
          {BottomTabNavigator}
          {CommonNavigator}
        </Stack.Navigator>
      </NavigationContainer>
    </Animated.View>
  );
};
