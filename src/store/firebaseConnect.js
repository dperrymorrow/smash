// firebase bullcrap
import firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");

// Leave out Storage
//require("firebase/storage");

const config = {
  apiKey: "AIzaSyBBgycW2AM5cX5UwPbUOlu1umZIZkuch-A",
  authDomain: "smash-api.firebaseapp.com",
  databaseURL: "https://smash-api.firebaseio.com",
  projectId: "smash-api",
  storageBucket: "",
  messagingSenderId: "900090570731",
};

let initialized = false;

export default function() {
  if (!initialized) {
    firebase.initializeApp(config);
    initialized = true;
  }
  return firebase;
}
