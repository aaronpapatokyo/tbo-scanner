import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function KlineTable() {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKlines() {
      setLoading(true);
      const { data, error } = await supabase
        .from('tbo_bars')
        .select('*')
        .order('ts', { ascending: false })
        .limit(100);
      if (error) {
        console.error(error);
      } else {
        setBars(data);
      }
      setLoading(false);
    }
    fetchKlines();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Kline Data (tbo_bars)</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Symbol</th>
                <th>Timeframe</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {bars && bars.map(bar => (
                <tr key={bar.ts + bar.symbol + bar.timeframe}>
                  <td>{bar.ts}</td>
                  <td>{bar.symbol}</td>
                  <td>{bar.timeframe}</td>
                  <td>{bar.open}</td>
                  <td>{bar.high}</td>
                  <td>{bar.low}</td>
                  <td>{bar.close}</td>
                  <td>{bar.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default KlineTable;