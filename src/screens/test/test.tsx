import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {AssetSvg, Text} from 'components';
import ViewShot, {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import moment from 'moment';
import {isAndroidPlatform, isIosPlatform} from 'utils';
import {PERMISSIONS, request} from 'react-native-permissions';
import AddButton from './partials/add-button';
import {routes} from 'navigation';

export default ({navigation}) => {
  const [images, setImages] = useState([]);
  const onAdd = () => {
    navigation.navigate(routes.CHAT);
  };
  const viewRef = useRef<ViewShot>(null);
  const share = async () => {
    if (viewRef.current) {
      try {
        const uri = await captureRef(viewRef.current, {format: 'jpg'});

        Share.open({
          title: 'Share Image title',
          subject: 'Share Image subject',
          type: 'image/png',
          url: uri,
          message: 'Share Image message',
        });
      } catch (error) {}
    }
  };

  const download = async () => {
    if (viewRef.current) {
      try {
        const uri = await captureRef(viewRef.current, {format: 'jpg'});
        const fileName = `viewshot_${Date.now()}.jpg`;
        const directory =
          Platform.OS === 'ios'
            ? `${RNFS.DocumentDirectoryPath}/appName`
            : `${RNFS.PicturesDirectoryPath}/appName`;
        await RNFS.mkdir(directory);
        const filePath = `${directory}/${fileName}`;
        await RNFS.moveFile(uri, filePath);
        await getImages();
      } catch (error) {}
    }
  };

  const getImages = async () => {
    try {
      // Determine the directory path
      const directory =
        Platform.OS === 'ios'
          ? `${RNFS.DocumentDirectoryPath}/appName`
          : `${RNFS.PicturesDirectoryPath}/appName`;

      // Check if the directory exists
      const directoryExists = await RNFS.exists(directory);

      if (!directoryExists) {
        console.log('Directory does not exist.');
        return [];
      }

      // Read the contents of the directory
      const files = await RNFS.readDir(directory);

      // Filter files to only include images with 'viewshot_' prefix
      const folderImages = files
        .filter(file => file.name.startsWith('viewshot_') && file.isFile())
        .map(file => file.path);
      setImages(folderImages);
    } catch (error) {
      console.error('Failed to get viewshot images:', error);
      return [];
    }
  };
  const deleteImage = async imagePath => {
    try {
      const fileExists = await RNFS.exists(imagePath);

      if (!fileExists) {
        console.log('File does not exist:', imagePath);
        return false;
      }
      await RNFS.unlink(imagePath);
      await getImages();
      console.log('Deleted file:', imagePath);
      return true;
    } catch (error) {
      console.error('Failed to delete the image:', error);
      return false;
    }
  };
  const requestStoragePermission = async () => {
    if (isIosPlatform) {
      const permission = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
      console.log('permission', permission);

      return permission === 'granted';
    }
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ],
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to read files.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted', granted);
      } else {
        console.log('Storage permission denied', granted);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    requestStoragePermission();
    getImages();
    return () => {};
  }, []);

  const randomColor = () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return `#${color}`;
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <SafeAreaView style={styles.container}>
        <View className="w-full flex items-center justify-center">
          <ViewShot ref={viewRef} style={{width: '90%', alignSelf: 'center'}}>
            <View
              style={{backgroundColor: randomColor()}}
              className="w-full py-4 border rounded-md border-gray-400 items-center">
              <Text text={moment().format('DD-MM-YYYY HH:mm:ss')} />
              <Image
                resizeMode="contain"
                source={{
                  uri: 'https://images6.alphacoders.com/135/1351738.jpeg',
                }}
                className="h-48 mt-2 w-full"
              />
            </View>
          </ViewShot>
          <Button onPress={download} title="Download" />
          <Button title="Share Screenshot" onPress={share} />
          <ScrollView horizontal className="pl-4">
            <View className="flex flex-row gap-3">
              {images.map((image, index) => (
                <View>
                  <Image
                    key={index}
                    resizeMode="contain"
                    source={{uri: getImageUrl(image)}}
                    className="h-48 w-48"
                  />
                  <TouchableOpacity
                    onPress={() => deleteImage(image)}
                    className="absolute rounded-full bg-gray-300 top-[20px] -right-[10px] p-1">
                    <AssetSvg name={'cross'} width={18} height={18} autoPlay />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <AddButton onAdd={onAdd} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const getImageUrl = url => (isAndroidPlatform ? 'file:///' + url : url);
