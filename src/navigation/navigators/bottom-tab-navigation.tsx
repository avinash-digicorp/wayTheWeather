import React from 'react';
import Home from 'screens/home';
import {routes} from 'navigation/navigation-routes';
import Notifications from 'screens/notifications';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AnimatedTabBarNavigator,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';
import TabButton from './partials/tab-button';
import colors from 'theme';
import AddressSelect from 'screens/address-select';
import {WeatherTracking} from 'screens/weather-tracking';
import {Weather} from 'screens/weather';

const TabStack = AnimatedTabBarNavigator();
const Stack = createNativeStackNavigator();

export const BottomTabs = () => (
  <TabStack.Navigator
    appearance={{
      floating: true,
      activeTabBackgrounds: colors.primary3,
      shadow: true,
      whenActiveShow: TabElementDisplayOptions.ICON_ONLY,
    }}
    screenOptions={{headerShown: false}}
    initialRouteName={routes.MAIN_HOME}
    lazy={true}
    backBehavior="history">
    <TabStack.Screen
      name={routes.MAIN_HOME}
      component={Home}
      options={{
        tabBarIcon: props => (
          <TabButton {...props} routeName={routes.MAIN_HOME} />
        ),
      }}
    />
    <TabStack.Screen
      name={routes.MAIN_WEATHER}
      component={Weather}
      options={{
        tabBarIcon: props => (
          <TabButton {...props} routeName={routes.MAIN_WEATHER} />
        ),
      }}
    />

    <TabStack.Screen
      name={routes.MAIN_SETTINGS}
      component={Notifications}
      options={{
        tabBarIcon: props => (
          <TabButton {...props} routeName={routes.MAIN_SETTINGS} />
        ),
      }}
    />
  </TabStack.Navigator>
);

export const BottomTabNavigator = (
  <Stack.Group
    screenOptions={{
      headerShown: false,
      presentation: 'containedModal',
    }}>
    <Stack.Screen name={routes.MAIN_BOTTOM_TAB} component={BottomTabs} />
    <Stack.Screen
      name={routes.ENTER_LOCATION}
      options={{}}
      component={AddressSelect}
    />
    <Stack.Screen
      name={routes.WEATHER_TRACKING}
      options={{animation: 'flip', gestureEnabled: true}}
      component={WeatherTracking}
    />
  </Stack.Group>
);
