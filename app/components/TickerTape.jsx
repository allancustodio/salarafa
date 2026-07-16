"use client";

import { useEffect, useRef } from "react";

// Fita de cotações (TradingView). Foca no que o Rafael acompanha:
// índice (IBOV), dólar, e o mercado global — Nasdaq, ouro, Bitcoin, S&P.
export default function TickerTape() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    el.appendChild(widget);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "INDEX:IBOV", title: "Ibovespa" },
        { proName: "FX_IDC:USDBRL", title: "Dólar" },
        { proName: "FOREXCOM:NSXUSD", title: "Nasdaq" },
        { proName: "TVC:GOLD", title: "Ouro" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "br",
    });
    el.appendChild(script);

    return () => {
      el.innerHTML = "";
    };
  }, []);

  return (
    <div className="ticker">
      <div className="tradingview-widget-container wrap" ref={ref} />
    </div>
  );
}
