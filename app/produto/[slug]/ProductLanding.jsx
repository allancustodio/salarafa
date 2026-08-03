import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Clock3,
  ExternalLink,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import { productOrder, products } from "../data";
import styles from "./product.module.css";

const testimonialFiles = [
  "3450656c-2428-48d8-836c-d2ef99fea70a.JPG",
  "459bc206-8393-442d-8d9e-a5b30051a4d3.JPG",
  "ca226fad-d774-4f2c-897a-9318d0851f37.JPG",
  "c7ccbbd9-4285-4bbf-bf12-4d8300d7e725.JPG",
  "60aa89ff-3ead-4a5d-b3a6-0e830793b78c.JPG",
  "453b71d8-b254-4be9-9631-d919927201cc.JPG",
];

function CheckoutButton({ product, secondary = false, compact = false }) {
  return (
    <a
      className={`${styles.checkoutButton} ${secondary ? styles.checkoutSecondary : ""} ${compact ? styles.checkoutCompact : ""}`}
      href={product.checkout}
      data-product={product.slug}
    >
      <span>{compact ? "Garantir acesso" : product.cta}</span>
      <ArrowRight aria-hidden="true" size={compact ? 17 : 20} />
    </a>
  );
}

function SectionHeading({ label, title, text, center = false }) {
  return (
    <div className={`${styles.sectionHeading} ${center ? styles.center : ""}`}>
      <span className={styles.eyebrow}>{label}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function ProductLanding({ product }) {
  const otherProducts = productOrder.filter((slug) => slug !== product.slug).map((slug) => products[slug]);

  return (
    <div
      className={styles.page}
      style={{ "--product-accent": product.accent, "--product-accent-rgb": product.accentRgb }}
    >
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand} aria-label="Rafael Fossalussa — página inicial">
            <span className={styles.brandMark}>RF</span>
            <span>
              <b>Rafael Fossalussa</b>
              <small>Trader &amp; Educador</small>
            </span>
          </Link>
          <nav className={styles.headerNav} aria-label="Navegação da página">
            <a href="#conteudo">O que você aprende</a>
            <a href="#para-quem">Para quem é</a>
            <a href="#garantia">Garantia</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <CheckoutButton product={product} compact />
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.heroEyebrow}>
                <span /> {product.eyebrow}
              </div>
              <p className={styles.category}>{product.category} por Rafael Fossalussa</p>
              <h1>
                {product.headline} <em>{product.highlight}</em>
              </h1>
              <p className={styles.heroSummary}>{product.summary}</p>
              <ul className={styles.heroBullets}>
                {product.heroBullets.map((item) => (
                  <li key={item}>
                    <span><Check size={15} strokeWidth={3} /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.heroActions}>
                <CheckoutButton product={product} />
                <a href="#conteudo" className={styles.learnMore}>
                  Ver todos os detalhes <ArrowDown size={17} />
                </a>
              </div>
              <div className={styles.heroTrust}>
                <span><ShieldCheck size={17} /> 7 dias de garantia</span>
                <span><LockKeyhole size={17} /> Checkout seguro Hotmart</span>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.productCard}>
                <div className={styles.productImageWrap}>
                  <Image
                    src={product.image}
                    alt={`Capa do ${product.name}`}
                    fill
                    priority
                    sizes="(max-width: 900px) 82vw, 430px"
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productCardBody}>
                  <div>
                    <span>Oferta atual</span>
                    <strong>{product.price}<small>{product.priceSuffix}</small></strong>
                    <p>{product.priceNote}</p>
                  </div>
                  <div className={styles.hotmartTag}><LockKeyhole size={14} /> compra pela Hotmart</div>
                </div>
              </div>
              <div className={styles.marketBadge}>
                <span className={styles.liveDot} /> Método • Gestão • Disciplina
              </div>
            </div>
          </div>
        </section>

        <div className={styles.trustStrip}>
          <div>
            <span><ShieldCheck /> 7 dias</span><small>de garantia</small>
          </div>
          <div>
            <span><Clock3 /> Acesso digital</span><small>após a aprovação</small>
          </div>
          <div>
            <span><LockKeyhole /> Hotmart</span><small>pagamento protegido</small>
          </div>
          <div>
            <span><BarChart3 /> Conteúdo prático</span><small>focado no processo</small>
          </div>
        </div>

        <section className={`${styles.section} ${styles.problemSection}`}>
          <div className={styles.container}>
            <SectionHeading label="O ponto de virada" title={product.problemTitle} text={product.problemText} />
            <div className={styles.painGrid}>
              {product.pains.map((pain) => (
                <article className={styles.painCard} key={pain.number}>
                  <span>{pain.number}</span>
                  <h3>{pain.title}</h3>
                  <p>{pain.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.contentSection}`} id="conteudo">
          <div className={styles.container}>
            <div className={styles.solutionIntro}>
              <div>
                <span className={styles.eyebrow}>O método</span>
                <h2>{product.solutionTitle}</h2>
              </div>
              <p>{product.solutionText}</p>
            </div>
            <div className={styles.learnGrid}>
              {product.learn.map((item, index) => (
                <article className={styles.learnCard} key={item.title}>
                  <span className={styles.learnIcon}>{index % 2 === 0 ? <Target /> : <Sparkles />}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.inlineCta}>
              <div>
                <strong>Pronto para transformar informação em processo?</strong>
                <span>Comece com acesso protegido pela Hotmart.</span>
              </div>
              <CheckoutButton product={product} compact />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.stepsSection}`}>
          <div className={styles.container}>
            <SectionHeading label="Como funciona" title="Do conteúdo à prática, sem pular etapas." center />
            <div className={styles.steps}>
              {product.steps.map((step, index) => (
                <article key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  {index < product.steps.length - 1 ? <ChevronRight className={styles.stepArrow} /> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.audienceSection}`} id="para-quem">
          <div className={`${styles.container} ${styles.audienceGrid}`}>
            <div>
              <SectionHeading label="Para quem é" title="Faz sentido para você se..." />
              <ul className={styles.audienceList}>
                {product.audience.map((item) => (
                  <li key={item}><span><Check size={17} /></span>{item}</li>
                ))}
              </ul>
            </div>
            <aside className={styles.notForCard}>
              <span>Uma conversa honesta</span>
              <h3>Este produto não vende certeza.</h3>
              <p>{product.notFor}</p>
              <div><BarChart3 size={18} /> Resultado é consequência de processo, não promessa.</div>
            </aside>
          </div>
        </section>

        <section className={`${styles.section} ${styles.authorSection}`}>
          <div className={`${styles.container} ${styles.authorGrid}`}>
            <div className={styles.authorImage}>
              <Image src="/rafael-historia.jpg" alt="Rafael Fossalussa em sua trajetória profissional" fill sizes="(max-width: 800px) 92vw, 500px" />
            </div>
            <div className={styles.authorCopy}>
              <span className={styles.eyebrow}>Quem ensina</span>
              <h2>Rafael não começou sabendo. Começou insistindo.</h2>
              <p className={styles.authorLead}>Antes de viver o mercado, Rafael vendia verduras e carregava caixotes. Depois, enfrentou perdas importantes até entender que o caminho não era procurar uma operação perfeita — era construir um processo.</p>
              <p>Hoje, seu trabalho reúne scalping, leilão de abertura e Gradiente Linear com uma abordagem direta, prática e apoiada em gestão e estatística. Na Hotmart desde 2022, Rafael é um criador com perfil verificado.</p>
              <div className={styles.authorStats}>
                <div><strong>2022</strong><span>na Hotmart</span></div>
                <div><strong>3 métodos</strong><span>de especialidade</span></div>
                <div><strong>1 foco</strong><span>processo claro</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.testimonialSection}`}>
          <div className={styles.container}>
            <SectionHeading
              label="Relatos da comunidade"
              title="Quem estuda o processo percebe a diferença."
              text="Mensagens compartilhadas por alunos e membros da comunidade de Rafael. Experiências individuais; resultados variam."
              center
            />
            <div className={styles.testimonialRail}>
              {testimonialFiles.map((file, index) => (
                <a href={`/depoimentos/${file}`} target="_blank" rel="noopener noreferrer" key={file} className={styles.testimonial}>
                  <img src={`/depoimentos/${file}`} alt={`Relato de aluno ${index + 1}`} loading="lazy" />
                  <span>Ampliar relato <ExternalLink size={13} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.offerSection}`} id="garantia">
          <div className={`${styles.container} ${styles.offerGrid}`}>
            <div className={styles.offerCopy}>
              <span className={styles.eyebrow}>Sua decisão, protegida</span>
              <h2>Conheça o conteúdo por 7 dias.</h2>
              <p>Você tem 7 dias de garantia a partir da compra. Se o produto não fizer sentido para você, a solicitação de reembolso pode ser feita pelos canais da Hotmart dentro desse prazo.</p>
              <div className={styles.guaranteeSeal}><ShieldCheck size={34} /><span><strong>7 dias</strong> de garantia Hotmart</span></div>
            </div>
            <div className={styles.offerCard}>
              <span className={styles.offerLabel}>{product.name}</span>
              <ul>
                {product.heroBullets.map((item) => <li key={item}><Check size={16} />{item}</li>)}
                <li><Check size={16} />Acesso digital pela plataforma Hotmart</li>
              </ul>
              <div className={styles.offerPrice}>
                <small>Oferta atual</small>
                <strong>{product.price}<em>{product.priceSuffix}</em></strong>
                <span>{product.priceNote}</span>
              </div>
              <CheckoutButton product={product} />
              <p className={styles.offerMicrocopy}><LockKeyhole size={14} /> {product.microcopy}</p>
              <div className={styles.paymentMethods}>Cartão de crédito • Pix e demais opções exibidas no checkout</div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`} id="duvidas">
          <div className={`${styles.container} ${styles.faqGrid}`}>
            <div>
              <span className={styles.eyebrow}>Dúvidas frequentes</span>
              <h2>Antes de decidir, confira.</h2>
              <p>Se ainda restar uma dúvida específica, fale com a equipe pelo canal disponível no site principal.</p>
            </div>
            <div className={styles.faqList}>
              {product.faqs.map((item, index) => (
                <details key={item.q} open={index === 0}>
                  <summary>{item.q}<span>+</span></summary>
                  <p>{item.a}</p>
                </details>
              ))}
              <details>
                <summary>Qual é o prazo de garantia?<span>+</span></summary>
                <p>O produto possui 7 dias de garantia, conforme informado na página oficial e no checkout da Hotmart.</p>
              </details>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalGlow} aria-hidden="true" />
          <div className={styles.container}>
            <span>{product.eyebrow}</span>
            <h2>{product.highlight}</h2>
            <p>Você não precisa de mais uma promessa. Precisa de um processo que consiga compreender, praticar e repetir.</p>
            <CheckoutButton product={product} />
            <small><LockKeyhole size={13} /> Compra processada com segurança pela Hotmart</small>
          </div>
        </section>

        <section className={styles.moreProducts}>
          <div className={styles.container}>
            <div className={styles.moreHeader}>
              <div><span className={styles.eyebrow}>Outros caminhos</span><h2>Encontre o próximo passo certo.</h2></div>
              <Link href="/">Ver site completo <ArrowRight size={16} /></Link>
            </div>
            <div className={styles.moreGrid}>
              {otherProducts.map((item) => (
                <Link href={`/produto/${item.slug}`} key={item.slug} className={styles.moreCard}>
                  <div className={styles.moreImage}><Image src={item.image} alt="" fill sizes="(max-width: 700px) 90vw, 320px" /></div>
                  <span>{item.category}</span>
                  <h3>{item.shortName}</h3>
                  <p>Conhecer a página <ArrowRight size={15} /></p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}><strong>Rafael Fossalussa</strong><span>Trader &amp; Educador</span></div>
          <p className={styles.legal}>
            <b>Aviso legal:</b> Todo o conteúdo tem caráter exclusivamente educacional e informativo e não constitui recomendação, consultoria ou oferta de compra ou venda de ativos. Operações em renda variável envolvem risco de perda, inclusive do capital investido. Resultados passados e relatos individuais não garantem resultados futuros.
          </p>
          <div className={styles.footerBottom}><span>© 2026 Rafael Fossalussa. Todos os direitos reservados.</span><Link href="/">Voltar ao site principal</Link></div>
        </div>
      </footer>

      <div className={styles.mobileBar}>
        <div><span>{product.price}</span><small>{product.priceSuffix}</small></div>
        <CheckoutButton product={product} compact />
      </div>
    </div>
  );
}
