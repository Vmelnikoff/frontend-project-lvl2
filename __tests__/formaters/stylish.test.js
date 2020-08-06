import { test, expect, describe } from '@jest/globals';
import parsers, { readFile } from '../../src/parsers';

describe('Parser module for stylish format', () => {
  const expectedResult = readFile('__fixtures__/stylishResult.txt').trimRight();
  const cases = [
    ['json', '__fixtures__/file1.json', '__fixtures__/file2.json', expectedResult],
    ['yaml', '__fixtures__/file1.yml', '__fixtures__/file2.yml', expectedResult],
    ['ini', '__fixtures__/file1.ini', '__fixtures__/file2.ini', expectedResult],
  ];

  test.each(cases)('Compare two nested %s files and output differences in stylish format',
    (desc, filepath1, filepath2, expected) => {
      expect(parsers(filepath1, filepath2, 'stylish'))
        .toEqual(expected);
    });
});
