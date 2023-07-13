import firebase from "firebase/compat/app"
import "firebase/compat/auth"

 const firebaseApp = firebase.initializeApp({
    "projectId": "fb-auth-grupo12",
    "appId": "1:512133250014:web:dc7e72a0fb6ffe58067b4f",
    "storageBucket": "fb-auth-grupo12.appspot.com",
    "apiKey": "AIzaSyA5ctQoVuhwVgyqTVn8WphoTbVByQVefto",
    "authDomain": "fb-auth-grupo12.firebaseapp.com",
    "messagingSenderId": "512133250014"
  });

  export default firebaseApp;