import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

// Optionally configure Firebase services
const firebaseConfig = {
  apiKey: 'AIzaSyAl65orcjSSQ_bUch9X0e4zZgxyVVe7t9w',
  projectId: 'way-the-weather',
  appId: 'com.waytheweather',
};

firebase.initializeApp(firebaseConfig);

export {database};
