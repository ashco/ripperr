import * as functions from 'firebase-functions';
import next from 'next';
import * as path from 'path'

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev, conf: { distDir: 'next' } });

const dev = false;
const app = next({
  dev,
  conf: { distDir: `${path.relative(process.cwd(), __dirname)}/../functions/next` }
});

const handle = app.getRequestHandler();

export default functions.https.onRequest(async (req, res) => {
  console.log('File: ' + req.originalUrl); // log the page.js file that is being requested
  await app.prepare();
  handle(req, res);
});