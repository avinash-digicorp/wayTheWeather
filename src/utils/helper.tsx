import {Platform, Dimensions, Alert, PermissionsAndroid} from 'react-native';

import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Share from 'react-native-share';

const Screen = Dimensions.get('window');
export const SCREEN_WIDTH = Screen.width;
export const SCREEN_HEIGHT = Screen.height;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isMWeb = Platform.OS === 'web';
import CryptoJS from 'crypto-js';

const secretKey = 'mySecretKey123';
const appFolder = `${RNFS.LibraryDirectoryPath}/Pictures/Test`;
// Function to check and request storage permissions
const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!hasPermission) {
      const permissionResult = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message:
            'This app needs access to your storage to save photos to your gallery.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      return permissionResult === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  } else {
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    console.log('result', result);

    if (result === RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert(
        'Permission Denied',
        'Photo Library access is required to save images.',
      );
      return false;
    }
  }
};

export const shareView = async viewShotRef => {
  try {
    if (!viewShotRef.current) return;

    // Capture the screenshot
    const uri = await captureRef(viewShotRef.current, {
      format: 'jpg',
      quality: 0.8,
    });

    // Save the screenshot path differently for Android and iOS
    const shareOptions = Platform.select({
      android: {
        url: `file://${uri}`,
      },
      ios: {
        activityItemSources: [
          {
            placeholderItem: {type: 'url', content: uri},
            item: {
              default: {type: 'url', content: uri},
            },
          },
        ],
      },
    });

    // Share the screenshot
    await Share.open(shareOptions);
  } catch (error) {
    console.log('Error sharing screenshot:', error);
    Alert.alert('Error', 'An error occurred while sharing the screenshot.');
  }
};

export const downloadView = async viewRef => {
  if (!viewRef.current) return;
  try {
    const permissionGranted = await requestStoragePermission();

    if (!permissionGranted) {
      Alert.alert(
        'Permission Denied',
        'Storage permission is required to save the image.',
      );
      return;
    }
    const uri = await captureRef(viewRef.current, {
      format: 'jpg',
      quality: 1,
    });
    const directoryPath = appFolder;
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const newFileName = `image_${timestamp}.jpg`;
    const fullPath = `${directoryPath}${newFileName}`;

    const directoryExists = await RNFetchBlob.fs.exists(directoryPath);
    const picturesDir = `${RNFS.LibraryDirectoryPath}/Pictures/Test`;
    if (!directoryExists) {
      await RNFS.mkdir(picturesDir)
        .catch(error => {
          console.log({error});
        })
        .then(d => {
          console.log({d});
        });
    }
    await RNFetchBlob.fs.mv(uri, fullPath);
    await CameraRoll.save(fullPath, {type: 'photo'});
    console.log('Saved');
  } catch (error) {
    console.log({error});

    Alert.alert(error?.message);
  }
};

type ITemperature = {
  fahrenheit: number;
  celsius: number;
  fahrenheitTemp: string;
  celsiusTemp: string;
};
export const getFormattedTemperature = (temp = 0): ITemperature => {
  const fahrenheit = ((temp - 273.15) * 9) / 5 + 32;
  const celsius = temp - 273.15;
  const fahrenheitTemp = `${Math.round(fahrenheit)}°`;
  const celsiusTemp = `${Math.round(celsius)}°`;

  return {fahrenheit, celsius, fahrenheitTemp, celsiusTemp};
};
export const encryptData = data => {
  const stringData = JSON.stringify(data); // Convert data to a string if it's an object
  const encryptedData = CryptoJS.AES.encrypt(stringData, secretKey).toString();
  return encodeURIComponent(encryptedData); // Encode for use in a URL
};

// Decrypt function
export const decryptData = encryptedData => {
  const decodedData = decodeURIComponent(encryptedData); // Decode from URL format
  const bytes = CryptoJS.AES.decrypt(decodedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData); // Convert string back to object if needed
};
