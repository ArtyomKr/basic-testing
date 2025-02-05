import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([1])).toStrictEqual({
      value: 1,
      next: { value: null, next: null },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 2])).toMatchInlineSnapshot(`
      {
        "next": {
          "next": {
            "next": null,
            "value": null,
          },
          "value": 2,
        },
        "value": 1,
      }
    `);
  });
});
