/**
 * Test Framework
 * ava, jest, mocha
 */

/**
 * expect 工具
 * chai, expect
 */
import { sumOne } from '../sum';

describe('Sum', () => {
  it('sumOne(2) = 2', () => {
    const result: number = sumOne(1);
    expect(result).toEqual(2);
  });
});
