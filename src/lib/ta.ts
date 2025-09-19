export function sma(src: number[], length: number): number[] {
  const out: number[] = new Array(src.length).fill(NaN);
  if (length <= 0 || src.length === 0) return out;
  let sum = 0;
  for (let i = 0; i < src.length; i++) {
    sum += src[i];
    if (i >= length) sum -= src[i - length];
    if (i >= length - 1) out[i] = sum / length;
  }
  return out;
}

export function ema(src: number[], length: number): number[] {
  const out: number[] = new Array(src.length).fill(NaN);
  if (length <= 0 || src.length === 0) return out;
  const k = 2 / (length + 1);
  let prev = src[0];
  out[0] = prev;
  for (let i = 1; i < src.length; i++) {
    const v = src[i] * k + prev * (1 - k);
    out[i] = v;
    prev = v;
  }
  return out;
}

// Wilder's RSI
export function rsi(src: number[], length: number): number[] {
  const out: number[] = new Array(src.length).fill(NaN);
  if (length <= 0 || src.length === 0) return out;
  let gains = 0;
  let losses = 0;
  for (let i = 1; i <= Math.min(length, src.length - 1); i++) {
    const change = src[i] - src[i - 1];
    if (change >= 0) gains += change; else losses -= change;
  }
  gains /= length;
  losses /= length;
  let rs = losses === 0 ? Infinity : gains / losses;
  if (src.length > length) out[length] = 100 - 100 / (1 + rs);

  for (let i = length + 1; i < src.length; i++) {
    const change = src[i] - src[i - 1];
    const gain = Math.max(change, 0);
    const loss = Math.max(-change, 0);
    gains = (gains * (length - 1) + gain) / length;
    losses = (losses * (length - 1) + loss) / length;
    rs = losses === 0 ? Infinity : gains / losses;
    out[i] = 100 - 100 / (1 + rs);
  }
  return out;
}

export function stddev(src: number[], length: number): number[] {
  const out: number[] = new Array(src.length).fill(NaN);
  if (length <= 0 || src.length === 0) return out;
  const mean = sma(src, length);
  for (let i = 0; i < src.length; i++) {
    if (i < length - 1 || Number.isNaN(mean[i])) continue;
    let sumSq = 0;
    for (let j = i - length + 1; j <= i; j++) {
      const d = src[j] - mean[i];
      sumSq += d * d;
    }
    out[i] = Math.sqrt(sumSq / length);
  }
  return out;
}

export function bb(src: number[], length: number, mult: number): [number[], number[], number[]] {
  const basis = sma(src, length);
  const dev = stddev(src, length);
  const upper = basis.map((b, i) => (Number.isNaN(b) || Number.isNaN(dev[i]) ? NaN : b + mult * dev[i]));
  const lower = basis.map((b, i) => (Number.isNaN(b) || Number.isNaN(dev[i]) ? NaN : b - mult * dev[i]));
  return [basis, upper, lower];
}

export function highest(src: number[], length: number, i: number): number {
  let max = -Infinity;
  for (let j = Math.max(0, i - length + 1); j <= i; j++) max = Math.max(max, src[j]);
  return max;
}
export function lowest(src: number[], length: number, i: number): number {
  let min = Infinity;
  for (let j = Math.max(0, i - length + 1); j <= i; j++) min = Math.min(min, src[j]);
  return min;
}

export function crossover(aPrev: number, aCur: number, bPrev: number, bCur: number): boolean {
  return aPrev <= bPrev && aCur > bCur;
}
export function crossunder(aPrev: number, aCur: number, bPrev: number, bCur: number): boolean {
  return aPrev >= bPrev && aCur < bCur;
}