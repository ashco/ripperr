import { buildUser } from '../support/generate';

describe('change password', () => {
  it('should show validation error messages when incorrect information is provided', () => {
    const user = buildUser();

    cy.visit('/signup');

    cy.validatePasswordField(user.password, true);
  });
});
