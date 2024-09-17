import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {AssetSvg, ButtonView, Text} from 'components';
import {goBack} from 'navigation';

export default memo(() => (
  <View style={styles.container} className="shadow-xl">
    <View className="flex-row items-center gap-3">
      <ButtonView onPress={goBack}>
        <AssetSvg name="left_arrow" width={24} height={24} />
      </ButtonView>
      <Image
        source={{uri: 'https://images6.alphacoders.com/135/1351738.jpeg'}}
        style={styles.profileImage}
      />
      <View className="">
        <Text className="font-medium">John Doe</Text>
        <Text className="text-sm">Shrimp pizza</Text>
      </View>
    </View>
    <Text text="Phone" />
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
    paddingTop: 50,
  },
  profileImage: {width: 40, height: 40, borderRadius: 100},
});
