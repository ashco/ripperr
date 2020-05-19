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
  }
}
