import { Action } from '@reduxjs/toolkit';
import { clearAllMoves } from '../../src/app/store/moves';
import { buildMove } from '../support/generate';

// const dispatch = (action: Action) =>
//   cy.window().its('store').invoke('dispatch', action);

const tag = buildMove();
const exercise = buildMove();

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
  cy.resetDb();
  cy.window().should('have.property', 'store');
  // dispatch(clearAllMoves()); // clear previous setup
});

describe('create new moves', () => {
  it('should start with no moves', () => {
    cy.findByText(/no moves are available/i);
    cy.checkStoreForDeepEqual('moves', initState);
  });

  it('should be able to create, read, edit, and delete a tag without using menu list buttons', () => {
    // create
    cy.findByRole('button', { name: 'Add Move' }).click();
    cy.findByText(/add tag/i).click();
    cy.findByText(/create new tag/i);
    cy.findByLabelText(/name/i).type(tag.name);
    cy.findByLabelText(/description/i).type(tag.description);
    cy.findByText(/create/i, { selector: 'button' }).click();
    cy.findByText(/close/i).click();

    // confirm move is saved in store
    cy.window().should('have.property', 'postData');
    cy.window().then((window) => {
      const id = (window as any).postData.id;

      const tagObj = {
        [id]: {
          id: id,
          name: tag.name,
          description: tag.description,
        },
      };

      cy.checkStoreForDeepEqual('moves.tags.byId', tagObj);
    });

    // edit
    cy.findByLabelText('filter-bar').click();
    cy.findByText(new RegExp(tag.name, 'i')).click();
  });

  // it('should be able to create a new exercise', () => {
  //   cy.findByRole('button', { name: 'Add Move' }).click();

  //   cy.findByText(/add exercise/i).click();
  //   cy.findByText(/create new exercise/i);
  //   cy.findByLabelText(/name/i).type(exercise.name);
  //   cy.findByLabelText(/description/i).type(exercise.description);
  //   cy.findByText(/create/i, { selector: 'button' }).click();
  //   cy.findByText(/close/i).click();

  //   cy.window().should('have.property', 'postData');
  //   cy.window().then((window) => {
  //     const id = (window as any).postData.id;

  //     const moveObj = {
  //       [id]: {
  //         id: id,
  //         name: move.name,
  //         description: move.description,
  //       },
  //     };

  //     cy.checkStoreForDeepEqual('moves.moves.byId', moveObj);
  //   });
  // });
  // it('should be able to create a new move', () => {});

  // it('should be able to view an existing workout', () => {});
  // it('should be able to view an existing exercise', () => {});
  // it('should be able to view an existing move', () => {});

  // it('should be able to edit an existing workout', () => {});
  // it('should be able to edit an existing exercise', () => {});
  // it('should be able to edit an existing move', () => {});

  // it('should be able to delete an existing workout', () => {});
  // it('should be able to delete an existing exercise', () => {});
  // it('should be able to delete an existing move', () => {});
});
