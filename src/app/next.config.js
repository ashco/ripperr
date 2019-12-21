require('dotenv').config();

module.exports = {
  distDir: '../functions/next',
  env: {
    API_KEY: process.env.API_KEY,
  },
};
