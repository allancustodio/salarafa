import Link from "next/link";

import CookiePreferencesButton from "../components/CookiePreferencesButton";

export const metadata = {
  title: "Política de Cookies | Rafael Fossalussa",
  description: "Conheça as categorias de cookies e tecnologias utilizadas em rafaelfossalussa.com.",
  alternates: { canonical: "/cookies" },
};

export default function CookiePolicy() {
  return (
    <main className="legal-page">
      <div className="legal-page__glow" aria-hidden="true" />
      <article className="legal-document">
        <Link href="/" className="legal-document__back">← Voltar ao site</Link>
        <header>
          <span>Transparência e escolhas</span>
          <h1>Política de Cookies</h1>
          <p>Versão de 18 de setembro de 2026.</p>
        </header>

        <section>
          <h2>1. O que são cookies</h2>
          <p>
            Cookies são pequenos arquivos ou identificadores armazenados pelo navegador. Tecnologias
            semelhantes, como armazenamento local, pixels e tags, também podem registrar preferências e
            eventos de navegação. Neste documento, usamos “cookies” como termo abrangente para essas
            tecnologias.
          </p>
        </section>

        <section>
          <h2>2. Categorias utilizadas</h2>
          <div className="legal-table-wrap">
            <table>
              <thead><tr><th>Categoria</th><th>Finalidade</th><th>Comportamento</th></tr></thead>
              <tbody>
                <tr><td>Necessários</td><td>Segurança, entrega do site e registro da sua escolha.</td><td>Sempre ativos.</td></tr>
                <tr><td>Análise</td><td>Compreender navegação, interações e desempenho agregado.</td><td>Somente com autorização.</td></tr>
                <tr><td>Publicidade e marketing</td><td>Meta Pixel, atribuição, remarketing e mensuração de campanhas.</td><td>Somente com autorização.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>3. Tecnologias identificadas</h2>
          <div className="legal-table-wrap">
            <table>
              <thead><tr><th>Tecnologia</th><th>Fornecedor</th><th>Finalidade e duração</th></tr></thead>
              <tbody>
                <tr>
                  <td><code>rf_cookie_consent_v1</code></td>
                  <td>Este site</td>
                  <td>Armazenamento local necessário para lembrar as categorias escolhidas por até 180 dias.</td>
                </tr>
                <tr>
                  <td><code>_fbp</code> e <code>_fbc</code></td>
                  <td>Meta</td>
                  <td>Identificação do navegador e atribuição de campanhas, quando aplicável e autorizada. A duração é definida pela Meta.</td>
                </tr>
                <tr>
                  <td>Google Tag Manager</td>
                  <td>Google</td>
                  <td>Gerencia tags após autorização. O container não deve liberar fornecedores incompatíveis com a escolha registrada.</td>
                </tr>
                <tr>
                  <td><code>_ga</code>, <code>_gid</code> e <code>_ga_*</code></td>
                  <td>Google Analytics (GA4)</td>
                  <td>Identificação do navegador para mensuração de audiência, páginas visitadas e interações (cliques, rolagem), apenas com autorização da categoria Análise. A duração é definida pelo Google.</td>
                </tr>
                <tr>
                  <td>Controles técnicos e de segurança</td>
                  <td>Cloudflare e infraestrutura</td>
                  <td>Podem variar conforme risco, configuração e necessidade de proteção do serviço.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>4. TradingView e conteúdo externo</h2>
          <p>
            A fita de cotações é carregada da TradingView como funcionalidade da página. Mesmo que
            o widget não defina cookies no navegador, a conexão pode transmitir dados técnicos, como IP
            e navegador, para que o conteúdo seja entregue.
          </p>
        </section>

        <section>
          <h2>5. Hotmart e outros domínios</h2>
          <p>
            Ao abrir um checkout, você sai de rafaelfossalussa.com e entra em um domínio administrado
            pela Hotmart. A Hotmart apresenta seus próprios controles e políticas. Sua escolha neste site
            não substitui a escolha solicitada no checkout.
          </p>
        </section>

        <section>
          <h2>6. Como alterar sua escolha</h2>
          <p>
            Use o botão abaixo a qualquer momento. Ao revogar publicidade, o site interrompe novos
            eventos do Meta Pixel e tenta remover os respectivos cookies primários deste domínio. Você
            também pode apagar dados diretamente nas configurações do navegador.
          </p>
          <CookiePreferencesButton className="legal-document__preference-button" />
          <p>Leia também a <Link href="/privacidade">Política de Privacidade</Link>.</p>
        </section>
      </article>
    </main>
  );
}
