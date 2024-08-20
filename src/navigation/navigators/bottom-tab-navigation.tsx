import React from 'react';
import Home from 'screens/home';
import {routes} from 'navigation/navigation-routes';
import {Text} from 'components';
import Notifications from 'screens/notifications';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';

const TabStack = AnimatedTabBarNavigator();
const Stack = createNativeStackNavigator();

export const BottomTabs = () => (
  <TabStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={routes.MAIN_HOME}
    // @ts-ignore
    lazy={true}
    backBehavior="history">
    <TabStack.Screen
      name={routes.MAIN_HOME}
      component={Home}
      options={{
        tabBarIcon: ({focused, color, size}) => <Text text="❍" />,
      }}
    />

    <TabStack.Screen
      name={routes.MAIN_SETTINGS}
      component={Notifications}
      options={{
        tabBarIcon: ({focused, color, size}) => <Text text="⚙️" />,
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
  </Stack.Group>
);
