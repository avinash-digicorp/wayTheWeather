import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {AnimatedIcon, ButtonView, DateTimePicker, Text} from 'components';

export default () => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight ?? 60,
        paddingHorizontal: 15,
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <ButtonView className="flex-row rounded-full border border-w-1 self-center border-gray-200 shadow-sm items-center pt-3 pb-2 px-2 w-full">
        <AnimatedIcon
          autoPlay
          name="locationPin"
          style={{width: 30, height: 30}}
        />
        <Text tx="home.start_location" />
      </ButtonView>
      <DateTimePicker />
      <ButtonView className="flex-row rounded-full border border-w-1 self-center border-gray-200 shadow-sm items-center pt-3 pb-2 px-2 w-full">
        <AnimatedIcon
          autoPlay
          name="locationPin2"
          style={{width: 30, height: 30}}
        />
        <Text tx="home.start_location" />
      </ButtonView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
