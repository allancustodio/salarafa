# Plano de mensuração, Meta Pixel, Hotmart e privacidade

**Projeto:** Rafael Fossalussa  
**Domínio principal:** `https://rafaelfossalussa.com`  
**Data da análise:** 14 de setembro de 2026  
**Status:** planejamento — nenhuma implementação autorizada ou realizada

---

## 1. Objetivo do projeto

Estruturar uma mensuração confiável da jornada comercial do visitante, desde a origem da campanha até a compra na Hotmart, permitindo:

- entender quais páginas e produtos despertam interesse;
- analisar os caminhos de navegação no site;
- medir cliques em produtos, WhatsApp e checkout;
- identificar inícios de checkout e pagamentos aprovados;
- criar audiências de remarketing por produto e etapa do funil;
- excluir compradores de campanhas de aquisição;
- criar campanhas de cross-sell entre produtos;
- otimizar campanhas da Meta para compras reais;
- preservar a privacidade dos visitantes e atender às exigências aplicáveis da LGPD;
- manter a Hotmart como fonte oficial de vendas, pagamentos, reembolsos e assinaturas.

O objetivo não é coletar indiscriminadamente todas as ações possíveis. A mensuração deve se limitar aos eventos necessários para decisões comerciais, seguindo os princípios de finalidade, adequação e necessidade da LGPD.

---

## 2. Resumo executivo

A solução recomendada possui quatro camadas complementares:

1. **Ferramenta de Analytics:** caminhos de navegação, páginas, sessões, origem de tráfego, engajamento e funis.
2. **Meta Pixel:** eventos de navegador, audiências, remarketing e atribuição de campanhas.
3. **Meta Conversions API por meio da Hotmart:** envio de compras e outros eventos de servidor, reduzindo perdas causadas por bloqueadores e restrições de navegador.
4. **Hotmart Analytics:** fonte oficial para vendas, situação do pagamento, recorrência, reembolso, chargeback e receita.

Fluxo desejado:

```text
Campanha / anúncio
        ↓
Página de entrada no site
        ↓
Visualização ou seleção de produto
        ↓
Clique para checkout
        ↓
Checkout carregado na Hotmart
        ↓
Pagamento gerado
        ↓
Pagamento aprovado
        ↓
Compra, produto, oferta e valor
```

Um único conjunto de dados/Pixel da Meta deve ser usado para toda a marca e para os quatro produtos. A segmentação será feita por eventos, parâmetros, produto e URL. Criar um Pixel diferente para cada página ou produto fragmentaria o histórico e dificultaria a otimização das campanhas.

O Pixel sozinho não apresenta a jornada individual completa de cada pessoa. Ele é uma ferramenta de publicidade e atribuição. A análise dos caminhos de navegação deverá ser feita na ferramenta de Analytics, e a situação financeira das vendas deverá ser consultada na Hotmart.

---

## 3. Escopo da análise atual

A análise foi realizada sobre:

- o código-fonte disponível no repositório;
- o manifesto de rotas do build existente;
- os componentes, CTAs e links de checkout;
- os arquivos públicos de imagens e depoimentos;
- as URLs públicas do domínio em produção;
- os cabeçalhos HTTP públicos;
- as orientações oficiais da ANPD, CVM, Meta, Hotmart e TradingView disponíveis na data da análise.

Não foram analisados diretamente:

- o painel da conta Meta Business;
- o Gerenciador de Eventos da Meta;
- a conta de anúncios;
- as configurações internas dos produtos na Hotmart;
- vendas e relatórios reais;
- configurações completas do Nginx ou Cloudflare;
- contratos, autorizações dos alunos ou documentos jurídicos existentes.

Esses itens precisam ser fornecidos ou revisados antes da implementação definitiva.

---

## 4. Inventário das páginas públicas

Foram identificadas seis páginas comerciais válidas:

| URL | Função | Produto/tema | Evento principal recomendado |
|---|---|---|---|
| `/` | Página institucional principal | Marca, sala, cursos, história e prova social | `PageView` |
| `/cursos` | Catálogo | Quatro produtos | `PageView` e seleção de produto |
| `/produto/sala-gl` | Página de produto | Sala GL 2.0 | `ViewContent` |
| `/produto/abertura-dolar` | Página de produto | Fluxo de Abertura no Dólar | `ViewContent` |
| `/produto/metodo-scalping` | Página de produto | Método Scalping | `ViewContent` |
| `/produto/gradiente-linear` | Página de produto | Gradiente Linear 2.0 | `ViewContent` |

As seções da página inicial abaixo são âncoras e não páginas independentes:

- `#sala`;
- `#semana`;
- `#cursos`;
- `#historia`;
- `#depoimentos`;
- `#faq`.

Por serem âncoras, elas não permitem criar audiências diferentes somente por URL. Caso seja necessário identificar interesse em uma seção, será preciso registrar uma interação específica e relevante, evitando eventos excessivos de simples rolagem.

Existe também a página técnica 404 do Next.js. Ela não deve ser usada como audiência comercial. Recomenda-se criar uma página 404 personalizada e excluir acessos a erros dos funis de conversão.

---

## 5. Diagnóstico atual do domínio e infraestrutura pública

### 5.1 Situação confirmada

- `https://rafaelfossalussa.com/` responde com status `200`.
- `http://rafaelfossalussa.com/` redireciona com `301` para HTTPS.
- O domínio antigo `salarafafossalussa.teksolutions.io` redireciona com `301` para o domínio atual.
- As seis páginas comerciais respondem com status `200`.
- O tráfego público passa pelo Cloudflare.
- A aplicação é servida pelo Next.js atrás da infraestrutura da VPS/Nginx.

### 5.2 Ajustes necessários

O HTML publicado ainda anuncia o domínio antigo nas tags de compartilhamento social. No código, continuam configurados com o domínio anterior:

- `metadataBase`;
- `og:url`;
- URL da imagem Open Graph;
- URL da imagem do Twitter.

Também foram encontrados estes pontos:

- `www.rafaelfossalussa.com` responde `200` e não redireciona para o domínio sem `www`;
- não há canonical declarado;
- `/sitemap.xml` retorna `404`;
- `/privacidade` retorna `404`;
- `/cookies` retorna `404`;
- o `robots.txt` público permite indexação, mas não informa um sitemap;
- não foram observados alguns cabeçalhos de segurança recomendáveis na resposta analisada;
- o cabeçalho `X-Powered-By: Next.js` está exposto.

### 5.3 Recomendação de domínio canônico

Adotar oficialmente:

```text
https://rafaelfossalussa.com
```

E então:

- redirecionar `www` para o domínio sem `www` com `301`;
- manter o redirecionamento do domínio antigo;
- declarar canonical em todas as páginas;
- atualizar metadados e imagens sociais;
- usar somente o domínio novo no Meta Business, Analytics, Hotmart e campanhas;
- cadastrar o domínio no Google Search Console;
- criar e enviar o sitemap;
- limpar o cache do Cloudflare após a publicação.

---

## 6. Arquitetura de mensuração recomendada

### 6.1 Camada de Analytics

Responsável por:

- páginas de entrada e saída;
- sequência de páginas visitadas;
- sessões e usuários pseudônimos;
- origem, mídia e campanha;
- desempenho por dispositivo;
- funis e taxas de abandono;
- cliques em produtos;
- cliques no WhatsApp;
- cliques que saem para a Hotmart;
- engajamento nas páginas de produto.

Essa é a camada adequada para responder perguntas como:

- Qual página o visitante acessou primeiro?
- Quais produtos ele visualizou durante a sessão?
- Quantas pessoas saíram da home para uma página de produto?
- Em qual produto ocorreu maior abandono antes do checkout?
- Qual CTA gerou mais visitas ao checkout?

### 6.2 Meta Pixel

Responsável por:

- eventos de navegador autorizados;
- criação de audiências;
- remarketing;
- exclusão de compradores;
- atribuição de anúncios;
- otimização das campanhas;
- formação de públicos semelhantes quando houver volume suficiente.

O Pixel deverá:

- permanecer bloqueado até o consentimento para publicidade;
- carregar uma única vez;
- registrar um `PageView` para cada rota realmente visitada;
- respeitar as navegações internas do Next.js, que podem ocorrer sem recarregar o documento;
- não disparar novamente o mesmo evento por renderizações ou mudanças visuais da página;
- não enviar informações financeiras pessoais ou textos de mensagens.

### 6.3 Conversions API

Responsável principalmente por:

- aumentar a confiabilidade de eventos importantes;
- enviar eventos de compra a partir da Hotmart;
- reduzir dependência exclusiva de cookies e scripts de navegador;
- melhorar a correspondência e atribuição quando houver base legal e identificadores permitidos.

A API não deve ser tratada como mecanismo para contornar rejeição de cookies ou rastreamento. Mesmo sem cookie, o envio para a Meta continua sendo tratamento e compartilhamento de dados pessoais.

### 6.4 Hotmart

Responsável por:

- checkout carregado;
- pagamento gerado;
- pagamento aprovado;
- produto e oferta adquiridos;
- valor da transação;
- assinatura e renovação;
- reembolso e chargeback;
- situação real do cliente;
- origem comercial por UTM, SCK e outros parâmetros suportados.

A Hotmart será a fonte financeira oficial. Os números do Meta Ads não devem substituir os relatórios de venda da plataforma.

---

## 7. Dicionário de eventos

### 7.1 Eventos essenciais

| Etapa | Evento de Analytics | Evento da Meta | Origem | Observação |
|---|---|---|---|---|
| Página visualizada | `page_view` | `PageView` | Site | Um por rota, após consentimento aplicável |
| Produto visualizado | `view_item` | `ViewContent` | Site | Somente nas quatro páginas de produto |
| Produto selecionado | `select_item` | Evento customizado `SelectProduct` | Site | Cards e CTAs que levam a um produto |
| Clique no WhatsApp | `contact` | `Contact` ou `WhatsAppClick` | Site | Microconversão, não compra |
| Clique para checkout | `checkout_click` | `CheckoutClick` opcional | Site | Evento diagnóstico |
| Checkout carregado | `begin_checkout` | `InitiateCheckout` | Hotmart | Somente após o checkout realmente abrir |
| Pagamento pendente gerado | Evento de pagamento pendente | `PaymentGenerated`, quando disponível | Hotmart | Não contabilizar como compra |
| Pagamento aprovado | `purchase` | `Purchase` | Hotmart | Conversão comercial principal |
| Renovação | `subscription_renewal` ou classificação equivalente | Avaliar separação | Hotmart | Não inflar aquisição |
| Reembolso | Ajuste/estorno em relatórios | Não registrar como nova compra | Hotmart | Necessário para receita real |

### 7.2 Parâmetros mínimos dos eventos de produto

- identificador do produto;
- nome do produto;
- categoria;
- oferta;
- moeda `BRL`;
- valor compatível com a cobrança real;
- URL da página;
- origem do CTA, quando aplicável;
- campanha/origem preservada por UTMs;
- identificador de evento para deduplicação, quando Web e API enviarem o mesmo evento.

### 7.3 Padronização de identificadores

Os identificadores usados em `ViewContent`, `InitiateCheckout` e `Purchase` devem ser compatíveis. A Hotmart envia seu próprio `product_id` e dados de oferta. Antes de definir audiências por produto, deve-se observar os eventos reais no Gerenciador de Eventos e documentar a correspondência.

Não se deve assumir que o slug do site será igual ao ID enviado pela Hotmart.

### 7.4 Valor da Sala GL

Na página, a Sala GL exibe o equivalente mensal de `R$ 249,67`, mas informa plano trimestral de `R$ 749`.

Para mensuração:

- `ViewContent` deve usar uma regra coerente com a oferta apresentada;
- `Purchase` deve refletir o valor efetivamente enviado pela Hotmart;
- o relatório precisa deixar claro se trabalha com receita bruta, valor cobrado, comissão ou valor líquido;
- renovações trimestrais precisam ser separadas da aquisição inicial.

### 7.5 Eventos que não devem ser utilizados incorretamente

- Não disparar `Lead` apenas porque alguém clicou no WhatsApp.
- Não disparar `AddToCart`, pois o site não possui carrinho.
- Não disparar `InitiateCheckout` ao abrir uma página de produto.
- Não disparar `InitiateCheckout` apenas no clique se a Hotmart já o envia ao carregar o checkout.
- Não disparar `Purchase` no clique do botão.
- Não considerar Pix ou boleto apenas gerado como compra aprovada.
- Não disparar `Purchase` em toda visualização de uma página de obrigado sem deduplicação.

---

## 8. Taxonomia de produtos e CTAs

### 8.1 Identificadores internos sugeridos

| Produto | Identificador do site |
|---|---|
| Sala GL 2.0 | `sala-gl` |
| Fluxo de Abertura no Dólar | `abertura-dolar` |
| Método Scalping | `metodo-scalping` |
| Gradiente Linear 2.0 | `gradiente-linear` |

Esses valores devem ser relacionados em uma tabela aos IDs reais da Hotmart.

### 8.2 Origens de CTA sugeridas

- `home_nav`;
- `home_hero`;
- `home_sala`;
- `home_cursos_card`;
- `home_historia`;
- `home_final_cta`;
- `catalog_card`;
- `catalog_help`;
- `product_header`;
- `product_hero`;
- `product_inline`;
- `product_offer`;
- `product_final`;
- `product_mobile_bar`;
- `footer`;
- `whatsapp_float`.

Essa taxonomia permitirá descobrir qual posição do site gera checkout e compra, sem criar nomes de eventos diferentes para cada botão.

---

## 9. UTMs, SCK e atribuição

### 9.1 UTMs recomendadas

Todas as campanhas devem seguir uma convenção consistente:

```text
utm_source=meta
utm_medium=paid_social
utm_campaign=<nome_da_campanha>
utm_content=<criativo_ou_anuncio>
utm_term=<publico_quando_necessario>
```

Os valores devem usar letras minúsculas, sem acentos e com separador padronizado.

### 9.2 Preservação até o checkout

As UTMs da entrada precisam ser preservadas quando o visitante sair para a Hotmart. Caso contrário, a ferramenta de Analytics entenderá a origem do site, mas a Hotmart poderá perder a ligação com a campanha.

### 9.3 Problema atual nos links de checkout

Foram encontrados links com:

- `sck=HOTMART_PRODUCT_PAGE`;
- `sck=HOTMART_MEM_CA`;
- um produto sem `sck` equivalente.

Esses valores parecem representar ambientes internos da Hotmart, embora os links estejam sendo acionados no site externo. A situação pode classificar incorretamente a origem nos relatórios da Hotmart.

### 9.4 Convenção futura de SCK

Exemplos:

- `site_home_hero`;
- `site_home_cursos`;
- `site_catalogo`;
- `produto_sala_hero`;
- `produto_sala_final`;
- `produto_scalping_mobile`.

A estrutura final deve considerar o limite e o comportamento real do parâmetro na Hotmart. UTMs e SCK devem ser testados em uma compra controlada antes da publicação.

---

## 10. Audiências recomendadas

### 10.1 Audiências gerais

- Todos os visitantes — 30 dias.
- Todos os visitantes — 60 dias.
- Todos os visitantes — 180 dias.
- Visitantes engajados — 30 dias.
- Pessoas que visitaram o catálogo — 30 dias.
- Pessoas que clicaram no WhatsApp — 30 dias.

### 10.2 Por produto

Para cada um dos quatro produtos:

- visualizou o produto — 7, 14 e 30 dias;
- iniciou checkout e não comprou — 1, 3, 7 e 14 dias;
- comprou — até 180 dias, conforme estratégia e disponibilidade;
- comprou outro produto, mas não este — cross-sell;
- cliente ativo, quando houver sincronização confiável com Hotmart/CRM.

### 10.3 Exclusões

- Excluir compradores do próprio produto das campanhas de aquisição.
- Excluir pagamentos aprovados de campanhas de recuperação de checkout.
- Não excluir todos os compradores das campanhas de cross-sell.
- Separar compradores reembolsados, quando possível.
- Separar assinantes ativos, cancelados e inadimplentes da Sala GL.

### 10.4 Públicos semelhantes

Criar somente quando houver volume e qualidade suficientes:

- semelhantes de todos os compradores;
- semelhantes por produto;
- semelhantes de compradores de maior valor;
- semelhantes de clientes ativos da Sala, se houver base legal e integração adequada.

### 10.5 Limitação importante

Uma audiência `Purchase` não representa necessariamente clientes ativos. Ela pode incluir compradores reembolsados, cancelados e ex-assinantes. A Hotmart ou um CRM deve ser a fonte para situação atual do cliente.

---

## 11. Uso das audiências em campanhas

### 11.1 Aquisição

- Otimizar para `Purchase` somente após validar a qualidade do evento.
- Enquanto não houver volume suficiente, avaliar um evento intermediário confiável sem confundi-lo com compra.
- Excluir compradores do produto anunciado.
- Manter criativos focados em educação, método, processo, gestão e risco.

### 11.2 Remarketing por intenção

- Visitou produto, não iniciou checkout: reforçar proposta, conteúdo e adequação.
- Iniciou checkout, não comprou: tratar dúvidas, garantia e segurança da Hotmart.
- Clicou no WhatsApp: evitar excesso de anúncios e alinhar com atendimento comercial.
- Visitou vários produtos: apresentar comparação ou orientação de escolha.

### 11.3 Cross-sell

- Compradores de cursos podem receber oferta da Sala GL.
- Compradores da Sala podem receber treinamentos específicos quando fizer sentido.
- Compradores de um treinamento não devem receber repetidamente anúncio do mesmo produto.

### 11.4 Frequência e experiência

- Definir janelas curtas para abandono de checkout.
- Evitar remarketing agressivo por longos períodos.
- Não usar textos que revelem ou insinuem atributos pessoais sensíveis.
- Não mencionar que a Meta “sabe” que determinada pessoa perdeu dinheiro ou opera day trade.

---

## 12. Privacidade, cookies e LGPD

### 12.1 Regra recomendada

O Pixel da Meta e tecnologias de publicidade devem ficar bloqueados até consentimento válido.

O consentimento deve ser:

- livre;
- informado;
- inequívoco;
- específico por finalidade;
- revogável por procedimento simples;
- registrado para fins de comprovação.

### 12.2 Banner de primeiro nível

Deve apresentar, com destaque equivalente:

- **Aceitar todos**;
- **Rejeitar não necessários**;
- **Configurar cookies**.

O texto deve explicar resumidamente que cookies e tecnologias semelhantes são usados para medição, análise e publicidade personalizada, com link para informações detalhadas.

Não utilizar:

- somente o botão “Aceitar”;
- opções de publicidade pré-selecionadas;
- consentimento tácito por rolagem;
- texto “ao continuar navegando você aceita”;
- bloqueio da navegação ou da compra caso o visitante rejeite publicidade;
- botão de rejeição escondido ou visualmente inferior.

### 12.3 Categorias sugeridas

1. **Necessários:** funcionamento, segurança e registro da preferência.
2. **Funcionais:** recursos externos necessários a uma funcionalidade solicitada, conforme avaliação.
3. **Análise de desempenho:** ferramenta de Analytics e medição agregada, conforme configuração.
4. **Publicidade e marketing:** Meta Pixel, remarketing e personalização de campanhas.

### 12.4 Gerenciamento posterior

Adicionar “Gerenciar cookies” ao rodapé de todas as páginas. O mecanismo deverá permitir:

- consultar a escolha atual;
- alterar categorias;
- revogar o consentimento;
- interromper futuros disparos;
- atualizar a escolha quando a política ou as tecnologias mudarem materialmente.

### 12.5 Prova do consentimento

Registrar, dentro dos limites necessários:

- versão do banner/política;
- data e hora;
- categorias aceitas;
- identificador pseudônimo da escolha;
- data de eventual revogação.

### 12.6 Rejeição e Conversions API

A rejeição ao rastreamento publicitário deve ser respeitada. A Conversions API não deve ser usada deliberadamente para burlar essa escolha.

O consentimento do domínio `rafaelfossalussa.com` não é automaticamente compartilhado com `pay.hotmart.com`. Deve-se confirmar com a Hotmart:

- como o checkout obtém e registra preferências;
- como o Pixel configurado pelo produtor respeita essas preferências;
- como eventos via API são tratados quando o comprador rejeita publicidade;
- qual é o papel de cada parte no tratamento e compartilhamento com a Meta.

### 12.7 Dados que podem ser envolvidos

- endereço IP;
- tipo de navegador e dispositivo;
- URL e página anterior;
- horário dos eventos;
- identificadores de cookie e de clique;
- produto visualizado;
- checkout iniciado;
- produto e oferta comprados;
- valor e moeda;
- e-mail ou telefone com hash, se correspondência avançada/API forem habilitadas.

E-mail ou telefone com hash continuam sendo dados pessoais. Hash não equivale automaticamente a anonimização.

### 12.8 Dados que não devem ser enviados à Meta

- capital disponível para investimento;
- ganhos ou perdas de trading;
- perfil ou tolerância a risco;
- conteúdo de mensagens privadas;
- números de documentos sem necessidade;
- dados completos de cartão ou conta;
- resultados individuais de operações;
- informações que revelem situação financeira pessoal;
- textos livres que possam conter dados sensíveis.

---

## 13. Política de Privacidade e Cookies

Atualmente não existe página correspondente no site.

O documento poderá reunir privacidade e cookies em uma única página, desde que possua seções claras e seja acessível pelo banner e pelo rodapé.

Deve conter:

1. identificação do controlador;
2. razão social ou nome completo;
3. CPF/CNPJ, conforme orientação jurídica;
4. canal de contato de privacidade;
5. responsável pelo atendimento aos titulares;
6. categorias de dados tratados;
7. origem dos dados;
8. finalidades específicas;
9. bases legais por finalidade;
10. categorias de cookies e tecnologias semelhantes;
11. fornecedores e destinatários, incluindo Meta, Hotmart, hospedagem e TradingView;
12. informação sobre transferências internacionais;
13. períodos de retenção ou critérios usados para determiná-los;
14. medidas gerais de segurança;
15. direitos do titular;
16. procedimento para acesso, correção, oposição, revogação e eliminação;
17. consequências da rejeição de cookies;
18. data de vigência e histórico de versões.

A redação final deve ser validada por profissional jurídico ou de privacidade.

---

## 14. Terceiros atualmente presentes

### 14.1 TradingView

A página inicial carrega o widget de cotações da TradingView por script externo.

Segundo a documentação da própria TradingView, seus widgets não definem cookies, mas recebem:

- URL da página que incorpora o widget;
- tipo do widget;
- símbolos exibidos;
- endereço IP, mantido por curto período para proteção dos servidores.

Mesmo sem cookie, existe transmissão de dados a terceiro. O fornecedor deve aparecer no inventário e na Política de Privacidade. Deve-se decidir e documentar a base legal e se o widget ficará condicionado a uma categoria funcional.

### 14.2 Hotmart

Ao clicar em comprar, o visitante é redirecionado a um ambiente com política e cookies próprios da Hotmart. Como o produtor habilitará integrações de publicidade, a política do site também deve explicar esse fluxo e o compartilhamento relacionado.

### 14.3 Meta

A Meta recebe eventos do site e/ou Hotmart para medição, correspondência, atribuição e publicidade. O uso deve observar os termos das Ferramentas da Meta, a legislação aplicável e as preferências do visitante.

---

## 15. Configuração planejada na Hotmart

### 15.1 Preparação na Meta

- Confirmar se já existe um conjunto de dados/Pixel com histórico.
- Evitar criar um novo sem necessidade.
- Garantir propriedade pelo portfólio empresarial do cliente.
- Conceder acesso à equipe/agência sem transferir propriedade.
- Confirmar conta de anúncios associada.
- Obter o Pixel ID.
- Gerar token da Conversions API em ambiente seguro.
- Nunca inserir token em código público ou documentação versionada.

### 15.2 Configuração por produto

Na Hotmart:

```text
Ferramentas
  → Ver todas
  → Pixel de Rastreamento
  → Selecionar produto
  → Facebook + Instagram
```

Repetir para:

1. Sala GL 2.0;
2. Fluxo de Abertura no Dólar;
3. Método Scalping;
4. Gradiente Linear 2.0;
5. eventuais order bumps, upsells ou produtos complementares.

Em cada produto:

- informar o mesmo Pixel ID;
- habilitar visita à página de pagamento;
- habilitar vendas realizadas;
- avaliar página de produto Hotmart somente se realmente utilizada;
- selecionar envio Web;
- selecionar envio por API de Conversões;
- inserir o token diretamente no painel;
- revisar as opções avançadas;
- salvar.

### 15.3 Pagamentos imediatos e não imediatos

Ativar a diferenciação para impedir que um boleto ou Pix apenas gerado seja contabilizado como compra aprovada.

Fluxo desejado:

```text
Checkout aberto → InitiateCheckout
Pagamento pendente gerado → PaymentGenerated
Pagamento efetivamente aprovado → Purchase
```

A documentação atual da Hotmart deve ser confirmada no painel e por testes, principalmente para Pix aprovado posteriormente.

### 15.4 Valor enviado

Definir previamente qual métrica será usada:

- preço bruto do produto;
- valor efetivamente pago;
- comissão do produtor;
- valor líquido;
- valor fixo de otimização.

O valor escolhido influencia o ROAS. Meta Ads e Hotmart precisam ser comparados usando a mesma definição ou ter diferenças documentadas.

### 15.5 Recorrência da Sala GL

Verificar se a Hotmart envia `Purchase` para:

- primeira adesão;
- renovação trimestral;
- recuperação de cobrança;
- troca de plano.

Se renovações forem contabilizadas como novas compras atribuídas às campanhas, o ROAS de aquisição pode ficar artificialmente elevado.

### 15.6 Reembolso e chargeback

Definir como:

- relatórios de receita serão corrigidos;
- compradores reembolsados serão removidos de audiências, quando aplicável;
- assinantes cancelados serão diferenciados de ativos;
- campanhas evitarão oferecer suporte de aluno ativo a quem não possui mais acesso.

---

## 16. Revisão prioritária do conteúdo antes de tráfego pago

### 16.1 Inconsistência na “Semana da Sala”

O código apresenta:

- `74` fecharam positivos;
- `1` fechou negativo;
- `5` estão aprendendo;
- referência “Semana de 07 a 11 de julho”.

O print publicado apresenta:

- `74%` Gain;
- `4%` Loss;
- `17%` Não Operei;
- `4%` Estou no Simulador.

Problemas:

- o site apresenta números absolutos enquanto a imagem apresenta percentuais;
- “aprendendo” não corresponde claramente a “não operei” e “simulador”;
- uma categoria relevante foi omitida;
- a soma e o significado dos dados não são transparentes;
- o período está desatualizado em relação à data desta análise;
- não há total de respondentes;
- não há metodologia de apuração;
- resultados são autodeclarados e não auditados.

Antes de campanhas:

- corrigir os valores;
- usar percentuais como percentuais;
- informar total de respostas;
- exibir todas as categorias;
- incluir data e ano completos;
- esclarecer que são respostas voluntárias, autodeclaradas e não auditadas;
- evitar manter a seção no ar quando estiver desatualizada;
- validar a apresentação com assessoria jurídica.

### 16.2 Depoimentos e dados pessoais

Foram observados nomes ou identificadores parcialmente visíveis, incluindo:

- Allan;
- Arnaldo Antunes;
- Eduardo;
- Regiano Santos;
- Regina Camargo.

Alguns prints também expõem informações sobre desempenho financeiro, como:

- ganho de R$ 1 mil em cinco dias;
- perda de R$ 2,8 mil seguida de ganho de R$ 3,4 mil;
- duplicação de capital;
- “4 dias 100% de gain”;
- referência a operação “binária”.

Recomendações:

- manter autorização documental específica para uso publicitário do depoimento e imagem;
- anonimizar completamente nomes, fotos e identificadores quando não houver autorização adequada;
- não publicar prints de conversas apenas porque foram enviados em grupo;
- priorizar depoimentos sobre clareza, disciplina, suporte, didática e aprendizado;
- remover ou substituir alegações de ganhos específicos, capital dobrado ou desempenho de 100%;
- revisar especialmente o conteúdo que menciona operação binária;
- manter registro da origem, data e autorização de cada depoimento;
- permitir retirada futura quando cabível.

### 16.3 Alegações gerais

Devem possuir comprovação:

- “1.000+ traders”;
- “trader profissional”;
- “vive do mercado”;
- perfil verificado na Hotmart;
- tempo de atuação informado;
- resultados e estatísticas apresentados.

### 16.4 Revisão regulatória

O site afirma que o instrutor opera ao vivo, mostra sua tela, explica decisões de entrada, gerenciamento e saída e recebe pagamento por assinatura.

A CVM considera que habitualidade, remuneração e linguagem podem caracterizar atividade profissional de análise, dependendo do serviço efetivamente prestado. A simples inclusão de “não é recomendação” não resolve o enquadramento se a prática indicar outra atividade.

Não se conclui neste documento que o serviço esteja irregular. Recomenda-se avaliação jurídica/regulatória especializada antes da ampliação de campanhas.

### 16.5 Posicionamento para anúncios

Priorizar:

- educação;
- método;
- processo;
- disciplina;
- gestão de risco;
- entendimento de mercado;
- ausência de promessa de resultado.

Evitar:

- promessa de renda;
- linguagem de enriquecimento;
- resultados excepcionais como expectativa típica;
- “viver de day trade” como promessa;
- comparação direta entre preço do curso e lucro potencial;
- urgência artificial;
- insinuação de que o produto elimina risco;
- depoimentos de ganhos como peça central da conversão.

---

## 17. Melhorias de experiência e conversão

### 17.1 WhatsApp nas páginas de produto

Os produtos de maior valor podem gerar dúvidas antes da compra. Avaliar um contato secundário após o FAQ, com:

- mensagem pré-preenchida identificando o produto;
- origem do CTA;
- evento de contato separado por produto;
- posição que não concorra visualmente com o checkout principal.

### 17.2 Página de obrigado

Avaliar página própria de obrigado para:

- instruções de acesso;
- próximos passos;
- suporte;
- onboarding;
- oferta complementar responsável.

Não usar a simples visualização dessa página como `Purchase` sem validação e deduplicação, pois recarregamentos e acessos repetidos gerariam compras falsas.

### 17.3 Captura de lead

Atualmente não existe formulário de lead. Uma captura de primeiro contato pode ser avaliada futuramente, mas somente após:

- definir oferta e finalidade;
- obter consentimento específico para comunicação;
- integrar com ferramenta adequada;
- documentar retenção e descadastro;
- separar lead real de simples clique.

### 17.4 Performance

Arquivos de atenção:

- `public/rafael-sala.png`: aproximadamente 1,9 MB;
- `public/semana/enquete.png`: aproximadamente 1,1 MB.

Recomenda-se:

- redimensionamento para o tamanho efetivamente exibido;
- conversão para formato moderno quando compatível;
- carregamento tardio de imagens abaixo da dobra;
- uso consistente da otimização de imagens do Next.js;
- teste em conexão móvel;
- medição de Core Web Vitals antes e depois.

### 17.5 Confiança e transparência

Adicionar de forma consistente:

- identificação empresarial;
- suporte;
- Política de Privacidade e Cookies;
- gerenciamento de preferências;
- termos comerciais;
- informações claras sobre garantia;
- condições da assinatura;
- riscos e limites do conteúdo educacional.

---

## 18. Segurança e governança

### 18.1 Propriedade dos ativos

- Meta Business, conjunto de dados/Pixel e conta de anúncios devem pertencer ao cliente.
- Agência e desenvolvedores recebem somente o acesso necessário.
- Habilitar autenticação em dois fatores.
- Revisar usuários e parceiros periodicamente.
- Não compartilhar contas pessoais.

### 18.2 Segredos

Nunca armazenar em repositório ou documento público:

- token da Conversions API;
- senhas;
- códigos de autenticação;
- chaves privadas;
- certificados;
- credenciais da VPS;
- credenciais da Hotmart ou Meta.

O Pixel ID não é um segredo equivalente a um token, mas ainda deve ser gerenciado de forma organizada.

### 18.3 Cabeçalhos e infraestrutura

Avaliar no Nginx/Cloudflare:

- HSTS, após confirmação de HTTPS em todos os hosts necessários;
- `X-Content-Type-Options`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- Content Security Policy compatível com Meta, Hotmart e TradingView;
- política de `frame-ancestors`;
- remoção de `X-Powered-By`;
- redirecionamento único e definitivo do host `www`;
- logs e prazos de retenção da VPS/Cloudflare.

Uma política CSP deve ser planejada junto com os scripts de mensuração. Uma regra excessivamente restritiva pode bloquear o Pixel; uma regra ampla demais perde valor de segurança.

---

## 19. Plano de testes

### 19.1 Consentimento

Testar em janela limpa:

- primeira visita sem escolha;
- aceitar todos;
- rejeitar não necessários;
- aceitar somente Analytics;
- aceitar publicidade;
- alterar preferência pelo rodapé;
- revogar consentimento;
- nova visita após a escolha;
- expiração ou atualização da versão do consentimento.

Critério principal: antes do aceite de publicidade, não deve haver carregamento ou evento da Meta.

### 19.2 Navegação

Testar:

- acesso direto a cada uma das seis páginas;
- navegação da home para produtos;
- navegação do catálogo para produtos;
- navegação entre produtos;
- botão voltar;
- abertura em nova aba;
- mobile bar das páginas de produto;
- WhatsApp flutuante;
- CTAs repetidos na mesma página;
- páginas 404.

Verificar que cada rota gere apenas um `PageView` e cada visualização de produto apenas um `ViewContent`.

### 19.3 Hotmart

Para cada produto:

- checkout aberto;
- checkout abandonado sem dados;
- checkout abandonado após preenchimento;
- cartão aprovado;
- cartão recusado;
- Pix gerado;
- Pix pago;
- boleto gerado;
- boleto pago;
- reembolso;
- chargeback, se possível em ambiente apropriado;
- order bump;
- upsell/downsell;
- renovação da Sala GL;
- cancelamento de assinatura.

### 19.4 Deduplicação

Quando Web e API enviarem o mesmo evento:

- conferir identificador de evento;
- verificar se a Meta marca os eventos como navegador/servidor sem duplicar conversões;
- comparar quantidade de compras com a Hotmart;
- investigar divergências por método de pagamento.

### 19.5 Atribuição

Executar visitas controladas com UTMs e SCK conhecidos e confirmar:

- campanha no Analytics;
- origem no relatório da Hotmart;
- evento no Gerenciador de Eventos;
- produto e oferta corretos;
- valor e moeda;
- correspondência entre checkout e compra.

---

## 20. Critérios de aceite

O projeto será considerado tecnicamente pronto quando:

- o domínio canônico estiver correto;
- `www` e domínio antigo redirecionarem corretamente;
- sitemap e canonicals estiverem publicados;
- Política de Privacidade/Cookies estiver acessível em todas as páginas;
- o banner permitir aceitar, rejeitar e configurar;
- o Pixel permanecer bloqueado sem consentimento de publicidade;
- a revogação interromper eventos futuros;
- as seis rotas registrarem navegação corretamente;
- as quatro páginas de produto dispararem `ViewContent` com parâmetros consistentes;
- cliques no WhatsApp e checkout forem diferenciados;
- a Hotmart disparar `InitiateCheckout` somente no checkout carregado;
- `Purchase` representar pagamento aprovado;
- pagamentos pendentes não inflarem compras;
- Web/API não duplicarem conversões;
- produto, oferta, valor e moeda estiverem corretos;
- UTMs/SCK aparecerem nos relatórios esperados;
- compras de teste coincidirem com a Hotmart;
- recorrências tiverem tratamento documentado;
- audiências e exclusões estiverem definidas;
- depoimentos e estatísticas tiverem sido revisados;
- responsáveis e acessos estiverem documentados.

---

## 21. Informações necessárias antes da implementação

### 21.1 Meta

- Pixel ID atual;
- confirmação de histórico anterior;
- proprietário do Pixel;
- ID do portfólio empresarial;
- conta de anúncios associada;
- prints da fonte de dados e eventos existentes;
- confirmação de correspondência avançada, se já utilizada.

**Não fornecer:** senha, token, código de autenticação ou acesso pessoal.

### 21.2 Hotmart

Para cada produto:

- nome;
- ID do produto;
- oferta/código da oferta;
- checkout oficial;
- condição de produtor, coprodutor ou afiliado;
- formas de pagamento;
- order bumps;
- upsells/downsell;
- página de obrigado;
- recorrência;
- configuração atual do Pixel;
- prints das opções avançadas, com tokens ocultos.

### 21.3 Decisões comerciais

- O que será considerado compra?
- Receita bruta, valor pago, comissão ou valor líquido?
- Renovações entram em qual relatório?
- Quais produtos serão usados em cross-sell?
- Qual janela de remarketing será adotada?
- Compradores reembolsados devem ser removidos de quais públicos?
- WhatsApp é microconversão ou canal apenas de suporte?

### 21.4 Privacidade

- identificação do controlador;
- CPF/CNPJ conforme validação jurídica;
- canal de privacidade;
- responsável por solicitações LGPD;
- política existente, se houver;
- base e autorização dos depoimentos;
- fornecedores adicionais;
- prazos internos de retenção;
- regiões onde as campanhas serão veiculadas.

### 21.5 Infraestrutura

- bloco sanitizado do Nginx para domínio, `www` e domínio antigo;
- configuração relevante do Cloudflare;
- preferência confirmada pelo domínio sem `www`;
- processo de deploy e limpeza de cache;
- existência de outras landing pages fora deste repositório.

---

## 22. Fases recomendadas

### Fase 0 — Conteúdo e conformidade

- revisar enquete e estatísticas;
- revisar e anonimizar depoimentos;
- comprovar alegações;
- validar enquadramento regulatório;
- definir controlador e canal de privacidade.

### Fase 1 — Domínio, SEO e confiança

- atualizar domínio nos metadados;
- definir canonical;
- redirecionar `www`;
- criar sitemap;
- criar páginas legais;
- revisar rodapés e identificação empresarial.

### Fase 2 — Consentimento

- implementar banner;
- definir categorias;
- bloquear tags por padrão;
- registrar preferências;
- permitir revogação.

### Fase 3 — Mensuração do site

- instalar Analytics;
- instalar Meta Pixel condicionado;
- configurar eventos e parâmetros;
- tratar navegação do Next.js;
- padronizar UTMs e CTAs.

### Fase 4 — Hotmart

- configurar Pixel em cada produto;
- ativar Web/API;
- revisar pagamento pendente versus aprovado;
- revisar valor enviado;
- corrigir SCK;
- validar recorrência e reembolso.

### Fase 5 — Qualidade

- executar matriz de testes;
- comparar Meta, Analytics e Hotmart;
- corrigir duplicidades;
- documentar divergências esperadas;
- aprovar critérios de aceite.

### Fase 6 — Audiências e campanhas

- criar audiências;
- configurar exclusões;
- iniciar remarketing;
- iniciar aquisição otimizada;
- avaliar públicos semelhantes;
- monitorar qualidade dos eventos e retorno.

---

## 23. Riscos principais

| Risco | Impacto | Tratamento recomendado |
|---|---|---|
| Domínio antigo nos metadados | Compartilhamento e SEO inconsistentes | Atualizar domínio e canonical |
| `www` sem redirecionamento | Duplicação de host | Redirecionamento `301` |
| Ausência de consentimento | Risco LGPD e contratual | Bloqueio prévio e gestão de preferências |
| Pixel apenas no site | Compras não rastreadas | Integração Hotmart Web/API |
| Compra disparada em clique | Conversões falsas | `Purchase` somente após aprovação |
| Pix/boleto gerado como compra | ROAS artificial | Diferenciar pagamentos |
| Web/API duplicados | Receita e conversões duplicadas | Deduplicação e testes |
| Renovação como nova aquisição | ROAS inflado | Separar recorrência |
| SCK atual incorreto | Origem comercial errada | Nova taxonomia e testes |
| Depoimentos com nomes | Risco de privacidade/imagem | Autorização ou anonimização |
| Alegações de ganho | Risco jurídico e de reprovação | Substituir por aprendizado/processo |
| Enquete inconsistente | Informação potencialmente enganosa | Corrigir metodologia e valores |
| Coleta excessiva | Risco LGPD e baixa governança | Minimização de eventos e dados |
| Token em código | Incidente de segurança | Segredo somente em ambiente seguro |
| Imagens pesadas | Queda de conversão mobile | Otimização e carregamento tardio |

---

## 24. Decisões pendentes

Antes de iniciar desenvolvimento, aprovar:

1. domínio canônico sem `www`;
2. ferramenta de Analytics;
3. solução de gerenciamento de consentimento;
4. base legal por categoria de tratamento;
5. política para TradingView;
6. definição de compra aprovada;
7. valor usado para ROAS;
8. tratamento de Pix, boleto e PayPal;
9. tratamento de renovações;
10. tratamento de reembolsos;
11. convenção de UTMs e SCK;
12. taxonomia final de eventos;
13. janelas de audiência;
14. autorização ou anonimização dos depoimentos;
15. revisão da seção “Semana da Sala”;
16. parecer jurídico/regulatório sobre a comunicação e o formato da sala ao vivo.

---

## 25. Referências oficiais

- ANPD — Guia Orientativo Cookies e Proteção de Dados Pessoais:  
  https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf/@@display-file/file

- ANPD — Transferência Internacional de Dados:  
  https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados

- ANPD — Direitos dos titulares:  
  https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes

- Hotmart — Configuração do Pixel da Meta:  
  https://help.hotmart.com/pt-br/article/115004826368/como-configurar-o-pixel-da-meta-na-hotmart-

- Hotmart — Opções avançadas do Pixel:  
  https://help.hotmart.com/pt-br/article/6565866201741/como-configuro-as-opc-es-avancadas-do-pixel-de-rastreamento-no-meu-produto-

- Hotmart — Política de Privacidade:  
  https://hotmart.com/pt-br/legal/privacidade-de-dados

- Hotmart — Aviso de Cookies:  
  https://hotmart.com/pt-br/legal/politica-de-cookies

- Hotmart — Relatórios e parâmetros de origem:  
  https://help.hotmart.com/pt-br/article/115006453448/como-acompanho-meus-relatorios-e-analises-na-hotmart-

- CVM — Atuação de influenciadores que recomendam investimentos:  
  https://www.gov.br/cvm/pt-br/assuntos/noticias/2020/area-tecnica-da-cvm-esclarece-duvidas-sobre-atuacao-de-influenciadores-que-recomendam-investimentos-dddc1973876d4cc78c734b8ceeaaa740

- CVM — Consulta a profissionais e alertas sobre ofertas disfarçadas de cursos:  
  https://www.gov.br/investidor/pt-br/ferramentas/consulta-a-profissionais-de-mercado

- TradingView — Dados tratados por widgets:  
  https://www.tradingview.com/widget-docs/faq/general/

- Meta — Informações recebidas de parceiros e ferramentas comerciais:  
  https://www.facebook.com/privacy/policies/uso/

---

## 26. Observação final

Este documento é um plano técnico, operacional e de boas práticas. Ele não constitui parecer jurídico. A redação das políticas, a base legal escolhida, a transferência internacional de dados, o uso de depoimentos e o enquadramento regulatório da atividade devem ser validados por profissional qualificado antes da publicação e da ampliação de tráfego pago.

