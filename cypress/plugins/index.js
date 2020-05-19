/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const admin = require('firebase-admin');
const cypressFirebasePlugin = require('cypress-firebase').plugin;

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const extendedConfig = cypressFirebasePlugin(on, config, admin);

  // we can grab some process environment variables
  // and stick it into config.env before returning the updated config
  extendedConfig.env = extendedConfig.env || {};
  // you could extract only specific variables
  // and rename them if necessary
  config.env.API_KEY = process.env.API_KEY;
  config.env.PROJECT_ID = process.env.PROJECT_ID;
  config.env.MESSAGING_SENDER_ID = process.env.MESSAGING_SENDER_ID;

  // Add other plugins/tasks such as code coverage here

  return extendedConfig;
};
