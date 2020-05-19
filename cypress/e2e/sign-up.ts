import { buildUser } from '../support/generate';
import { auth } from 'firebase';

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

    // check for redirect because no user
    cy.visit('/moves');
    cy.assertUrl('/login');
    // log back in

    cy.findByLabelText(/email/i).type(user.email);
    cy.findByLabelText(/^password/i).type(user.password);
    cy.findByText(/submit/i).click();

    cy.assertUrl('/moves');
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

  it('should show validation error messages when incorrect information is provided', () => {
    const user = buildUser();

    cy.visit('/signup');

    cy.validateUsernameField(user.username);
    cy.validateEmailField(user.email);
    cy.validatePasswordField(user.password, true);
  });
});
