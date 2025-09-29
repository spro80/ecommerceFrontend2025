import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { twoSum } from './solution.js';

describe('twoSum', () => {
  it('example 1', () => {
    assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
  });

  it('example 2', () => {
    assert.deepEqual(twoSum([3, 2, 4], 6), [1, 2]);
  });

  it('example 3', () => {
    assert.deepEqual(twoSum([3, 3], 6), [0, 1]);
  });
});
