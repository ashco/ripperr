import React from 'react';
import renderer from 'react-test-renderer';
import SignInForm from './SignInForm';

describe('Counter', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<SignInForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('My Test Suite', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });
});
