"use client";

import { useState, useEffect } from "react";
import { config } from "../config";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["#sala", "A sala"],
    ["#semana", "A semana"],
    ["#cursos", "Cursos"],
    ["#historia", "Minha história"],
    ["#depoimentos", "Alunos"],
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <a href="#top" className="nav-brand">
            <b>Rafael Fossalussa</b>
            <small>Trader · Educador</small>
          </a>
          <div className="nav-links">
            {links.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <a href={config.produtos.sala.url} target="_blank" rel="noopener noreferrer" className="nav-cta">
              Entrar na sala
            </a>
            <button
              className={`nav-ham ${open ? "open" : ""}`}
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <div className={`drawer ${open ? "open" : ""}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          href={config.produtos.sala.url}
          target="_blank"
          rel="noopener noreferrer"
          className="drawer-cta"
          onClick={() => setOpen(false)}
        >
          Entrar na sala
        </a>
      </div>
    </>
  );
}
