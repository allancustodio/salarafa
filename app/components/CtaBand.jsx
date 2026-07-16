import { config } from "../config";

export default function CtaBand() {
  return (
    <section className="ctaband section-alt">
      <div className="wrap">
        <h2 className="reveal">
          Pronto pra operar<br />do meu lado?
        </h2>
        <p className="reveal">
          Entra na sala, acompanha ao vivo e transforma o jeito que você enxerga o mercado.
        </p>
        <div className="ctaband-btns reveal">
          <a href={config.produtos.sala.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Entrar na Sala Rafael Fossalussa
          </a>
          <a href="#cursos" className="btn btn-ghost">
            Ver os cursos
          </a>
        </div>
      </div>
    </section>
  );
}
