create or replace view public.v_tbo_latest as
select distinct on (symbol, timeframe, speed)
  symbol, timeframe, speed, ts, open, high, low, close, volume, exchange, inserted_at, updated_at
from public.tbo_bars
order by symbol, timeframe, speed, ts desc;
