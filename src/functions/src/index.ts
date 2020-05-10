import * as functions from 'firebase-functions';
import next from 'next';
import * as path from 'path';
import admin from 'firebase-admin';

// const dev = process.env.NODE_ENV !== 'production';
const dev = false;
// const app = next({ dev, conf: { distDir: 'next' } });

const app = next({
  dev,
  conf: {
    distDir: `${path.relative(process.cwd(), __dirname)}/../../../../dist/next`,
  },
});
const handle = app.getRequestHandler();
// Serve next app
export const server = functions.https.onRequest(async (req, res) => {
  console.log('File: ' + req.originalUrl); // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res));
});

admin.initializeApp();
// const db = admin.firestore();
admin.firestore();
