import React from 'react';
import { render } from 'test/test-utils';
import Button from '../index';
// import 'jest-styled-components';

test('renders', () => {
  const { container } = render(<Button />);
  expect(container).toMatchInlineSnapshot(`
    .c0 {
      border: 2px solid hsl(0,0%,100%);
      color: hsl(0,0%,100%);
      background: none;
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
      background: hsl(0,0%,100%);
      color: hsl(0,0%,9%);
    }

    .c0:hover svg path {
      fill: hsl(0,0%,9%);
    }

    <div>
      <button
        class="c0"
      />
    </div>
  `);
});
