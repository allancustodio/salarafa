import fs from "fs";
import path from "path";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TickerTape from "./components/TickerTape";
import MarketOverview from "./components/MarketOverview";
import Sala from "./components/Sala";
import SemanaDaSala from "./components/SemanaDaSala";
import Cursos from "./components/Cursos";
import Historia from "./components/Historia";
import Depoimentos from "./components/Depoimentos";
import CtaBand from "./components/CtaBand";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Reveal from "./components/Reveal";

// Lê os arquivos de imagem em public/depoimentos/ no momento do build/request.
// Basta soltar imagens nessa pasta que aparecem no site — sem tocar em código.
function getDepoimentos() {
  try {
    const dir = path.join(process.cwd(), "public", "depoimentos");
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpe?g|webp|gif|avif)$/i.test(f))
      .sort();
  } catch {
    return [];
  }
}

export default function Home() {
  const depoimentos = getDepoimentos();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TickerTape />
        <Sala />

        {/* Painel de mercado ao vivo — reforça o diferencial do "mercado lá fora" */}
        {/* <section className="section" style={{ paddingTop: 0 }} id="mercado">
          <div className="wrap">
            <div
              className="reveal"
              style={{
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--line)",
                height: 480,
                boxShadow: "0 40px 80px -40px rgba(0,0,0,.7)",
              }}
            >
              <MarketOverview />
            </div>
          </div>
        </section> */}

        <SemanaDaSala />
        <Cursos />
        <Historia />
        <Depoimentos files={depoimentos} />
        <CtaBand />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Reveal />
    </>
  );
}
