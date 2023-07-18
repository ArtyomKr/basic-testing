import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  const mocked = Object.keys(originalModule).reduce(
    (pre: { [key: string]: unknown }, methodName) => {
      pre[methodName] = jest.fn();
      return pre;
    },
    {},
  );
  return {
    ...mocked,
    unmockedFunction: originalModule.unmockedFunction,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleSpy).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
