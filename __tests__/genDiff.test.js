import { test, expect, describe } from '@jest/globals';
import genDiff from '../src/index';
import { readFile } from '../src/parsers';

describe.each(['stylish', 'plain', 'json'])('Generator difference in two files', (format) => {
  const fixturesDir = '__fixtures__/';

  describe(`Format - ${format}:`, () => {
    test.each(['json', 'yml', 'ini'])('Load %s files and output differences', (ext) => {
      const filepath1 = `${fixturesDir}file1.${ext}`;
      const filepath2 = `${fixturesDir}file2.${ext}`;
      const expectedResult = readFile(`${fixturesDir}${format}Result.txt`).trimRight();

      expect(genDiff(filepath1, filepath2, format)).toEqual(expectedResult);
    });
  });
});
