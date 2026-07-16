'use client';

import { useState } from "react";
import { config } from "../config";
import { CalendarDays } from "lucide-react";

export default function SemanaDaSala() {
  const w = config.semana;
  const [showImage, setShowImage] = useState(true);

  return (
    <section className="section section-alt" id="semana">
      <div className="wrap">
        <div className="semana-head reveal">
          <span className="eyebrow">Toda semana</span>
          <h2 className="h2">A semana da sala</h2>
          <div className="semana-ref">
            <CalendarDays size={14} /> {w.referencia}
          </div>
          <p className="lead">
            Toda semana eu pergunto pra turma como foi. Quem fechou positivo, quem fechou negativo,
            quem ainda está aprendendo. Sem filtro — é assim que a gente evolui junto.
          </p>
        </div>

        <div className="semana-grid">
          <div className="semana-stats reveal">
            <div className="stat pos">
              <div className="stat-n">{w.positivo}</div>
              <div className="stat-l">fecharam a semana positivos</div>
            </div>
            <div className="stat neg">
              <div className="stat-n">{w.negativo}</div>
              <div className="stat-l">fecharam negativos</div>
            </div>
            <div className="stat apr">
              <div className="stat-n">{w.aprendendo}</div>
              <div className="stat-l">ainda no processo de aprender</div>
            </div>
          </div>

          <div className="semana-print reveal">
            {/* Coloque o print da enquete em public/semana/enquete.png */}
            {showImage ? (
              <img
                src={w.print}
                alt="Enquete da semana no WhatsApp"
                onError={() => setShowImage(false)}
              />
            ) : (
              <div className="semana-print-ph">
                Solte o print da enquete do WhatsApp em <br />
                <code style={{ fontFamily: "var(--mono)", fontWeight: 500, color: "var(--emerald-br)" }}>
                  /public/semana/enquete.png
                </code>
                <br /> que ele aparece aqui.
              </div>
            )}
          </div>
        </div>

        <p className="semana-note">
          Dados declarados pelos próprios alunos em enquete no WhatsApp. Têm caráter informativo e não
          representam recomendação, oferta ou garantia de resultado. Renda variável envolve risco.
        </p>
      </div>
    </section>
  );
}
