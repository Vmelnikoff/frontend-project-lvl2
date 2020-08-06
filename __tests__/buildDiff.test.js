import { test, expect, describe } from '@jest/globals';
import buildDiff from '../src/buildDiff';

const expected = [{
  key: 'common',
  value: [{
    key: 'setting1',
    value: 'Value 1',
    type: 'unchanged',
  }, {
    key: 'setting2',
    value: 200,
    type: 'removed',
  }, {
    key: 'setting3',
    value: {
      oldValue: true,
      newValue: { key: 'value' },
    },
    type: 'changed',
  }, {
    key: 'setting6',
    value: [{
      key: 'key',
      value: 'value',
      type: 'unchanged',
    }, {
      key: 'ops',
      value: 'vops',
      type: 'added',
    }],
    type: 'nested',
  }, {
    key: 'follow',
    value: false,
    type: 'added',
  }, {
    key: 'setting4',
    value: 'blah blah',
    type: 'added',
  }, {
    key: 'setting5',
    value: { key5: 'value5' },
    type: 'added',
  }],
  type: 'nested',
}, {
  key: 'group1',
  value: [{
    key: 'baz',
    value: {
      oldValue: 'bas',
      newValue: 'bars',
    },
    type: 'changed',
  }, {
    key: 'foo',
    value: 'bar',
    type: 'unchanged',
  }, {
    key: 'nest',
    value: {
      oldValue: { key: 'value' },
      newValue: 'str',
    },
    type: 'changed',
  }],
  type: 'nested',
}, {
  key: 'group2',
  value: { abc: 12345 },
  type: 'removed',
}, {
  key: 'group3',
  value: { fee: 100500 },
  type: 'added',
}];
const json1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
  },
};
const json2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: {
      key: 'value',
    },
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
    },
  },

  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },

  group3: {
    fee: 100500,
  },
};

describe('Build diff function', () => {
  test('Load two files and build diff', () => {
    expect(buildDiff(json1, json2)).toEqual(expected);
  });
});
