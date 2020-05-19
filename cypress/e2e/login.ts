import { buildUser } from '../support/generate';

describe('login', () => {
  it('should show validation error messages when incorrect information is provided', () => {
    const user = buildUser();

    cy.visit('/login');

    cy.validateEmailField(user.email);
    cy.validatePasswordField(user.email);
  });
});
