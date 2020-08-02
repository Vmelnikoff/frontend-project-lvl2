import { test, expect, describe } from '@jest/globals';
import parsers, { readFile } from '../src/parsers';

describe('Parser module for stylish format', () => {
  const expectedResult = readFile('__fixtures__/stylishResult.txt').trimRight();
  const cases = [
    ['json', '__fixtures__/file1.json', '__fixtures__/file2.json', expectedResult],
  ];

  test.each(cases)('Compare two nested %s files and output differences in stylish format',
    (desc, filepath1, filepath2, expected) => {
      expect(parsers(filepath1, filepath2, 'stylish'))
        .toEqual(expected);
    });
});

describe('Parser module for plain format', () => {
  const expectedResult = readFile('__fixtures__/plainResult.txt').trimRight();
  const cases = [
    ['json', '__fixtures__/file1.json', '__fixtures__/file2.json', expectedResult],
  ];

  test.each(cases)('Compare two nested %s files and output differences in plain format',
    (desc, filepath1, filepath2, expected) => {
      expect(parsers(filepath1, filepath2, 'plain'))
        .toEqual(expected);
    });
});

describe('Parser module for json format', () => {
  const expectedResult = readFile('__fixtures__/jsonResult.json').trimRight();
  const cases = [
    ['json', '__fixtures__/file1.json', '__fixtures__/file2.json', expectedResult],
  ];

  test.each(cases)('Compare two nested %s files and output differences in json format',
    (desc, filepath1, filepath2, expected) => {
      expect(parsers(filepath1, filepath2, 'json'))
        .toEqual(expected);
    });
});
