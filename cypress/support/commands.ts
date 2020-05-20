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

Cypress.Commands.add('validateUsernameField', (username) => {
  // username is required
  cy.checkReqValidation('username');
  // username error alert dismisses
  cy.findByLabelText(/username/i).type(username);
  cy.findByRole('alert').should('not.be.visible');
});

Cypress.Commands.add('validateEmailField', (email) => {
  // email is required
  cy.checkReqValidation('email');
  // email must be a valid email
  cy.findByLabelText(/email/i).type('bad-format');
  cy.findByRole('alert')
    .should('be.visible')
    .contains(/email must be a valid email/i);
  // email error alert dismisses
  cy.findByLabelText(/email/i).clear().type(email);
  cy.findByRole('alert').should('not.be.visible');
});

Cypress.Commands.add(
  'validatePasswordField',
  (password, includeVerify = false) => {
    // Password is required
    cy.checkReqValidation('password');
    // Password must be at least 6 characters
    cy.findByLabelText(/^password/i).type('12345');
    cy.findByRole('alert')
      .should('be.visible')
      .contains(/password must be at least 6 characters/i);
    // password error alert dismisses
    cy.findByLabelText(/^password/i)
      .clear()
      .type(password);
    cy.findByRole('alert').should('not.be.visible');

    if (includeVerify) {
      // Passwords must match
      cy.findByLabelText(/confirm password/i)
        .type('no-match')
        .blur();
      cy.findByRole('alert')
        .should('be.visible')
        .contains(/passwords must match/i);
      // password confirm error alert dismisses
      cy.findByLabelText(/passwords must match/i)
        .clear()
        .type(password);
      cy.findByRole('alert').should('not.be.visible');
    }
  },
);
Cypress.Commands.add('resetDb', (uid = Cypress.env('TEST_UID')) => {
  cy.callFirestore('delete', `users/${uid}/workouts`);
  cy.callFirestore('delete', `users/${uid}/exercises`);
  cy.callFirestore('delete', `users/${uid}/archetypes`);
});
Cypress.Commands.add('checkStoreForDeepEqual', (path, expectedVal) => {
  cy.window()
    .its('store')
    .invoke('getState')
    .its(path)
    .should('deep.equal', expectedVal);
});
