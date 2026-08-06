"use client";

import { useState, useRef } from "react";
import { config } from "../config";

const ITEMS = [
  {
    q: "Preciso já saber operar pra entrar?",
    a: "Não. Tem gente que chega sem nunca ter aberto um gráfico e tem gente que já opera há anos. Na sala você me vê operar ao vivo e vai entendendo o raciocínio no seu ritmo. Os cursos ajudam a construir a base antes, se você quiser começar por aí.",
  },
  {
    q: "O que é a sala ao vivo, exatamente?",
    a: "É uma sala de operação com o mercado aberto e a minha tela na sua frente. Você acompanha em tempo real a leitura do gráfico, a decisão de entrar (ou não), o gerenciamento e a saída — com a explicação do porquê de cada movimento. Não é sinal pronto pra apertar botão. É você aprendendo a enxergar o mercado.",
  },
  {
    q: "Quais mercados vocês acompanham?",
    a: "Mini índice e mini dólar aqui na B3, mais a leitura do que move o mundo lá fora: Nasdaq, ouro, Bitcoin e S&P. A ideia é conectar o global com a decisão do dia.",
  },
  {
    q: "E se eu não puder assistir ao vivo?",
    a: "As sessões ficam disponíveis pra você rever quando der. Ao vivo é melhor pela troca em tempo real, mas ninguém fica de fora por causa de horário.",
  },
  {
    q: "Como funciona a assinatura da sala?",
    a: "A Sala Rafael Fossalussa funciona no plano trimestral, com cobrança recorrente de R$ 749 a cada 3 meses — equivalente a R$ 249,67 por mês. As condições finais e as formas de pagamento são exibidas no checkout da Hotmart antes da confirmação.",
  },
  {
    q: "Isso é recomendação de investimento?",
    a: "Não. Todo o conteúdo é educacional e informativo e não constitui recomendação ou oferta de investimento. Renda variável envolve risco de perda, e resultado passado não garante resultado futuro.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(-1);
  const refs = useRef([]);

  return (
    <section className="section section-alt" id="faq">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">Perguntas frequentes</span>
          <h2 className="h2">Sua dúvida, respondida</h2>
        </div>
        <div className="faq-wrap">
          {ITEMS.map((it, i) => (
            <div key={i} className={`fq ${open === i ? "open" : ""}`}>
              <button className="fq-btn" onClick={() => setOpen(open === i ? -1 : i)}>
                {it.q}
                <span className="fq-ic">+</span>
              </button>
              <div
                className="fq-body"
                ref={(el) => (refs.current[i] = el)}
                style={{ maxHeight: open === i ? refs.current[i]?.scrollHeight + "px" : "0" }}
              >
                <p>{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
