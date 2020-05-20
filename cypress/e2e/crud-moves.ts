import { Action } from '@reduxjs/toolkit';
import { clearAllMoves } from '../../src/app/store/moves';
import { buildTag } from '../support/generate';

const dispatch = (action: Action) =>
  cy.window().its('store').invoke('dispatch', action);

const initState = {
  activeId: null,
  workouts: {
    byId: {},
    allIds: [],
  },
  exercises: {
    byId: {},
    allIds: [],
  },
  tags: {
    byId: {},
    allIds: [],
  },
  loading: false,
  error: null,
};

before(() => {
  cy.login();
  cy.visit('/moves');
  dispatch(clearAllMoves()); // clear previous setup
});

// after(() => {
// });

describe('create new moves', () => {
  it('should start with no moves', () => {
    // cy.findByText(/account/i);
    cy.window()
      .its('store')
      .invoke('getState')
      .its('moves')
      .should('deep.equal', initState);
  });

  it('should be able to create a new workout', () => {
    const tag = buildTag();

    cy.findByRole('button', { name: 'Add Move' }).click();

    cy.findByText(/add tag/i).click();
    cy.findByText(/create new tag/i);
    cy.findByLabelText(/name/i).type(tag.name);
    cy.findByLabelText(/description/i).type(tag.description);
  });
  it('should be able to create a new exercise', () => {});
  it('should be able to create a new tag', () => {});

  it('should be able to view an existing workout', () => {});
  it('should be able to view an existing exercise', () => {});
  it('should be able to view an existing tag', () => {});

  it('should be able to edit an existing workout', () => {});
  it('should be able to edit an existing exercise', () => {});
  it('should be able to edit an existing tag', () => {});

  it('should be able to delete an existing workout', () => {});
  it('should be able to delete an existing exercise', () => {});
  it('should be able to delete an existing tag', () => {});
});
