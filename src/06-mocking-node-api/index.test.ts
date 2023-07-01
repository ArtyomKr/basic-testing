import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import promises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const mockCallback = jest.fn();
    const timeout = 30;

    doStuffByTimeout(mockCallback, timeout);
    expect(setTimeout).toBeCalledWith(mockCallback, timeout);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    const timeout = 30;

    doStuffByTimeout(mockCallback, timeout);
    expect(mockCallback).not.toBeCalled();
    jest.runAllTimers();
    expect(mockCallback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const mockCallback = jest.fn();
    const interval = 30;

    doStuffByInterval(mockCallback, interval);
    expect(setInterval).toBeCalledWith(mockCallback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const mockCallback = jest.fn();
    const interval = 30;
    const callTimes = 3;

    doStuffByInterval(mockCallback, interval);
    expect(mockCallback).not.toBeCalled();
    jest.advanceTimersByTime(interval * callTimes);
    expect(mockCallback).toBeCalledTimes(callTimes);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockPath = '/path/to/file';
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(mockPath);

    expect(joinSpy).toHaveBeenCalledWith(expect.anything(), mockPath);
  });

  test('should return null if file does not exist', async () => {
    const mockPath = '/path/to/file';
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

    const file = await readFileAsynchronously(mockPath);
    expect(existsSyncSpy).toReturnWith(false);
    expect(file).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockPath = '/path/to/file';
    const mockFile = 'Some text';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(promises, 'readFile').mockResolvedValue(mockFile);

    const file = await readFileAsynchronously(mockPath);
    expect(file).toBe(mockFile);
  });
});
