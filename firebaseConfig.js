import firebase from '@react-native-firebase/app'
import { firestore } from '@react-native-firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyAcFopoCQEa9yIB9dWT3bmKHzkyVqEcVig",
    authDomain: "ayevids.firebaseapp.com",
    projectId: "ayevids",
    storageBucket: "ayevids.appspot.com",
    messagingSenderId: "187149813092",
    appId: "1:187149813092:web:85b8373ee330d6e40aa671",
    measurementId: "G-DV1BXF649G"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  export default firebase;