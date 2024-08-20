import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, View} from 'react-native';
import {ButtonView, InfiniteScroll, Text} from 'components';

export default () => {
  const onPress = () => {};
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, width: '100%'}}>
          <Text onPress={onPress} tx="header.notification" />
          <InfiniteScroll
            data={TEMP_LIST}
            renderItem={({item}) => (
              <ButtonView className="w-11/12 flex-row px-4 shadow-lg bg-gray-50 py-6 border-gray-300 rounded-2xl justify-between border mb-3 self-center">
                <Text>{item.title}</Text>
                <Text>{item.date}</Text>
              </ButtonView>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const TEMP_LIST = [
  {title: 'notification 1', date: '2024-01-01'},
  {title: 'notification 2', date: '2024-01-02'},
  {title: 'notification 3', date: '2024-01-03'},
  {title: 'notification 4', date: '2024-01-04'},
  {title: 'notification 5', date: '2024-01-05'},
  {title: 'notification 6', date: '2024-01-06'},
  {title: 'notification 7', date: '2024-01-07'},
  {title: 'notification 8', date: '2024-01-08'},
  {title: 'notification 9', date: '2024-01-09'},
  {title: 'notification 10', date: '2024-01-10'},
  {title: 'notification 11', date: '2024-01-11'},
  {title: 'notification 12', date: '2024-01-12'},
  {title: 'notification 13', date: '2024-01-13'},
  {title: 'notification 14', date: '2024-01-14'},
  {title: 'notification 15', date: '2024-01-15'},
  {title: 'notification 16', date: '2024-01-16'},
  {title: 'notification 17', date: '2024-01-17'},
  {title: 'notification 18', date: '2024-01-18'},
  {title: 'notification 19', date: '2024-01-19'},
  {title: 'notification 20', date: '2024-01-20'},
  {title: 'notification 21', date: '2024-01-21'},
  {title: 'notification 22', date: '2024-01-22'},
  {title: 'notification 23', date: '2024-01-23'},
  {title: 'notification 24', date: '2024-01-24'},
  {title: 'notification 25', date: '2024-01-25'},
  {title: 'notification 26', date: '2024-01-26'},
  {title: 'notification 27', date: '2024-01-27'},
  {title: 'notification 28', date: '2024-01-28'},
  {title: 'notification 29', date: '2024-01-29'},
  {title: 'notification 30', date: '2024-01-30'},
  {title: 'notification 31', date: '2024-02-02'},
  {title: 'notification 32', date: '2024-02-02'},
  {title: 'notification 33', date: '2024-02-03'},
  {title: 'notification 34', date: '2024-02-04'},
  {title: 'notification 35', date: '2024-02-05'},
  {title: 'notification 36', date: '2024-02-06'},
  {title: 'notification 37', date: '2024-02-07'},
  {title: 'notification 38', date: '2024-02-08'},
  {title: 'notification 39', date: '2024-02-09'},
  {title: 'notification 40', date: '2024-02-10'},
  {title: 'notification 41', date: '2024-02-11'},
  {title: 'notification 42', date: '2024-02-12'},
  {title: 'notification 43', date: '2024-02-13'},
  {title: 'notification 44', date: '2024-02-14'},
  {title: 'notification 45', date: '2024-02-15'},
  {title: 'notification 46', date: '2024-02-16'},
  {title: 'notification 47', date: '2024-02-17'},
  {title: 'notification 48', date: '2024-02-18'},
  {title: 'notification 49', date: '2024-02-19'},
  {title: 'notification 50', date: '2024-02-20'},
  {title: 'notification 51', date: '2024-02-21'},
  {title: 'notification 52', date: '2024-02-22'},
  {title: 'notification 53', date: '2024-02-23'},
  {title: 'notification 54', date: '2024-02-24'},
  {title: 'notification 55', date: '2024-02-25'},
  {title: 'notification 56', date: '2024-02-26'},
  {title: 'notification 57', date: '2024-02-27'},
  {title: 'notification 58', date: '2024-02-28'},
  {title: 'notification 59', date: '2024-02-29'},
];
