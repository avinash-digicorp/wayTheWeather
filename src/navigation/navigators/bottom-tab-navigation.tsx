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
import Test from 'screens/test';
import {Chat} from 'screens/chat';
import {Todo} from 'screens/todo';
import {AddTodo} from 'screens/add-todo';
import ChatList from 'screens/chat-list';
import LanguageList from 'screens/language-list';

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
    initialRouteName={routes.MAIN_WEATHER}
    lazy={true}
    backBehavior="history">
    <TabStack.Screen
      name={routes.MAIN_HOME}
      component={AddressSelect}
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
      name={routes.MAIN_TEST}
      component={Test}
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
    <Stack.Screen name={routes.CHAT} component={Chat} />
    <Stack.Screen name={routes.CHAT_LIST} component={ChatList} />
    <Stack.Screen name={routes.LANGUAGE_LIST} component={LanguageList} />
    <Stack.Screen
      name={routes.ADD_TODO}
      options={{
        animation: 'fade',
        animationDuration: 300,
        animationTypeForReplace: 'push',
      }}
      component={AddTodo}
    />
    <Stack.Screen
      name={routes.TODO}
      options={{
        animation: 'fade',
        animationDuration: 300,
        animationTypeForReplace: 'push',
      }}
      component={Todo}
    />
  </Stack.Group>
);

const opacityTransition: object = {
  gestureDirection: 'horizontal', // we will swipe right if we want to close the screen;
  transitionSpec: {
    open: {
      animation: 'timing',
    },
    close: {
      animation: 'timing',
      config: {
        duration: 3000,
      },
    },
  },
  cardStyleInterpolator: ({current}: {current: {progress: number}}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
};
