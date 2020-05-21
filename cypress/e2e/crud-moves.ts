import { buildMove } from '../support/generate';

// const dispatch = (action: Action) =>
//   cy.window().its('store').invoke('dispatch', action);

const tag = buildMove();
const tagUpdate = buildMove();
const exercise = buildMove();
const exerciseUpdate = buildMove();
const workout = buildMove();
const workoutUpdate = buildMove();

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
  cy.resetDb();

  cy.visit('/moves');
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
    cy.createNewMove('tag', tag);
    // confirm move is saved in store
    cy.window().should('have.property', 'postData');
    cy.window().then((win) => {
      const id = (win as any).postData.id;
      const tagObj = {
        [id]: {
          id: id,
          name: tag.name,
          description: tag.description,
        },
      };

      cy.checkStoreForDeepEqual('moves.tags.byId', tagObj);

      // read
      cy.openMove('tag', tag.name, 'view');
      cy.findByText(/close/i).click();

      // edit
      cy.openMove('tag', tag.name, 'edit');
      cy.findByLabelText(/name/i).clear().type(tagUpdate.name);
      cy.findByLabelText(/description/i)
        .clear()
        .type(tagUpdate.description);
      cy.findByText(/update/i, { selector: 'button' }).click();
      cy.findByText(/close/i)
        .click()
        .then(() => {
          // check store for update
          tagObj[id].name = tagUpdate.name;
          tagObj[id].description = tagUpdate.description;
          cy.checkStoreForDeepEqual('moves.tags.byId', tagObj);

          // delete
          cy.openMove('tag', tagUpdate.name, 'delete');
          cy.findByText(/do you want to delete this tag?/i);
          cy.findByText(/delete/i, { selector: 'button' }).click();
          cy.checkStoreForDeepEqual('moves.tags.byId', {});
        });
    });
  });

  it('should be able to create, read, edit, and delete an exercise without using menu list buttons', () => {
    cy.createNewMove('exercise', exercise);

    // confirm move is saved in store
    cy.window().should('have.property', 'postData');
    cy.window().then((win) => {
      const id = (win as any).postData.id;

      const exerciseObj = {
        [id]: {
          id: id,
          name: exercise.name,
          description: exercise.description,
        },
      };

      cy.checkStoreForDeepEqual('moves.exercises.byId', exerciseObj);

      // read
      cy.openMove('exercise', exercise.name, 'view');
      cy.findByText(/close/i).click();

      // edit
      cy.openMove('exercise', exercise.name, 'edit');
      cy.findByLabelText(/name/i).clear().type(exerciseUpdate.name);
      cy.findByLabelText(/description/i)
        .clear()
        .type(exerciseUpdate.description);
      cy.findByText(/update/i, { selector: 'button' }).click();
      cy.findByText(/close/i)
        .click()
        .then(() => {
          // check store for update
          exerciseObj[id].name = exerciseUpdate.name;
          exerciseObj[id].description = exerciseUpdate.description;
          cy.checkStoreForDeepEqual('moves.exercises.byId', exerciseObj);

          // delete
          cy.openMove('exercise', exerciseUpdate.name, 'delete');
          cy.findByText(/do you want to delete this exercise?/i);
          cy.findByText(/delete/i, { selector: 'button' }).click();
          cy.checkStoreForDeepEqual('moves.exercises.byId', {});
        });
    });
  });

  it('should be able to create, read, edit, and delete a workout without using menu list buttons', () => {
    cy.createNewMove('workout', workout);

    // confirm move is saved in store
    cy.window().should('have.property', 'postData');
    cy.window().then((win) => {
      const id = (win as any).postData.id;

      const workoutObj = {
        [id]: {
          id: id,
          name: workout.name,
          description: workout.description,
        },
      };

      cy.checkStoreForDeepEqual('moves.workouts.byId', workoutObj);

      // read
      cy.openMove('workout', workout.name, 'view');
      cy.findByText(/close/i).click();

      // edit
      cy.openMove('workout', workout.name, 'edit');
      cy.findByLabelText(/name/i).clear().type(workoutUpdate.name);
      cy.findByLabelText(/description/i)
        .clear()
        .type(workoutUpdate.description);
      cy.findByText(/update/i, { selector: 'button' }).click();
      cy.findByText(/close/i)
        .click()
        .then(() => {
          // check store for update
          workoutObj[id].name = workoutUpdate.name;
          workoutObj[id].description = workoutUpdate.description;
          cy.checkStoreForDeepEqual('moves.workouts.byId', workoutObj);

          // delete
          cy.openMove('workout', workoutUpdate.name, 'delete');
          cy.findByText(/do you want to delete this workout?/i);
          cy.findByText(/delete/i, { selector: 'button' }).click();
          cy.checkStoreForDeepEqual('moves.workouts.byId', {});
        });
    });
  });

  // it('should properly validate tag form fields', () => {});

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
