import React, {memo} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {goBack} from '@/navigation';
import {AssetSvg, ButtonView, Text} from '@/components';

export default memo(() => (
  <View style={styles.container}>
    <View className="flex-row items-center">
      <ButtonView onPress={goBack} className="mr-15">
        <AssetSvg name={'left_arrow'} width={24} height={24} />
      </ButtonView>
      <Image
        source={{uri: 'https://images6.alphacoders.com/135/1351738.jpeg'}}
        style={styles.profileImage}
      />
      <View>
        <Text className="size-sm font-medium">John Doe</Text>
        <Text className="size-xs text-gray-800">Shrimp pizza</Text>
      </View>
    </View>
    <ButtonView onPress={goBack} className="mr-15">
      <AssetSvg name={'location'} width={24} height={24} />
    </ButtonView>
  </View>
));

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    paddingTop: 55,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {width: 40, height: 40, borderRadius: 100, marginRight: 12},
});
