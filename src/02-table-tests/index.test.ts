import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 7, b: 2, action: Action.Subtract, expected: 5 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 8, b: 2, action: Action.Divide, expected: 4 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 8, b: 2, action: Action.Divide, expected: 4 },
    { a: null, b: 1, action: Action.Add, expected: null },  
    { a: 8, b: 1, action: undefined, expected: null }, 
];

describe('simpleCalculator', () => {
  test.each(testCases)('Expect simpleCalculator({ $a, $b, action: "$action"}) to equal $expected', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
