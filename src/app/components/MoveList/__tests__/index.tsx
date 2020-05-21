import React from 'react';
import { render } from 'test/test-utils';

import { initialState, setMoves } from 'store/moves';
import MoveList from '../index';

test('Loading component initially renders, then no moves message renders as store is updated with no moves', () => {
  const { getByText, getByLabelText, store } = render(<MoveList />);

  expect(store.getState().moves).toStrictEqual(initialState);
  expect(getByLabelText(/loading/i)).toBeVisible();

  store.dispatch(
    setMoves({
      workouts: {},
      exercises: {},
    }),
  );

  getByText(/no moves have been created/i);
});

test('Loading component renders, then move list items render as store is updated with moves', () => {
  const { getByText, getByLabelText, store } = render(<MoveList />);

  expect(store.getState().moves).toStrictEqual(initialState);
  expect(getByLabelText(/loading/i)).toBeVisible();

  store.dispatch(
    setMoves({
      exercises: {
        ZAGQLUL0cz8s3KOJR67i: {
          id: 'ZAGQLUL0cz8s3KOJR67i',
          name: 'Burpees',
          description: '',
          tags: [],
        },
      },
      workouts: {
        ZAGQLUL0cz8s3KOJR68i: {
          id: 'ZAGQLUL0cz8s3KOJR68i',
          name: 'Strength 1',
          description: '',
          tags: [],
          mode: ['CIRCUIT', 'REPS'],
          config: {
            rounds: 3,
            rest: {
              auto: true,
              inner: 30,
              outer: 30,
            },
          },
          movements: [],
        },
      },
    }),
  );

  getByText(/strength 1/i);
  getByText(/burpees/i);
  getByLabelText(/strength 1 workout option menu/i);
  getByLabelText(/burpees exercise option menu/i);
});
