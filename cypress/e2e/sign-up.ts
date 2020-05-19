import { buildUser } from '../support/generate';

describe('sign up', () => {
  it('should navigate to the login and signup pages by clicking the correct buttons', () => {
    cy.visit('/');

    // navigate to login page
    cy.findByText(/login/i).click();
    cy.assertUrl('/login');

    // navigate to signup page
    cy.findByText(/don't have an account/i).click();
    cy.assertUrl('/signup');
  });

  it('should create a new user, logout, and log back in again', () => {
    const user = buildUser();

    cy.visit('/signup');

    // fill in form
    cy.findByLabelText(/username/i).type(user.username);
    cy.findByLabelText(/email/i).type(user.email);
    cy.findByLabelText(/^password/i).type(user.password);
    cy.findByLabelText(/confirm password/i).type(user.password);
    cy.findByText(/submit/i).click();

    // check for redirect
    cy.assertUrl('/moves');

    // check that correct account email shows up
    cy.findByText(/account/i).click();
    cy.findByLabelText('account-email').should(
      'contain.text',
      user.email.toLowerCase(),
    );

    // sign out
    cy.findByText(/sign out/i).click();
  });

  it.skip('should show an error message when Firebase returns an error', () => {
    // todo - this one is kind of weird because you have to somehow get firebase to return an error. Mocking a post request wouldn't do it because the request needs to happen in the onSubmit function. Maybe you need to write an integration test?
    // cy.request({
    //   url:
    //     'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBMXZ8sjrutwp6bU0bOSUOi60GoFaQHjXo',
    //   method: 'POST',
    //   body: {
    //     email: null,
    //     password: null,
    //     returnSecureToken: true,
    //   },
    // }).then((res) => {
    //   console.log(res);
    //   debugger;
    // });
  });

  it.only('should show validation error messages when incorrect information is provided', () => {
    const user = buildUser();

    cy.visit('/signup');

    // username is required
    cy.checkReqValidation('username');
    // username error alert dismisses
    cy.findByLabelText(/username/i).type(user.username);
    cy.findByRole('alert').should('not.be.visible');

    // email is required
    cy.checkReqValidation('email');
    // email must be a valid email
    cy.findByLabelText(/email/i).type('bad-format');
    cy.findByRole('alert')
      .should('be.visible')
      .contains(/email must be a valid email/i);
    // email error alert dismisses
    cy.findByLabelText(/email/i).clear().type(user.email);
    cy.findByRole('alert').should('not.be.visible');

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
      .type(user.password);
    cy.findByRole('alert').should('not.be.visible');

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
      .type(user.password);
    cy.findByRole('alert').should('not.be.visible');
  });
});
