import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: <T>(fn: T) => fn,
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const dummyData = 'dummyData';

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: dummyData });

    mockedAxios.create.mockReturnValue({
      get: mockedAxios.get,
    } as unknown as AxiosInstance);
  });

  afterAll(() => {
    jest.unmock('axios');
    jest.unmock('lodash');
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    await throttledGetDataFromApi('');
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({ baseURL }),
    );
  });

  test('should perform request to correct provided url', async () => {
    const testUrl = '/test';
    await throttledGetDataFromApi(testUrl);
    expect(mockedAxios.get).toHaveBeenCalledWith(testUrl);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi('');
    expect(response).toBe(dummyData);
  });
});
