import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {AnimatedIcon} from 'components/animated-icon';
import {BaseButton} from 'components/base';
import {AssetSvg} from 'components/asset-svg';
import {Text} from 'components';

export const OtpModal = () => {
  const bottomSheetRef = useRef<Modalize>(null);

  useEffect(() => {
    // bottomSheetRef.current?.open();
  }, []);

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <Modalize
      withHandle={false}
      ref={bottomSheetRef}
      disableScrollIfPossible
      adjustToContentHeight>
      <View style={styles.bottomSheetContent}>
        <View className="absolute self-end top-4 right-4">
          <AssetSvg name="cross" />
        </View>
        <View className="w-full px-5 flex-row">
          <View className="h-full absolute bg-primary w-1 self-center left-16" />
          <View className="gap-2">
            <View className="h-3 w-3 rounded-full bg-primary" />
            <View className="flex-row w-full gap-x-10 items-center">
              <View>
                <Text text="Test Title" />
                <Text text="Test Desc" />
              </View>
            </View>
            <View className="flex-row w-full gap-x-10 items-center">
              <View className="h-3 w-3 rounded-full bg-primary" />
              <View>
                <Text text="Test Title" />
                <Text text="Test Desc" />
              </View>
            </View>
            <View className="flex-row w-full gap-x-10 items-center">
              <View className="h-3 w-3 rounded-full bg-primary" />
              <View>
                <Text text="Test Title" />
                <Text text="Test Desc" />
              </View>
            </View>
          </View>
        </View>
        <AnimatedIcon autoPlay name="crown" style={{width: 200, height: 200}} />
        <BaseButton title="Continue" onPress={handleClose} />
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 100,
    width: 100,
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    width: '80%',
    lineHeight: 25,
  },
});
