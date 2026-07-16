"use client";

import { useEffect, useRef } from "react";
import { config } from "../config";

// Fundo animado: candles suaves em esmeralda, deslizando devagar (Velovis vibe)
function useCandleCanvas(ref) {
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    let W, H, candles = [], off = 0, raf = 0;

    const rnd = (a, b) => a + Math.random() * (b - a);
    function build() {
      candles = [];
      let p = 100;
      for (let i = 0; i < 320; i++) {
        const d = rnd(-3.2, 3.8);
        const o = p;
        p += d;
        candles.push({ o, c: p, hi: Math.max(o, p) + rnd(0, 2.4), lo: Math.min(o, p) - rnd(0, 2.4) });
      }
    }
    function resize() {
      W = cv.width = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
      build();
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const cw = 15, step = 19;
      const vals = candles.flatMap((c) => [c.hi, c.lo]);
      const mn = Math.min(...vals), mx = Math.max(...vals), pad = H * 0.22;
      const y = (v) => H - pad - ((v - mn) / (mx - mn)) * (H - pad * 2);
      const start = Math.floor(off / step), dx = -(off % step);
      for (let i = start; i < candles.length; i++) {
        const x = dx + (i - start) * step;
        if (x > W + cw) break;
        const { o, c, hi, lo } = candles[i], bull = c >= o;
        const col = bull ? "rgba(16,185,129,0.5)" : "rgba(242,109,109,0.4)";
        ctx.strokeStyle = col;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + cw / 2, y(hi));
        ctx.lineTo(x + cw / 2, y(lo));
        ctx.stroke();
        const top = y(Math.max(o, c)), h = Math.max(1, Math.abs(y(o) - y(c)));
        ctx.fillStyle = bull ? "rgba(16,185,129,0.14)" : "rgba(242,109,109,0.1)";
        ctx.fillRect(x, top, cw, h);
        ctx.strokeRect(x, top, cw, h);
      }
      off += 0.4;
      if (off > 150 * step) off = 0;
      raf = requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [ref]);
}

export default function Hero() {
  const canvasRef = useRef(null);
  useCandleCanvas(canvasRef);

  return (
    <section className="hero" id="top">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-pill">
            <span className="hero-dot" /> Sala ao vivo
          </div>
          <h1>
            <span className="ln1">De vendedor de verdura</span>
            <br />
            <span className="ln2">a trader profissional.</span>
          </h1>
          <p className="hero-sub">
            Eu comecei na Ceagesp, carregando caixote. Hoje eu opero <strong>ao vivo todo dia</strong> —
            índice, dólar e o mercado lá fora (Nasdaq, ouro, Bitcoin) — e mostro, na prática, como
            leio o gráfico com <strong>método e disciplina</strong>.
          </p>
          <div className="hero-btns">
            <a href={config.produtos.sala.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Entrar na Sala Rafael Fossalussa
            </a>
            <a href="#cursos" className="btn btn-ghost">
              Conhecer os cursos
            </a>
          </div>
          <div className="hero-proof">
            <b>{config.tradersFormados}</b> traders já passaram pelas minhas mãos
          </div>
        </div>
        <div className="hero-photo">
          {/* Foto recortada do Rafael (PNG fundo transparente) */}
          <img src="/rafael-hero.png" alt="Rafael Fossalussa" />
        </div>
      </div>
    </section>
  );
}
