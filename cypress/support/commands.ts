// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('assertUrl', (path = '/') => {
  cy.url().should('eq', `${Cypress.config().baseUrl}${path}`);
});

Cypress.Commands.add('checkReqValidation', (label) => {
  const re = new RegExp(`^${label}`, 'i');
  const reReq = new RegExp(label + ' is required', 'i');

  cy.findByLabelText(re).focus().blur();
  cy.findByRole('alert').should('be.visible').contains(reReq);
});
