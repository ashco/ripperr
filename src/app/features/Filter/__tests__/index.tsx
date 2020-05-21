import React from 'react';
import { render } from 'test/test-utils';
import user from '@testing-library/user-event';

import { setMoves } from 'store/moves';

import Filter from '../index';

test('Should be able to type text into input and clear it by clicking the clear filter button', async () => {
  const { getByLabelText, store, debug } = render(<Filter />);

  store.dispatch(
    setMoves({
      workouts: {},
      exercises: {},
      tags: {
        ZAGQLUL0cz8s3KOJR67i: {
          id: 'ZAGQLUL0cz8s3KOJR67i',
          name: 'Push',
          description: '',
        },
      },
    }),
  );

  getByLabelText(/add move/i);
  const filterInput = getByLabelText(/filter input/i);

  const filterText = 'Filter text';
  await user.type(filterInput, filterText);
  expect(filterInput).toHaveValue(filterText);

  user.click(getByLabelText(/clear filter/i));
  expect(filterInput).toHaveValue('');
  getByLabelText(/add move/i);
});

test('Filter should open and show tags when filter input is clicked. It should close when a click outside of filter element occurs.', () => {
  const {
    container,
    getByText,
    getByLabelText,
    queryByText,
    store,
    debug,
  } = render(<Filter />);

  store.dispatch(
    setMoves({
      workouts: {},
      exercises: {},
      tags: {
        ZAGQLUL0cz8s3KOJR67i: {
          id: 'ZAGQLUL0cz8s3KOJR67i',
          name: 'Push',
          description: '',
        },
      },
    }),
  );

  expect(queryByText(/push/i)).toBeNull();
  user.click(getByLabelText(/filter input/i));
  getByText(/push/i);

  user.click(container);
  expect(queryByText(/push/i)).toBeNull();
});

test('Filter should be set to active when filter text is typed or tags are activated. Filter should be inactive when there is no text and no tags are toggled.', async () => {
  const {
    container,
    getByText,
    getByLabelText,
    queryByLabelText,
    store,
    debug,
  } = render(<Filter />);

  store.dispatch(
    setMoves({
      workouts: {},
      exercises: {},
      tags: {
        ZAGQLUL0cz8s3KOJR67i: {
          id: 'ZAGQLUL0cz8s3KOJR67i',
          name: 'Push',
          description: '',
        },
      },
    }),
  );

  const filterInput = getByLabelText(/filter input/i);
  // starts out inactive
  expect(store.getState().filter.active).toBeFalsy();
  // open but still inactive
  user.click(filterInput);
  expect(store.getState().filter.active).toBeFalsy();
  // filtered = active
  await user.type(filterInput, 'Filter text');
  expect(store.getState().filter.active).toBeTruthy();
  // clear filter = inactive
  user.clear(filterInput);
  expect(store.getState().filter.active).toBeFalsy();
  // open + toggle tag = active
  user.click(filterInput);
  user.click(getByText(/push/i));
  expect(getByLabelText(/active tag/i)).toContainElement(getByText(/push/i));
  expect(store.getState().filter.active).toBeTruthy();

  // untoggle tag = inactive
  user.click(getByText(/push/i));
  expect(queryByLabelText(/active tag/i)).toBeFalsy();
  expect(store.getState().filter.active).toBeFalsy();

  // filter value + toggle tag = active
  await user.type(filterInput, 'Filter text');
  user.click(getByText(/push/i));
  expect(getByLabelText(/active tag/i)).toContainElement(getByText(/push/i));
  expect(store.getState().filter.active).toBeTruthy();

  // remove filter value, untoggle tag, inactive
  user.click(getByLabelText(/clear filter/i));
  expect(store.getState().filter.active).toBeFalsy();
});

test('When active, the filter container should have a orange border top. When inactive, border top should be gray.', async () => {
  const { container, getByLabelText, debug, store } = render(<Filter />);

  const { theme } = store.getState().ui;

  const gray = theme.mode.colorOpacity[200].split(' ').join('');
  const orange = theme.color.orange[500].split(' ').join('');

  expect(container.firstChild).toHaveStyle(`border-top: solid ${gray} 2px`);

  await user.type(getByLabelText(/filter input/i), 'Filter text');
  expect(container.firstChild).toHaveStyle(`border-top: solid ${orange} 5px`);

  user.click(getByLabelText(/clear filter/i));
  expect(container.firstChild).toHaveStyle(`border-top: solid ${gray} 2px`);
  debug();
});

// test('Add Move button should show by default. If filter is active, Clear Filter button should show. If isAddMoveMode, no button should render', () => {});
