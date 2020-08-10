import { test, expect, describe } from '@jest/globals';
import genDiff from '../src/index';
import { readFile } from '../src/parsers';

describe('Generator difference in two files', () => {
  const typeFiles = ['json', 'yml', 'ini'];
  const fixturesDir = '__fixtures__/';

  describe('Format - stylish:', () => {
    test.each(typeFiles)('Load %s files and output differences', (ext) => {
      const filepath1 = `${fixturesDir}file1.${ext}`;
      const filepath2 = `${fixturesDir}file2.${ext}`;
      const expectedResult = readFile(`${fixturesDir}stylishResult.txt`).trimRight();

      expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedResult);
    });
  });

  describe('Format - plain:', () => {
    test.each(typeFiles)('Load %s files and output differences', (ext) => {
      const filepath1 = `${fixturesDir}file1.${ext}`;
      const filepath2 = `${fixturesDir}file2.${ext}`;
      const expectedResult = readFile(`${fixturesDir}plainResult.txt`).trimRight();

      expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedResult);
    });
  });

  describe('Format - json:', () => {
    test.each(typeFiles)('Load %s files and output differences', (ext) => {
      const filepath1 = `${fixturesDir}file1.${ext}`;
      const filepath2 = `${fixturesDir}file2.${ext}`;
      const expectedResult = readFile(`${fixturesDir}jsonResult.txt`).trimRight();

      expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedResult);
    });
  });
});
