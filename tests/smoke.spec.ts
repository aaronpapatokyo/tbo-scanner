import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('works', () => {
    expect(1 + 1).toBe(2);
  });

  it.skip('computes TBO over fixture OHLCV', async () => {
    // TODO: import computeTBO and assert shape
  });
});
