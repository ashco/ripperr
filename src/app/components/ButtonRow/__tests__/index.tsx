import React from 'react';
import { render } from 'test/test-utils';
import ButtonRow from 'components/ButtonRow';

test('renders', () => {
  const btnConfig = {
    cancelBtn: {
      onClick: () => console.log('this works'),
      text: '',
    },
    actionBtn: {
      text: '',
    },
  };

  render(<ButtonRow config={btnConfig} />);
});
