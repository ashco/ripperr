import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import SignInForm from '../SignInForm';

describe('SignInForm', () => {
  // it('My Test Case', () => {
  //   expect(true).toEqual(true);
  // });

  it('snapshot renders', () => {
    const component = renderer.create(<SignInForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows sign in button', () => {
    const wrapper = mount(<SignInForm />);
    expect(wrapper.find('button').text()).toEqual('Sign In');
  });
});
