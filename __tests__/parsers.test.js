import { test, expect, describe } from '@jest/globals';
import parsers, { readFile } from '../src/parsers';

describe('Parser module for plain objects', () => {
  const expectedPlainResult = readFile('__fixtures__/plainResult.txt').trimRight();
  const plainCases = [
    ['json', '__fixtures__/before.json', '__fixtures__/after.json', expectedPlainResult],
    ['yaml', '__fixtures__/before.yml', '__fixtures__/after.yml', expectedPlainResult],
    ['ini', '__fixtures__/before.ini', '__fixtures__/after.ini', expectedPlainResult],
  ];

  test.each(plainCases)('Compare two %s files and output differences',
    (desc, filepath1, filepath2, expected) => {
      expect(parsers(filepath1, filepath2)).toEqual(expected);
    });
});

describe('Parser module for nested objects', () => {
  const expectedNestedResult = readFile('__fixtures__/nestedResult.txt').trimRight();
  const nestedCases = [
    ['json', '__fixtures__/file1.json', '__fixtures__/file2.json', expectedNestedResult],
  ];

  test.each(nestedCases)('Compare two %s files and output differences',
    (desc, filepath1, filepath2, expected) => {
      expect(parsers(filepath1, filepath2)).toEqual(expected);
    });
});
