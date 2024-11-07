import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useShare} from './share-container';
import {IShareProps} from './types';
import {SCREEN_WIDTH} from 'utils';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import {AnimatedIcon, AssetSvg, ButtonView, Text} from 'components';
import colors from 'theme';
import {decryptData, downloadView, encryptData, shareView} from 'utils/helper';
import ViewShot from 'react-native-view-shot';

export const Share = () => {
  const {loading}: IShareProps = useShare();
  const viewShotRef = useRef<ViewShot>(null);
  const colorList = ['#ffffff00', '#FEE2E2DD'];
  const encryptedData = encryptData(data);

  const link = `https://google.com/${encryptedData}`;
  const decryptedData = decryptData(encryptedData);

  const SHARE_VIEW = (
    <View className="flex-row px-5 mt-5 w-full items-center justify-between">
      <ButtonView
        onPress={() => shareView(viewShotRef)}
        className="flex-row items-center">
        <AssetSvg name="copy" width={24} height={24} />
        <Text text="Share" className="ml-2 text-xs font-medium" />
      </ButtonView>
      <ButtonView
        onPress={() => downloadView(viewShotRef)}
        className="flex-row items-center">
        <AssetSvg name="copy" width={24} height={24} />
        <Text text="Download" className="ml-2 text-xs font-medium" />
      </ButtonView>
    </View>
  );
  const QR_VIEW = (
    <View style={{top: '-15%'}}>
      <View style={styles.qrContainer}>
        <QRCode
          enableLinearGradient
          linearGradient={['#000', '#555']}
          size={SCREEN_WIDTH * 0.6}
          value={link}
        />
      </View>
      {SHARE_VIEW}
      <View className="items-center mt-4">
        <Text text="Test Group" className="text-xl font-bold text-primary" />
        <Text text="Code :" className="text-xs font-medium" />
        <Text
          text="1AFFADER456GDD"
          className="text-xl font-bold text-primary"
        />
      </View>
    </View>
  );
  return (
    <ViewShot ref={viewShotRef}>
      <View style={styles.container}>
        <View
          style={{
            transform: [{scaleX: -1}],
          }}>
          <AnimatedIcon
            resizeMode="cover"
            name="qrBg"
            autoPlay
            loop
            style={styles.animatedIcon}
          />
        </View>
        <LinearGradient
          colors={colorList}
          useAngle
          angle={250}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.topView}>
          <Text text="Share QR Code" className="text-2xl font-bold" />
        </View>
        <View style={styles.detailsContainer}>{QR_VIEW}</View>
      </View>
    </ViewShot>
  );
};

const data = {
  type: 'VILLAGE',
  id: 143,
  name: 'Test Group',
  code: '1AFFADER456GDD',
  image: 'https://picsum.photos/200/300',
};
const styles = StyleSheet.create({
  animatedIcon: {
    opacity: 0.8,
    top: -20,
    position: 'absolute',
    alignSelf: 'center',
    width: SCREEN_WIDTH,
    aspectRatio: 1,
  },
  detailsContainer: {
    height: '70%',
    width: '100%',
    backgroundColor: colors.grayA3,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_WIDTH * 0.75,
    width: SCREEN_WIDTH * 0.75,
    alignSelf: 'center',

    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topView: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
