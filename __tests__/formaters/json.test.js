import { test, expect, describe } from '@jest/globals';
import parsers, { readFile } from '../../src/parsers';

const iniExpected = '\n[{"key":"common","value":[{"key":"setting1","value":"Value 1","type":"unchanged"},{"key":"setting2","value":"200","type":"removed"},{"key":"setting3","value":{"oldValue":true,"newValue":{"key":"value"}},"type":"changed"},{"key":"setting6","value":[{"key":"key","value":"value","type":"unchanged"},{"key":"ops","value":"vops","type":"added"}],"type":"nested"},{"key":"follow","value":false,"type":"added"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"}],"type":"nested"},{"key":"group1","value":[{"key":"baz","value":{"oldValue":"bas","newValue":"bars"},"type":"changed"},{"key":"foo","value":"bar","type":"unchanged"},{"key":"nest","value":{"oldValue":{"key":"value"},"newValue":"str"},"type":"changed"}],"type":"nested"},{"key":"group2","value":{"abc":"12345"},"type":"removed"},{"key":"group3","value":{"fee":"100500"},"type":"added"}]';

describe('Parser module for json format', () => {
  const expectedResult = readFile('__fixtures__/jsonResult.json').trimRight();
  const cases = [
    ['json', '__fixtures__/file1.json', '__fixtures__/file2.json', expectedResult],
    ['yaml', '__fixtures__/file1.yml', '__fixtures__/file2.yml', expectedResult],
    ['ini', '__fixtures__/file1.ini', '__fixtures__/file2.ini', iniExpected],
  ];

  test.each(cases)('Compare two nested %s files and output differences in json format',
    (desc, filepath1, filepath2, expected) => {
      expect(parsers(filepath1, filepath2, 'json'))
        .toEqual(expected);
    });
});
