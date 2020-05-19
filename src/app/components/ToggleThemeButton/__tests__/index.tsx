import React from 'react';
// import { createStore } from 'redux';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import ToggleThemeButton from '../index';

import { Provider } from 'react-redux';
import createStore from 'store';

import { ThemeProvider } from 'styled-components';
import { darkTheme } from 'styles/theme';

// import {reducer} from '../redux-reducer'

function render(
  ui: any,
  { store = createStore(), theme = darkTheme, ...rtlOptions },
) {
  const Wrapper: React.FC = ({ children }) => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  };

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...rtlOptions }),
    store,
  };
}

// function render(
//   ui,
//   {
//     initialState,
//     store = createStore(reducer, initialState),
//     ...rtlOptions
//   } = {},
// ) {
//   // adding wrapper function allows you to rerender component and not screw up state
//   function Wrapper({ children }) {
//     return <Provider store={store}>{children}</Provider>;
//   }

//   return {
//     ...rtlRender(ui, { wrapper: Wrapper, ...rtlOptions }),
//     store, // can make assertions on store. Not recommended, but can be useful
//   };
// }

test('App loads with dark theme. Button can toggle between light and dark modes', () => {
  const { getByLabelText, getByText, store } = render(<ToggleThemeButton />, {
    initialState: { count: 0 },
  });

  console.log(store);

  // fireEvent.click(getByText('+'));
  // expect(getByLabelText(/count/i)).toHaveTextContent('1');
});

test('Theme mode is saved to localStorage', () => {});

// test('can render with redux with custom initial state', () => {
//   const { getByLabelText, getByText } = render(<Counter />, {
//     initialState: { count: 3 },
//   });

//   fireEvent.click(getByText('-'));
//   expect(getByLabelText(/count/i)).toHaveTextContent('2');
// });
