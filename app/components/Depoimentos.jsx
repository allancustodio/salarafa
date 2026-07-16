"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Recebe a lista de arquivos (lida no servidor a partir de public/depoimentos/).
export default function Depoimentos({ files }) {
  const [idx, setIdx] = useState(-1);
  const open = idx >= 0;

  const close = useCallback(() => setIdx(-1), []);
  const nav = useCallback(
    (dir) => setIdx((i) => (i + dir + files.length) % files.length),
    [files.length]
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") nav(-1);
      if (e.key === "ArrowRight") nav(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, nav]);

  return (
    <section className="section" id="depoimentos">
      <div className="wrap">
        <div className="reveal" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <span className="eyebrow">Quem já está comigo</span>
          <h2 className="h2">O que os alunos falam</h2>
          <p className="lead" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Prints reais de quem estuda junto todo dia. Sem roteiro, sem ator.
          </p>
        </div>

        {files.length === 0 ? (
          <div className="depo-grid">
            <div className="depo-empty">
              Ainda não há depoimentos aqui. Para publicar, é só soltar as imagens (print do WhatsApp,
              foto, etc.) na pasta <code>/public/depoimentos/</code> — elas aparecem sozinhas neste
              espaço, sem mexer em código.
            </div>
          </div>
        ) : (
          <div className="depo-grid">
            {files.map((f, i) => (
              <button key={f} className="depo" onClick={() => setIdx(i)}>
                <img src={`/depoimentos/${f}`} alt={`Depoimento ${i + 1}`} loading="lazy" />
                <span className="depo-hint">ampliar</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={`lb ${open ? "open" : ""}`} onClick={close}>
        {open && (
          <>
            <button className="lb-btn lb-close" onClick={close} aria-label="Fechar">
              <X size={20} />
            </button>
            {files.length > 1 && (
              <>
                <button
                  className="lb-btn lb-prev"
                  onClick={(e) => { e.stopPropagation(); nav(-1); }}
                  aria-label="Anterior"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  className="lb-btn lb-next"
                  onClick={(e) => { e.stopPropagation(); nav(1); }}
                  aria-label="Próxima"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <img
              src={`/depoimentos/${files[idx]}`}
              alt={`Depoimento ${idx + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
          </>
        )}
      </div>
    </section>
  );
}
