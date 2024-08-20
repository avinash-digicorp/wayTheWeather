import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, View} from 'react-native';
import styles from './styles';
import {Text} from 'components';
import GestureControl from './partials/GestureControl';
import {SwipeToggle} from './partials/swipe-toggle';
import LoadingButton from './partials/loading-button';
import {useHomeContainer} from './home-container';

export default () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title} tx="header.home" />
        <LoadingButton />
        <GestureControl />
        <SwipeToggle />
      </SafeAreaView>
    </View>
  );
};
