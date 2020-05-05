require('dotenv').config({ path: '../../.env' });
const withImages = require('next-images');
const path = require('path');

module.exports = withImages({
  devIndicators: {
    // removes indicator
    autoPrerender: false,
  },
  distDir: '../../dist/next',
  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
  },
  // allows import aliases
  webpack(config, options) {
    // config.resolve.alias['@'] = path.join(__dirname);
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['context'] = path.join(__dirname, 'context');
    config.resolve.alias['domain'] = path.join(__dirname, 'domain');
    config.resolve.alias['hooks'] = path.join(__dirname, 'hooks');
    config.resolve.alias['icons'] = path.join(__dirname, 'icons');
    config.resolve.alias['pages'] = path.join(__dirname, 'pages');
    config.resolve.alias['static'] = path.join(__dirname, 'static');
    config.resolve.alias['styles'] = path.join(__dirname, 'styles');
    config.resolve.alias['types'] = path.join(__dirname, 'types');
    config.resolve.alias['utils'] = path.join(__dirname, 'utils');
    return config;
  },
});
