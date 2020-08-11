import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

describe.each(['stylish', 'plain', 'json'])('Generator difference in two files', (format) => {
  const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  const expected = readFile(`${format}Result.txt`).trimRight();

  describe(`Format - ${format}:`, () => {
    test.each(['json', 'yml', 'ini'])('Load %s files and output differences', (ext) => {
      const filepath1 = getFixturePath(`file1.${ext}`);
      const filepath2 = getFixturePath(`file2.${ext}`);
      expect(genDiff(filepath1, filepath2, format)).toEqual(expected);
    });
  });
});
