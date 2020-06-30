import { test, expect, describe } from '@jest/globals';
import parsers from '../src/parsers';

const expectedResult = `
{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

const cases = [
  ['json', '__fixtures__/before.json', '__fixtures__/after.json', expectedResult],
  ['yaml', '__fixtures__/before.yml', '__fixtures__/after.yml', expectedResult],
  ['ini', '__fixtures__/before.ini', '__fixtures__/after.ini', expectedResult],
];

describe('parsers module', () => {
  test.each(cases)('%s parser', (desc, filepath1, filepath2, expected) => {
    expect(parsers(filepath1, filepath2)).toEqual(expected);
  });
});
