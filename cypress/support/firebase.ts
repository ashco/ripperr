import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import { attachCustomCommands } from 'cypress-firebase';

const { API_KEY, PROJECT_ID, MESSAGING_SENDER_ID } = Cypress.env();

const fbInstance = firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  messagingSenderId: MESSAGING_SENDER_ID,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
});
if (fbInstance) {
  (window as any).fbInstance = fbInstance;
}

attachCustomCommands({ Cypress, cy, firebase });
