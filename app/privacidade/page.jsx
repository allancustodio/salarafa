import Link from "next/link";

import CookiePreferencesButton from "../components/CookiePreferencesButton";
import { config } from "../config";

export const metadata = {
  title: "Política de Privacidade | Rafael Fossalussa",
  description: "Entenda como o site de Rafael Fossalussa trata dados pessoais e utiliza ferramentas de mensuração.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPolicy() {
  const whatsapp = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    "Olá! Quero falar sobre privacidade e tratamento dos meus dados pessoais."
  )}`;

  return (
    <main className="legal-page">
      <div className="legal-page__glow" aria-hidden="true" />
      <article className="legal-document">
        <Link href="/" className="legal-document__back">← Voltar ao site</Link>
        <header>
          <span>Privacidade e proteção de dados</span>
          <h1>Política de Privacidade</h1>
          <p>Versão de 18 de setembro de 2026.</p>
        </header>

        <section>
          <h2>1. Quem trata os dados</h2>
          <p>
            Esta política se aplica ao site <strong>rafaelfossalussa.com</strong>, mantido por
            Rafael Fossalussa para apresentar conteúdo educacional, sala ao vivo e treinamentos.
            Para assuntos de privacidade, utilize o <a href={whatsapp} target="_blank" rel="noopener noreferrer">canal oficial de atendimento</a>.
          </p>
        </section>

        <section>
          <h2>2. Dados tratados no site</h2>
          <p>Dependendo da sua navegação e das escolhas de consentimento, podemos tratar:</p>
          <ul>
            <li>endereço IP, data e hora, navegador, sistema, dispositivo e registros de segurança;</li>
            <li>páginas acessadas, origem da visita e interações com botões;</li>
            <li>identificadores de cookies, navegador e campanha, quando autorizados;</li>
            <li>preferências de privacidade salvas no seu navegador;</li>
            <li>dados que você decidir informar ao entrar em contato pelo WhatsApp ou Instagram.</li>
          </ul>
          <p>
            Não solicitamos no site dados sobre saldo, renda, patrimônio, resultado de operações,
            dados bancários ou outras informações financeiras sensíveis.
          </p>
        </section>

        <section>
          <h2>3. Finalidades e fundamentos</h2>
          <ul>
            <li><strong>Funcionamento e segurança:</strong> entregar as páginas, prevenir abuso e manter registros técnicos, conforme interesses legítimos e obrigações aplicáveis.</li>
            <li><strong>Atendimento:</strong> responder solicitações iniciadas por você e adotar providências relacionadas aos produtos.</li>
            <li><strong>Análise:</strong> entender uso e desempenho do site, somente quando a categoria opcional for autorizada.</li>
            <li><strong>Publicidade:</strong> medir campanhas, atribuir conversões e formar audiências, somente após consentimento para publicidade e marketing.</li>
            <li><strong>Compra e acesso:</strong> encaminhar você à Hotmart, que processa checkout, pagamento, entrega e suporte conforme seus próprios termos.</li>
          </ul>
        </section>

        <section>
          <h2>4. Meta Pixel e campanhas</h2>
          <p>
            Após sua autorização para publicidade, o site pode carregar o Meta Pixel para enviar
            eventos padronizados de visita, como <code>PageView</code> e <code>ViewContent</code>. O site
            não envia à Meta informações sobre resultados financeiros individuais.
          </p>
          <p>
            Nos checkouts, a Hotmart pode enviar eventos como início de checkout e compra para a Meta,
            conforme a integração configurada pelo produtor e as escolhas apresentadas no ambiente da
            própria Hotmart. A preferência registrada neste domínio não controla automaticamente os
            cookies do domínio da Hotmart.
          </p>
        </section>

        <section>
          <h2>5. Compartilhamento e fornecedores</h2>
          <p>Podemos utilizar os seguintes fornecedores dentro de suas respectivas finalidades:</p>
          <ul>
            <li><strong>Cloudflare:</strong> DNS, entrega, disponibilidade e segurança;</li>
            <li><strong>infraestrutura do site:</strong> hospedagem da aplicação e registros técnicos;</li>
            <li><strong>TradingView:</strong> fornecimento da fita de cotações, com recebimento de dados técnicos necessários à conexão;</li>
            <li><strong>Google Tag Manager:</strong> gerenciamento de tags, carregado apenas após autorização de categoria opcional;</li>
            <li><strong>Google Analytics (GA4):</strong> mensuração de audiência e comportamento no site (páginas visitadas, cliques em botões de checkout e WhatsApp, rolagem), carregado apenas após autorização da categoria Análise;</li>
            <li><strong>Meta:</strong> mensuração e publicidade, quando autorizadas;</li>
            <li><strong>Hotmart:</strong> páginas de produto, checkout, pagamentos, entrega e eventos comerciais;</li>
            <li><strong>WhatsApp e Instagram:</strong> comunicação iniciada por você.</li>
          </ul>
          <p>
            Alguns fornecedores podem processar dados em outros países, aplicando mecanismos
            contratuais e medidas de proteção conforme suas políticas e a legislação aplicável.
          </p>
        </section>

        <section>
          <h2>6. Retenção e segurança</h2>
          <p>
            Mantemos dados pelo período necessário à finalidade informada, ao exercício de direitos
            e ao cumprimento de obrigações. Os fornecedores mantêm seus próprios prazos. Adotamos
            medidas razoáveis para reduzir acessos, alterações e divulgações não autorizadas, embora
            nenhum sistema conectado à internet seja totalmente isento de riscos.
          </p>
        </section>

        <section>
          <h2>7. Seus direitos</h2>
          <p>
            Nos termos da LGPD, você pode solicitar confirmação e acesso, correção, informações
            sobre compartilhamento, revisão do consentimento e, quando aplicável, anonimização,
            bloqueio, eliminação ou portabilidade. Poderemos solicitar informações para confirmar sua
            identidade antes de atender ao pedido.
          </p>
        </section>

        <section>
          <h2>8. Cookies e revogação</h2>
          <p>
            Consulte a <Link href="/cookies">Política de Cookies</Link> para conhecer as categorias.
            Você pode alterar ou revogar sua escolha a qualquer momento pelo controle abaixo. A
            revogação não invalida tratamentos realizados anteriormente de forma legítima.
          </p>
          <CookiePreferencesButton className="legal-document__preference-button" />
        </section>

        <section>
          <h2>9. Atualizações</h2>
          <p>
            Esta política pode ser atualizada para refletir mudanças no site, nos fornecedores ou na
            legislação. A data da versão vigente permanecerá indicada no início do documento.
          </p>
        </section>
      </article>
    </main>
  );
}
