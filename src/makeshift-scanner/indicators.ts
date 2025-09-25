// Small set of light-weight indicator helpers for the scanner.
// Windows chosen:
// - fast: 5
// - mid_fast: 10
// - mid_slow: 20
// - slow: 50
// - support/resistance window: 50
//
// Each function returns null when there is insufficient data.
// Basic NaN/Infinity handling is included.

export function sma(closes: number[], period: number): number | null {
  if (!Array.isArray(closes) || period <= 0) return null;
  const n = closes.length;
  if (n < period) return null;
  let sum = 0;
  for (let i = n - period; i < n; i++) {
    const v = Number(closes[i]);
    if (!Number.isFinite(v)) return null;
    sum += v;
  }
  const avg = sum / period;
  return Number.isFinite(avg) ? avg : null;
}

export function minLast(closes: number[], period: number): number | null {
  if (!Array.isArray(closes) || period <= 0) return null;
  const n = closes.length;
  if (n < period) return null;
  let m = Infinity;
  for (let i = n - period; i < n; i++) {
    const v = Number(closes[i]);
    if (!Number.isFinite(v)) return null;
    if (v < m) m = v;
  }
  return m === Infinity ? null : m;
}

export function maxLast(closes: number[], period: number): number | null {
  if (!Array.isArray(closes) || period <= 0) return null;
  const n = closes.length;
  if (n < period) return null;
  let x = -Infinity;
  for (let i = n - period; i < n; i++) {
    const v = Number(closes[i]);
    if (!Number.isFinite(v)) return null;
    if (v > x) x = v;
  }
  return x === -Infinity ? null : x;
}

// Compute the TBO-style indicators for a given index in a closes array.
// index is the index of the bar we are computing for (0-based).
export function computeIndicators(closes: number[], index: number) {
  // Defensive: only use data up to index (inclusive)
  if (!Array.isArray(closes) || index < 0 || index >= closes.length) {
    return {
      tbo_fast: null,
      tbo_mid_fast: null,
      tbo_mid_slow: null,
      tbo_slow: null,
      support: null,
      resistance: null,
    };
  }

  // Build slice of closes up to index inclusive
  const upto = closes.slice(0, index + 1);

  // helper to compute sma on the "last N values up to index"
  const smaAt = (arr: number[], period: number) => {
    if (arr.length < period) return null;
    let sum = 0;
    for (let i = arr.length - period; i < arr.length; i++) {
      const v = Number(arr[i]);
      if (!Number.isFinite(v)) return null;
      sum += v;
    }
    const avg = sum / period;
    return Number.isFinite(avg) ? avg : null;
  };

  const fast = smaAt(upto, 5);       // 5-period fast
  const midFast = smaAt(upto, 10);   // 10-period mid_fast
  const midSlow = smaAt(upto, 20);   // 20-period mid_slow
  const slow = smaAt(upto, 50);      // 50-period slow

  // support/resistance over last 50 closes (same window as slow)
  const support = upto.length >= 50 ? minLast(upto, 50) : null;
  const resistance = upto.length >= 50 ? maxLast(upto, 50) : null;

  return {
    tbo_fast: fast,
    tbo_mid_fast: midFast,
    tbo_mid_slow: midSlow,
    tbo_slow: slow,
    support,
    resistance,
  };
}