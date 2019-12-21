"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const next_1 = require("next");
const path = require("path");
// const dev = process.env.NODE_ENV !== 'production';
const dev = false;
// const app = next({ dev, conf: { distDir: 'next' } });
const app = next_1.default({
    dev,
    conf: { distDir: `${path.relative(process.cwd(), __dirname)}/../next` }
});
const handle = app.getRequestHandler();
exports.server = functions.https.onRequest(async (req, res) => {
    console.log("File: " + req.originalUrl); // log the page.js file that is being requested
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
//# sourceMappingURL=index.js.map