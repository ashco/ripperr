import * as functions from 'firebase-functions';
import next from 'next';
import * as path from 'path'

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev, conf: { distDir: 'next' } });

const dev = false;
const app = next({
  dev,
  conf: { distDir: `${path.relative(process.cwd(), __dirname)}/../next` }
});
const handle = app.getRequestHandler();

export const server = functions.https.onRequest(async (req, res) => {
  console.log("File: " + req.originalUrl) // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res));
});


// // The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// import functions from 'firebase-functions';

// // The Firebase Admin SDK to access the Firebase Realtime Database.
// import admin from 'firebase-admin';
// admin.initializeApp();


// // Take the text parameter passed to this HTTP endpoint and insert it into the
// // Realtime Database under the path /messages/:pushId/original
// export const addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into the Realtime Database using the Firebase Admin SDK.
//   const snapshot = await admin.database().ref('/messages').push({ original: original });
//   // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//   res.redirect(303, snapshot.ref.toString());
// });
