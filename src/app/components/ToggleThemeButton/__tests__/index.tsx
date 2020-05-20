import React from 'react';
import { render } from 'test/test-utils';
import user from '@testing-library/user-event';

import { darkTheme, lightTheme } from 'styles/theme';

import ToggleThemeButton from '../index';

test('App loads with dark theme. Button can toggle between light and dark modes', () => {
  const { getByText, store } = render(<ToggleThemeButton />, {});

  expect(store.getState().ui.theme.mode).toEqual(darkTheme.mode);
  user.click(getByText(/light mode/i));

  expect(store.getState().ui.theme.mode).toEqual(lightTheme.mode);
  getByText(/dark mode/i);
});

test('Theme mode is updated in localStorage', () => {
  const { getByText } = render(<ToggleThemeButton />, {});

  // determine what to expect in local storage
  const btn = getByText(/mode$/i, { selector: 'button' });
  const expectedTheme = btn.textContent === 'Dark Mode' ? 'DARK' : 'LIGHT';

  // trigger theme update and check for localStorage data
  user.click(btn);
  let localStorageTheme = localStorage.getItem('theme');
  expect(localStorageTheme).toEqual(expectedTheme);

  // check for change
  user.click(btn);
  localStorageTheme = localStorage.getItem('theme');
  expect(localStorageTheme).toEqual(
    expectedTheme === 'LIGHT' ? 'DARK' : 'LIGHT',
  );
});

test('should match snapshot', () => {
  const { container } = render(<ToggleThemeButton />, {});

  expect(container).toMatchInlineSnapshot(`
    .c0 {
      border: 2px solid hsl(0,0%,100%);
      color: hsl(0,0%,7%);
      background: hsl(0,0%,100%);
      font-size: 16px;
      padding: 0.5rem;
      width: 100%;
      cursor: pointer;
    }

    .c0.btn-delete {
      border-color: hsl(0,70%,64%);
    }

    .c0.btn-delete:hover {
      background: hsl(0,70%,64%);
    }

    .c0:disabled {
      cursor: default;
    }

    .c0:hover {
      background: none;
      color: hsl(0,0%,100%);
    }

    .c0:hover svg path {
      fill: hsl(0,0%,100%);
    }

    <div>
      <button
        class="c0"
      >
        Light
         Mode
      </button>
    </div>
  `);
});
