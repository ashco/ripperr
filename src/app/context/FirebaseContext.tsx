import React from 'react';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
  projectId: process.env.PROJECT_ID,
  storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

class Firebase {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  // Auth API
  doCreateUserWithEmailAndPassword = (
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doLoginWithEmailAndPassword = (
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = (): Promise<void> => this.auth.signOut();

  doPasswordReset = (email: string): Promise<void> =>
    this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string): Promise<void> => {
    if (this.auth.currentUser) {
      return this.auth.currentUser.updatePassword(password);
    } else {
      throw Error('There is no current user!');
    }
  };

  // DATABASE
  // User API
  // user = (uid: string): firebase.database.Reference =>
  //   this.db.ref(`users/${uid}`);
  user = (uid: string): firebase.firestore.DocumentReference =>
    this.db.doc(`users/${uid}`);

  // users = (): firebase.database.Reference => this.db.ref('users');
  users = (): firebase.firestore.CollectionReference =>
    this.db.collection('users');

  // Tag API
  // movement = ({
  //   uid,
  //   moveType,
  //   id,
  // }: {
  //   uid: string;
  //   moveType: 'workout' | 'exercise' | 'tag';
  //   id: string;
  // }): firebase.firestore.DocumentReference =>
  //   this.db.doc(`users/${uid}/movements/${moveType}/${id}`);

  // // movements = (uid: string, moveType: 'workout' | 'exercise' | 'tag'): firebase.firestore.CollectionReference =>
  // movements = (uid: string): firebase.firestore.CollectionReference =>
  //   this.db.collection(`users/${uid}/movements`);
  // movements = ({
  //   uid,
  //   type,
  // }: {
  //   uid: string;
  //   type?: 'workout' | 'exercise' | 'tag'; // specify what move type
  // }): firebase.firestore.CollectionReference =>
  //   // movements = (uid: string): firebase.firestore.CollectionReference =>
  //   this.db.collection(`users/${uid}/movements${type && '/active/' + type}`);
  // users/uid123/movements/_/exercises/exid1/name
  // col  /doc   /col  /doc      /col  /doc

  // Tag API
  tag = (uid: string, id: string): firebase.firestore.DocumentReference =>
    this.db.doc(`users/${uid}/tags/${id}`);

  tags = (uid: string): firebase.firestore.CollectionReference =>
    this.db.collection(`users/${uid}/tags`);

  // Exercise API
  exercise = (uid: string, id: string): firebase.firestore.DocumentReference =>
    this.db.doc(`users/${uid}/exercises/${id}`);

  exercises = (uid: string): firebase.firestore.CollectionReference =>
    this.db.collection(`users/${uid}/exercises`);

  // Exercise API
  workout = (uid: string, id: string): firebase.firestore.DocumentReference =>
    this.db.doc(`users/${uid}/workouts/${id}`);

  workouts = (uid: string): firebase.firestore.CollectionReference =>
    this.db.collection(`users/${uid}/workouts`);

  getTimestamp = (): firebase.firestore.FieldValue =>
    firebase.firestore.FieldValue.serverTimestamp();
}

const FirebaseContext = React.createContext<Firebase>(new Firebase());

export default FirebaseContext;
