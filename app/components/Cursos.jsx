import { config } from "../config";
import { ArrowUpRight } from "lucide-react";

function getCursoImage(slug) {
  const candidates = [
    `/cursos/${slug}.webp`,
    `/cursos/${slug}.png`,
    `/cursos/${slug}.jpg`,
    `/cursos/${slug}.jpeg`,
  ];

  return candidates;
}

export default function Cursos() {
  const { scalp, leilao, gl2 } = config.produtos;
  const cursos = [
    { ...scalp, tag: "Entrada", slug: "scalp" },
    { ...leilao, tag: "Entrada", slug: "leilao" },
    { ...gl2, tag: "Método completo", slug: "linear" },
  ];

  return (
    <section className="section" id="cursos">
      <div className="wrap">
        <div className="cursos-head reveal">
          <div>
            <span className="eyebrow">Os cursos</span>
            <h2 className="h2">Comece pelo que faz sentido pra você</h2>
          </div>
          <p className="lead" style={{ marginTop: 0 }}>
            Conteúdo gravado, no seu ritmo. Dá pra começar por um curso e subir pra sala — ou já entrar
            na sala e usar os cursos como base.
          </p>
        </div>

        <div className="cursos-grid">
          {cursos.map((c) => {
            const emBreve = c.url === "#";
            return (
              <article className="curso reveal" key={c.nome}>
                <div style={{ marginBottom: 14, borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)" }}>
                  <img
                    src={getCursoImage(c.slug)[0]}
                    alt={c.nome}
                    style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
                  />
                </div>
                <span className="curso-tag">{c.tag}</span>
                <h3>{c.nome}</h3>
                <p>{c.desc}</p>
                <div className="curso-price">{c.preco}</div>
                <a
                  href={c.url}
                  target={emBreve ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="curso-btn"
                  aria-disabled={emBreve}
                >
                  {emBreve ? "Em breve" : "Ver o curso"} <ArrowUpRight size={16} />
                </a>
                {emBreve && <p className="curso-soon">Link em atualização — volte já já.</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
