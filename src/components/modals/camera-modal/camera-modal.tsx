import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import {AssetSvg, ButtonView, FadeUp, Text} from 'components';
import {hasTextLength} from '@/utils';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/utils/size';
import colors from 'theme';
import Animated, {CurvedTransition} from 'react-native-reanimated';
import {Modalize} from 'react-native-modalize';

export default props => {
  const cameraRef = useRef(null);
  const modalRef = useRef<Modalize>(null);

  const [imageData, setImageData] = useState(null);
  const {onCaptureImage, style} = props;
  const imageUrl = imageData?.uri;
  const hasImageLength = hasTextLength(imageUrl);

  const submitImage = async data => {
    await onCaptureImage?.(data);
  };
  const captureImage = async () => {
    const data = await cameraRef?.current?.capture?.();
    await submitImage(data);
  };
  const MODAL_CONTENT = (
    <View className="self-center rounded-24 justify-between height-full">
      <ImageView imageUrl={imageUrl} />
      <Camera
        hideControls
        ref={cameraRef}
        cameraType={CameraType.Back}
        flashMode="auto"
        style={{
          height: SCREEN_WIDTH * 0.8,
          width: SCREEN_WIDTH * 0.8,
          zIndex: 999,
        }}
      />
      <BackButton />
      <CaptureView show={!hasImageLength} captureImage={captureImage} />
    </View>
  );

  useEffect(() => {
    CameraModalService.setModalReference({open, close});
  }, []);

  const open = () => {
    modalRef.current?.open();
  };
  const close = () => {
    modalRef.current?.close();
  };
  return (
    <Modalize
      withHandle={false}
      ref={modalRef}
      disableScrollIfPossible
      adjustToContentHeight>
      <Animated.View
        layout={CurvedTransition}
        style={styles.bottomSheetContent}>
        <View className="mb-4 pb-12 flex-row items-center justify-end">
          <Text
            className="text-xl text-center font-bold flex-1"
            text={'Scan QR Code'}
          />
          <Pressable onPress={close}>
            <AssetSvg name={'cross'} width={24} height={24} />
          </Pressable>
        </View>
        {MODAL_CONTENT}
      </Animated.View>
    </Modalize>
  );
};

const BackButton = () => {
  return (
    <Pressable
      className="absolute top-45 left-20 z-99 rounded-100 px-8 py-8"
      onPress={CameraModalService.closeModal}>
      <AssetSvg height={28} width={28} name={'left_arrow'} />
    </Pressable>
  );
};
const ImageView = props => {
  const {imageUrl} = props;
  if (!hasTextLength(imageUrl)) return <Fragment />;
  return <Image source={{uri: imageUrl}} style={styles.itemImage} />;
};

const CaptureView = props => {
  const {show = true, captureImage} = props;
  return (
    <ButtonView
      onPress={captureImage}
      show={show}
      base-className="absolute bottom-45 z-99 self-center items-center justify-center">
      <FadeUp>
        <View className="height-70 width-70 bg-white rounded-100 self-center items-center justify-center">
          <View className="height-62 width-62 rounded-100 bg-white border-w-3 border-gray-800" />
        </View>
      </FadeUp>
    </ButtonView>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    flex: 1,
  },
  itemImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 98,
  },
});

class Service {
  apply: boolean;
  modalApply: any;
  constructor() {
    this.apply = false;
    this.modalApply = null;
  }
  setModalReference = (ref: any) => (this.modalApply = ref);
  openModal = () => this.modalApply?.open();
  closeModal = () => this.modalApply?.close();

  toggleModal = (status: any) => (this.apply = status);
}

export const CameraModalService = new Service();
