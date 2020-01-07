import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import TestButton from './TestButton';

describe('SignInForm', () => {
  // it('My Test Case', () => {
  //   expect(true).toEqual(true);
  // });

  it('snapshot renders', () => {
    const component = renderer.create(<TestButton />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
