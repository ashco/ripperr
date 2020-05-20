// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to determine if cypress is at correct URL.
     * @example cy.assertUrl('/moves')
     */
    assertUrl(path: string): Chainable<Element>;

    /**
     * Custom command to determine if input field validation works correctly.
     * @example cy.checkReqValidation('username')
     */
    checkReqValidation(label: string): Chainable<Element>;

    /**
     * Custom command that determines if form validation is working correctly for the username field.
     * @example cy.validateEmailField('babbs@tabbs.net')
     */
    validateUsernameField(username: string): Chainable<Element>;

    /**
     * Custom command that determines if form validation is working correctly for the email field.
     * @example cy.validateEmailField('babbs@tabbs.net')
     */
    validateEmailField(email: string): Chainable<Element>;

    /**
     * Custom command that determines if form validation is working correctly for the password field. Can run additional tests by marking includeVerify as true.
     * @example cy.validateEmailField('babbs@tabbs.net')
     */
    validatePasswordField(
      password: string,
      includeVerify?: boolean,
    ): Chainable<Element>;

    /**
     * Custom command that deletes all  firestore move records for a user.
     * @example cy.validateEmailField('babbs@tabbs.net')
     */
    resetDb(uid?: string): Chainable<Element>;
    /**
     * Custom command that runs a deep equal comparison for an expected value on the store's path.
     * @example cy.checkStoreForDeepEqual(testObj, 'moves.tags.byId')
     */
    checkStoreForDeepEqual(path: string, expectedVal: any): Chainable<Element>;
  }
}
