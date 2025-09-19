/*
  TypeScript port of the TBO Pine Script indicator
  Source Pine Script © thebettertraders, by kaio (https://github.com/kaiomp)
  License: Mozilla Public License 2.0 (https://mozilla.org/MPL/2.0/)
*/
import { bb, crossover, crossunder, ema, highest, lowest, rsi as rsiCalc, sma } from "./ta";

export type TBOSpeed = "Standard" | "Fast" | "Slow";
export interface TBOInputs {
  speed?: TBOSpeed; // default "Standard"
  confirmBars?: number; // default 1
  supResRsiLen?: number; // default 14
  supResRsiCross?: number; // default 0
  breakoutMethod?: "RSI" | "BB" | "XL"; // default "XL"
  breakoutCounterMax?: number; // default 3
}

export interface TBOOutputBar {
  TBO_Fast: number;
  TBO_Mid_Fast: number;
  TBO_Mid_Slow: number;
  TBO_Slow: number;

  open_long: boolean;
  open_short: boolean;
  close_long: boolean;
  close_short: boolean;

  crossup: boolean;
  crossdown: boolean;

  breakout: boolean;
  breakdown: boolean;

  support: number;
  resistance: number;
}

export interface TBOResult {
  series: TBOOutputBar[];
  last: TBOOutputBar | undefined;
}

function speedPeriods(speed: TBOSpeed | undefined) {
  const s = speed ?? "Standard";
  if (s === "Standard") return { fast: 20, midFast: 40, midSlow: 50, slow: 150 };
  if (s === "Fast") return { fast: 20, midFast: 30, midSlow: 40, slow: 80 };
  return { fast: 20, midFast: 50, midSlow: 100, slow: 200 };
}

export function computeTBO(
  o: number[],
  h: number[],
  l: number[],
  c: number[],
  inputs: TBOInputs = {}
): TBOResult {
  const n = c.length;
  if (n === 0) return { series: [], last: undefined };

  const {
    speed = "Standard",
    confirmBars = 1,
    supResRsiLen = 14,
    supResRsiCross = 0,
    breakoutMethod = "XL",
    breakoutCounterMax = 3
  } = inputs;

  const periods = speedPeriods(speed);

  const TBO_Fast = ema(c, periods.fast);
  const TBO_Mid_Fast = ema(c, periods.midFast);
  const TBO_Mid_Slow = sma(c, periods.midSlow);
  const TBO_Slow = sma(c, periods.slow);

  const RSI_supNres = rsiCalc(c, supResRsiLen);
  const [BB_middle, BB_upper, BB_lower] = bb(c, 20, 2);
  const RSI_break = rsiCalc(c, 14);

  const series: TBOOutputBar[] = new Array(n);
  let fast_trend = 0;
  let mid_trend = 0;

  let buy_count = 0;
  let sell_count = 0;

  let lastSupportIndex: number | null = null;
  let lastResistanceIndex: number | null = null;

  let breakout_counter = 0;
  let breakdown_counter = 0;

  for (let i = 0; i < n; i++) {
    const prev = Math.max(0, i - 1);

    const open_long_raw =
      i > 0 && crossover(TBO_Fast[prev], TBO_Fast[i], TBO_Mid_Fast[prev], TBO_Mid_Fast[i]);
    const open_short_raw =
      i > 0 && crossunder(TBO_Fast[prev], TBO_Fast[i], TBO_Mid_Fast[prev], TBO_Mid_Fast[i]);

    const crossup =
      i > 0 && crossover(TBO_Mid_Fast[prev], TBO_Mid_Fast[i], TBO_Mid_Slow[prev], TBO_Mid_Slow[i]);
    const crossdown =
      i > 0 && crossunder(TBO_Mid_Fast[prev], TBO_Mid_Fast[i], TBO_Mid_Slow[prev], TBO_Mid_Slow[i]);

    if (open_long_raw) fast_trend = 1;
    else if (open_short_raw) fast_trend = -1;

    if (crossup) mid_trend = 1;
    else if (crossdown) mid_trend = -1;

    const close_long =
      i > 0 &&
      crossunder(c[prev], c[i], TBO_Mid_Fast[prev], TBO_Mid_Fast[i]) &&
      fast_trend === 1 &&
      mid_trend === 1 &&
      TBO_Mid_Slow[i] > TBO_Slow[i];

    const close_short =
      i > 0 &&
      crossover(c[prev], c[i], TBO_Mid_Fast[prev], TBO_Mid_Fast[i]) &&
      fast_trend === -1 &&
      mid_trend === -1 &&
      TBO_Mid_Slow[i] < TBO_Slow[i];

    const long_phase = TBO_Fast[i] > TBO_Mid_Fast[i];
    const short_phase = TBO_Fast[i] < TBO_Mid_Fast[i];

    buy_count = long_phase ? (i > 0 ? buy_count : 0) + 1 : 0;
    sell_count = short_phase ? (i > 0 ? sell_count : 0) + 1 : 0;

    const confirmation_buy = buy_count === confirmBars;
    const confirmation_sell = sell_count === confirmBars;

    let open_long = confirmation_buy;
    let open_short = confirmation_sell;

    const rsiCur = RSI_supNres[i];
    const rsiPrev = RSI_supNres[Math.max(0, i - 1)];
    const supLevel = 35 + supResRsiCross;
    const resLevel = 65 - supResRsiCross;

    if (i > 0 && rsiPrev <= supLevel && rsiCur > supLevel) {
      lastSupportIndex = i;
    }
    if (i > 0 && rsiPrev >= resLevel && rsiCur < resLevel) {
      lastResistanceIndex = i;
    }

    const support =
      lastSupportIndex != null ? l[lastSupportIndex] : Number.NaN;
    const resistance =
      lastResistanceIndex != null ? h[lastResistanceIndex] : Number.NaN;

    const limitHighNow = highest(h, 100, i);
    const limitHighPrev = i > 0 ? highest(h, 100, i - 1) : Number.NEGATIVE_INFINITY;
    const inside_up_trend_break = fast_trend === 1 && limitHighNow > limitHighPrev;

    const limitLowNow = lowest(l, 100, i);
    const limitLowPrev = i > 0 ? lowest(l, 100, i - 1) : Number.POSITIVE_INFINITY;
    const inside_dn_trend_break = fast_trend === -1 && limitLowNow < limitLowPrev;

    const breakout_RSI =
      i > 0 && crossover(RSI_break[i - 1], RSI_break[i], 65, 65) && inside_up_trend_break;
    const breakout_BB =
      i > 0 && crossover(c[i - 1], c[i], BB_upper[i - 1], BB_upper[i]) && inside_up_trend_break;

    const mf = TBO_Mid_Fast;
    const maIncreasing = i - 10 >= 0 ? mf[i - 9] > mf[i - 10] : false;
    const breakout_MA =
      maIncreasing && inside_up_trend_break && c[i] > resistance && TBO_Mid_Fast[i] > TBO_Slow[i];

    const breakout_cond =
      breakoutMethod === "RSI" ? !!breakout_RSI :
      breakoutMethod === "BB" ? !!breakout_BB :
      breakoutMethod === "XL" ? !!breakout_MA : false;

    breakout_counter = breakout_cond ? (i > 0 ? breakout_counter : 0) + 1 : (i > 0 ? breakout_counter : 0);
    if (open_short) breakout_counter = 0;
    const breakout = breakout_cond && breakout_counter <= breakoutCounterMax;

    const breakdown_RSI =
      i > 0 && crossunder(RSI_break[i - 1], RSI_break[i], 35, 35) && inside_dn_trend_break;
    const breakdown_BB =
      i > 0 && crossunder(c[i - 1], c[i], BB_lower[i - 1], BB_lower[i]) && inside_dn_trend_break;
    const maDecreasing = i - 10 >= 0 ? mf[i - 9] < mf[i - 10] : false;
    const breakdown_MA =
      maDecreasing && inside_dn_trend_break && c[i] < support && TBO_Mid_Fast[i] < TBO_Slow[i];

    const breakdown_cond =
      breakoutMethod === "RSI" ? !!breakdown_RSI :
      breakoutMethod === "BB" ? !!breakdown_BB :
      breakoutMethod === "XL" ? !!breakdown_MA : false;

    breakdown_counter = breakdown_cond ? (i > 0 ? breakdown_counter : 0) + 1 : (i > 0 ? breakdown_counter : 0);
    if (open_long) breakdown_counter = 0;
    const breakdown = breakdown_cond && breakdown_counter <= breakoutCounterMax;

    series[i] = {
      TBO_Fast: TBO_Fast[i],
      TBO_Mid_Fast: TBO_Mid_Fast[i],
      TBO_Mid_Slow: TBO_Mid_Slow[i],
      TBO_Slow: TBO_Slow[i],

      open_long,
      open_short,
      close_long,
      close_short,

      crossup,
      crossdown,

      breakout,
      breakdown,

      support,
      resistance
    };
  }

  return { series, last: series[n - 1] };
}