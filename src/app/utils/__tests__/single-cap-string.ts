import singleCapString from '../single-cap-string';

test('will return a string with 1 capital letter at the front', () => {
  expect(singleCapString('This will Do VERY well.')).toBe(
    'This will do very well.',
  );
});
