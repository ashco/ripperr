import * as firebaseAdmin from 'firebase-admin';
import firebaseServiceAccountKey from './serviceAccount.json';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert('./serviceAccount.json'),
    databaseURL: process.env.DATABASE_URL,
  });
}

export default firebaseAdmin;
