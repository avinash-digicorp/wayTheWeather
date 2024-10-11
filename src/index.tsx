import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox, StatusBar} from 'react-native';
import {ApplicationNavigator} from 'navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ToastProvider} from 'components';
import {Provider} from 'react-redux';
import {persistor, store} from 'store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as PaperProvider} from 'react-native-paper';

/**
 *
 * Main app
 * Digicorp
 * @format
 * @flow
 */

console.warn = () => {};
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <PaperProvider>
              <ToastProvider>
                <StatusBar
                  translucent={true}
                  hidden={false}
                  showHideTransition={'fade'}
                  backgroundColor={'#fff'}
                />
                <ApplicationNavigator />
              </ToastProvider>
            </PaperProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
