"use client";

import { useEffect, useRef } from "react";

// Painel de mercado ao vivo — o "lá fora" que a sala acompanha.
export default function MarketOverview() {
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
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      dateRange: "1D",
      locale: "br",
      isTransparent: true,
      showFloatingTooltip: true,
      width: "100%",
      height: "100%",
      showSymbolLogo: true,
      showChart: true,
      plotLineColorGrowing: "rgba(16,185,129,1)",
      plotLineColorFalling: "rgba(242,109,109,1)",
      gridLineColor: "rgba(240,243,250,0)",
      scaleFontColor: "#B7C6BF",
      belowLineFillColorGrowing: "rgba(16,185,129,0.12)",
      belowLineFillColorFalling: "rgba(242,109,109,0.12)",
      belowLineFillColorGrowingBottom: "rgba(16,185,129,0)",
      belowLineFillColorFallingBottom: "rgba(242,109,109,0)",
      symbolActiveColor: "rgba(16,185,129,0.12)",
      tabs: [
        {
          title: "Mercado",
          symbols: [
            { s: "INDEX:IBOV", d: "Ibovespa" },
            { s: "FX_IDC:USDBRL", d: "Dólar" },
            { s: "FOREXCOM:NSXUSD", d: "Nasdaq" },
            { s: "TVC:GOLD", d: "Ouro" },
            { s: "BITSTAMP:BTCUSD", d: "Bitcoin" },
            { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
          ],
        },
      ],
    });
    el.appendChild(script);

    return () => {
      el.innerHTML = "";
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={ref}
      style={{ height: "100%", width: "100%" }}
    />
  );
}
