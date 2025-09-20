-- TBO Scanner database schema
-- Table for storing TBO indicator data with OHLCV and computed signals

CREATE TABLE IF NOT EXISTS public.tbo_bars (
  symbol text NOT NULL,
  timeframe text NOT NULL,
  ts timestamp with time zone NOT NULL,
  speed text NOT NULL,
  open numeric NOT NULL,
  high numeric NOT NULL,
  low numeric NOT NULL,
  close numeric NOT NULL,
  volume numeric NOT NULL,
  
  -- TBO indicator lines
  tbo_fast numeric NOT NULL,
  tbo_mid_fast numeric NOT NULL,
  tbo_mid_slow numeric NOT NULL,
  tbo_slow numeric NOT NULL,
  
  -- TBO signals
  open_long boolean NOT NULL DEFAULT false,
  open_short boolean NOT NULL DEFAULT false,
  close_long boolean NOT NULL DEFAULT false,
  close_short boolean NOT NULL DEFAULT false,
  crossup boolean NOT NULL DEFAULT false,
  crossdown boolean NOT NULL DEFAULT false,
  breakout boolean NOT NULL DEFAULT false,
  breakdown boolean NOT NULL DEFAULT false,
  
  -- Support/Resistance levels
  support numeric,
  resistance numeric,
  
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  -- Composite primary key
  CONSTRAINT tbo_bars_pkey PRIMARY KEY (symbol, timeframe, ts, speed)
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_tbo_bars_symbol_timeframe ON public.tbo_bars (symbol, timeframe);
CREATE INDEX IF NOT EXISTS idx_tbo_bars_ts ON public.tbo_bars (ts DESC);
CREATE INDEX IF NOT EXISTS idx_tbo_bars_speed ON public.tbo_bars (speed);
CREATE INDEX IF NOT EXISTS idx_tbo_bars_signals ON public.tbo_bars (symbol, timeframe, speed) 
  WHERE open_long OR open_short OR close_long OR close_short OR crossup OR crossdown OR breakout OR breakdown;

-- Enable Row Level Security (RLS)
ALTER TABLE public.tbo_bars ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (adjust as needed for your security requirements)
CREATE POLICY "Public read access" ON public.tbo_bars
  FOR SELECT USING (true);

-- Create policy for service role write access
CREATE POLICY "Service role write access" ON public.tbo_bars
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Update function for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_tbo_bars_updated_at 
  BEFORE UPDATE ON public.tbo_bars 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();