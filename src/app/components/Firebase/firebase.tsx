import * as firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

export type InterfaceAuthUserContext = firebase.User | null;

class Firebase {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.auth = firebase.auth();
    // this.db = firebase.database();
    this.db = firebase.firestore();
  }

  // Auth API
  doCreateUserWithEmailAndPassword = (
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (
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

  // User API
  // user = (uid: string): firebase.database.Reference =>
  //   this.db.ref(`users/${uid}`);
  user = (uid: string): firebase.firestore.DocumentReference =>
    this.db.doc(`users/${uid}`);

  // users = (): firebase.database.Reference => this.db.ref('users');
  users = (): firebase.firestore.CollectionReference =>
    this.db.collection('users');

  // Exercise API
  exercise = (
    uid: string,
    exerciseName: string,
  ): firebase.firestore.DocumentReference =>
    this.db.doc(`users/${uid}/exercise/${exerciseName}`);
}

export default Firebase;
