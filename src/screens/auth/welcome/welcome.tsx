import React from 'react';
import {Button, StatusBar, View} from 'react-native';
import styles from './styles';
import {navigateTo, routes} from '@/navigation';
import {AssetImage, Text} from 'components';

export default () => {
  const onPress = () => navigateTo(routes.LOGIN);
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <AssetImage className="w-4/6 self-center h-200" name="logo" />
      <View style={styles.container}>
        <Text style={styles.title} className="text-primary mb-20">
          {'Welcome Screen'}
        </Text>
        <Button onPress={onPress} title="Login >>" />
      </View>
      {/* <FullScreenLoading visible={visible} /> */}
    </View>
  );
};
