import { test, expect } from '@jest/globals';
import genDiff from '../src';

test('parse json', () => {
  expect(genDiff('__fixtures__/before.json', '__fixtures__/after.json'))
    .toEqual(`
{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`);
});
