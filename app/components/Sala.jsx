import { config } from "../config";
import { Radio, Globe, LineChart, ShieldCheck, Users } from "lucide-react";

const FEATS = [
  { ic: Radio, t: "Ao vivo, todo dia útil", d: "Do café da manhã ao fechamento, operando junto com você." },
  { ic: Globe, t: "Do índice ao global", d: "Mini índice e dólar aqui, e o que move o mundo lá fora: Nasdaq, ouro e Bitcoin." },
  { ic: LineChart, t: "Análise técnica de verdade", d: "Leitura de gráfico, estrutura e zonas — o raciocínio, não o palpite." },
  { ic: ShieldCheck, t: "Análise com CNPI na sala", d: `${config.cnpiNome} acompanha as análises (caráter informativo).` },
  { ic: Users, t: "Comunidade que estuda junto", d: "Você não fica sozinho na frente da tela." },
];

export default function Sala() {
  const s = config.produtos.sala;
  return (
    <section className="section" id="sala">
      <div className="wrap">
        <div className="reveal" style={{ maxWidth: 680 }}>
          <span className="eyebrow">A sala</span>
          <h2 className="h2">
            A minha <span className="grad">mesa ao vivo</span>, todo dia
          </h2>
          <p className="lead">
            Todo dia eu abro o pregão com você. Não é sinal pronto pra apertar botão — é você me
            vendo operar e entendendo o porquê de cada decisão, em tempo real.
          </p>
        </div>

        <div className="sala-grid">
          <div className="reveal">
            <div className="sala-feats">
              {FEATS.map(({ ic: Ic, t, d }) => (
                <div className="feat" key={t}>
                  <span className="feat-ic"><Ic /></span>
                  <div>
                    <b>{t}</b>
                    <span>{d}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="sala-cta">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Entrar na sala
              </a>
              <div className="sala-price">
                <b>{s.preco}</b>{s.periodo}
                <br />{s.nota}
              </div>
            </div>
          </div>

          <div className="sala-photo reveal">
            <span className="sala-live"><span className="hero-dot" /> Ao vivo</span>
            <img src="/rafael-sala.png" alt="Rafael operando" />
          </div>
        </div>
      </div>
    </section>
  );
}
