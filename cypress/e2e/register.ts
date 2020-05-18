describe('register', () => {
  it('should create a new user', () => {
    cy.visit('/');
    // cy.findByText(/login/i).click();
    cy.findByText(/sign in/i).click();
  });
});
