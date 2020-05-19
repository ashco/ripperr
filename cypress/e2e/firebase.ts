describe('Some Test', () => {
  it('Adds document to test_hello_world collection of Firestore', () => {
    cy.visit('/');
    cy.login('9LpIGm3hwqeZmGop968xcUl7V442');
    // cy.callFirestore('add', 'test_hello_world', { some: 'value' });
  });
});
