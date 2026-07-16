import { config } from "../config";

export default function Footer() {
  const waLink = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.whatsappMsg)}`;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <b>Rafael Fossalussa</b>
            <p>
              Trader profissional e educador. Sala ao vivo, cursos e uma comunidade que estuda o
              processo todo dia.
            </p>
          </div>
          <div className="foot-cols">
            <div className="fcol">
              <h4>A sala</h4>
              <a href="#sala">Sobre a sala</a>
              <a href="#semana">A semana</a>
              <a href={config.produtos.sala.url} target="_blank" rel="noopener noreferrer">
                Assinar
              </a>
            </div>
            <div className="fcol">
              <h4>Cursos</h4>
              <a href={config.produtos.scalp.url} target="_blank" rel="noopener noreferrer">Scalping</a>
              <a href={config.produtos.leilao.url}>Leilão do Dólar</a>
              <a href={config.produtos.gl2.url} target="_blank" rel="noopener noreferrer">Gradiente Linear 2.0</a>
            </div>
            <div className="fcol">
              <h4>Contato</h4>
              <a href={config.instagram} target="_blank" rel="noopener noreferrer">
                Instagram {config.instagramHandle}
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>

        {/* AVISO LEGAL — troque o número do CNPI em app/config.js quando confirmar */}
        <div className="disclaimer">
          <strong>Aviso legal</strong>
          As análises apresentadas na sala são de responsabilidade do analista {config.cnpiNome} —
          CNPI {config.cnpiNumero}, elaboradas de forma independente e representando a visão do
          analista. Todo o conteúdo tem caráter educacional e informativo e não constitui recomendação
          ou oferta de compra ou venda de qualquer ativo. Investimentos em renda variável envolvem
          risco de perda; resultados passados não garantem resultados futuros.
        </div>

        <div className="foot-bottom">
          <span>© 2026 Rafael Fossalussa · Todos os direitos reservados</span>
          <span>Feito com método e disciplina.</span>
        </div>
      </div>
    </footer>
  );
}
