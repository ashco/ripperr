import React from 'react';
import { render } from 'test/test-utils';
import Button from '../index';
// import 'jest-styled-components';

test('renders', () => {
  const { container } = render(<Button />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        class="sc-bdVaJa fEjHSj"
      />
    </div>
  `);
});
