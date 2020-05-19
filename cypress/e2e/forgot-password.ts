import { buildUser } from '../support/generate';

describe('forgot password', () => {
  it('should show validation error messages when incorrect information is provided', () => {
    const user = buildUser();

    cy.visit('/forgot');

    cy.validateEmailField(user.email);
  });
});
