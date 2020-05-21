import React from 'react';
import { render } from '@testing-library/react';

import Icon from '../index';

test('Icon should render with a title that acts as a label.', () => {
  const { findByLabelText } = render(<Icon name="times" title="title text" />);

  expect(findByLabelText(/title text/i));
});

test('Icon should render, but be hidden via aria because no title has been provided', () => {
  const { queryByRole, getAllByRole } = render(<Icon name="times" />);

  expect(queryByRole('img')).not.toBeTruthy();
  expect(getAllByRole('img', { hidden: true })[0]).toBeVisible();
});

test('Should match snapshot', () => {
  const { container } = render(<Icon name="times" title="title text" />);

  expect(container).toMatchInlineSnapshot(`
    <div>
      <svg
        aria-describedby="title desc"
        aria-hidden="false"
        class="svg-icon "
        height="100%"
        role="img"
        viewBox="0 0 448 512"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <title
          data-testid="icon-title"
          id="title"
        >
          title text
        </title>
        <path
          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          fill="#000"
        />
      </svg>
    </div>
  `);
});
