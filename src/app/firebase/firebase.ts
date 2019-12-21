import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/database";
import getConfig from 'next/config';


const config = {
  apiKey: process.env.API_KEY
  // authDomain: YOUR_AUTH_DOMAIN,
  // databaseURL: YOUR_DATABASE_URL,
  // projectId: YOUR_PROJECT_ID,
  // storageBucket: '',
  // messagingSenderId: YOUR_MESSAGING_SENDER_ID
};


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
// const db = firebase.database();

export { auth };