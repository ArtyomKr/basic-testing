import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const a = 1,
      b = 2;
    expect(simpleCalculator({ a, b, action: Action.Add })).toBe(a + b);
  });

  test('should subtract two numbers', () => {
    const a = 1,
      b = 2;
    expect(simpleCalculator({ a, b, action: Action.Subtract })).toBe(a - b);
  });

  test('should multiply two numbers', () => {
    const a = 1,
      b = 2;
    expect(simpleCalculator({ a, b, action: Action.Multiply })).toBe(a * b);
  });

  test('should divide two numbers', () => {
    const a = 1,
      b = 2;
    expect(simpleCalculator({ a, b, action: Action.Divide })).toBe(a / b);
  });

  test('should exponentiate two numbers', () => {
    const a = 1,
      b = 2;
    expect(simpleCalculator({ a, b, action: Action.Exponentiate })).toBe(
      a ** b,
    );
  });

  test('should return null for invalid action', () => {
    const a = 1,
      b = 2;
    expect(simpleCalculator({ a, b, action: undefined })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const a = null,
      b = undefined;
    expect(simpleCalculator({ a, b, action: Action.Add })).toBeNull();
  });
});
