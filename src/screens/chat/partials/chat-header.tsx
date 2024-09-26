import React from 'react';
import {Image, View, StyleSheet, Linking} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {goBack} from '@/navigation';
import {AssetSvg, ButtonView, FadeIn, ReachAnimation, Text} from '@/components';
import {hasObjectLength, hasTextLength} from 'utils';

export default props => {
  const {selectedMessage, setSelectedMessage} = props;
  const copyMessage = () => {
    if (hasObjectLength(selectedMessage)) {
      Clipboard.setString(selectedMessage?.text);
    }
  };
  const openDialer = () => {
    if (hasTextLength(selectedMessage?.user?.phone)) {
      Linking.openURL(`tel:${selectedMessage?.user?.phone}`);
    }
  };
  return (
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
      {hasObjectLength(selectedMessage) && (
        <ReachAnimation>
          <View className="flex-row items-center">
            <ButtonView onPress={copyMessage} className="mr-2">
              <AssetSvg name={'copy'} width={24} height={24} />
            </ButtonView>
            <ButtonView onPress={() => setSelectedMessage(null)}>
              <AssetSvg name={'cross'} width={24} height={24} />
            </ButtonView>
          </View>
        </ReachAnimation>
      )}
      {!hasObjectLength(selectedMessage) && (
        <FadeIn>
          <ButtonView onPress={openDialer}>
            <AssetSvg name={'phone'} width={24} height={24} />
          </ButtonView>
        </FadeIn>
      )}
    </View>
  );
};

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
