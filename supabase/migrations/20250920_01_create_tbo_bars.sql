create table if not exists public.tbo_bars (
  symbol      text            not null,
  timeframe   text            not null,
  speed       text            not null default 'Standard',
  ts          timestamptz     not null,
  open        double precision not null,
  high        double precision not null,
  low         double precision not null,
  close       double precision not null,
  volume      double precision,
  exchange    text            not null default 'binance',
  inserted_at timestamptz     not null default now(),
  updated_at  timestamptz     not null default now(),
  constraint tbo_bars_pk primary key (symbol, timeframe, speed, ts)
);
create index if not exists tbo_bars_symbol_tf_speed_ts_idx
  on public.tbo_bars (symbol, timeframe, speed, ts desc);
