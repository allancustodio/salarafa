import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Check, LockKeyhole, ShieldCheck } from "lucide-react";

import { products } from "../produto/data";
import styles from "./catalog.module.css";

export const metadata = {
  title: "Cursos e Sala | Rafael Fossalussa",
  description:
    "Conheça a Sala Rafael Fossalussa e os treinamentos Gradiente Linear 2.0, Método Scalping e Abertura no Dólar.",
  openGraph: {
    title: "Cursos e Sala | Rafael Fossalussa",
    description: "Escolha seu próximo passo no mercado com Rafael Fossalussa.",
    images: [{ url: "/rafa_preview.png" }],
  },
};

const catalog = [
  {
    ...products["sala-gl"],
    label: "Sala ao vivo",
    description: "Acompanhe o mercado em tempo real, entenda as leituras e desenvolva seu processo ao lado do Rafael.",
    button: "Ver Sala",
    featured: true,
  },
  {
    ...products["gradiente-linear"],
    label: "Método completo",
    description: "Organize entradas, saídas, gestão de risco e análise estatística em um processo semiautomatizado.",
    button: "Conhecer o método",
  },
  {
    ...products["metodo-scalping"],
    label: "Operações rápidas",
    description: "Aprenda leitura de fluxo, critérios de entrada e gestão para operar movimentos curtos com disciplina.",
    button: "Ver treinamento",
  },
  {
    ...products["abertura-dolar"],
    label: "Abertura do mercado",
    description: "Entenda a formação do preço no leilão do dólar e comece o pregão com cenário, critério e plano.",
    button: "Ver treinamento",
  },
];

function ProductCard({ product, index }) {
  return (
    <article
      className={`${styles.card} ${product.featured ? styles.featured : ""}`}
      style={{ "--accent": product.accent, "--accent-rgb": product.accentRgb }}
    >
      {product.featured ? <span className={styles.featuredTag}>Mais acompanhamento</span> : null}

      <div className={`${styles.visual} ${index % 2 ? styles.tiltRight : styles.tiltLeft}`}>
        <div className={styles.imageFrame}>
          <Image
            src={product.image}
            alt={`Capa do ${product.name}`}
            fill
            sizes="(max-width: 720px) 86vw, 520px"
            className={styles.productImage}
            priority={index < 2}
          />
        </div>
        <span className={styles.visualBadge}>
          <span /> Rafael Fossalussa
        </span>
      </div>

      <div className={styles.cardBody}>
        <span className={styles.label}>{product.label}</span>
        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <div className={styles.priceRow}>
          <div className={styles.price}>
            <small>Investimento</small>
            <strong>
              {product.price}
              <em>{product.priceSuffix}</em>
            </strong>
            <span>{product.priceNote}</span>
          </div>
          <span className={styles.guarantee}><ShieldCheck size={15} /> 7 dias</span>
        </div>

        <Link href={`/produto/${product.slug}`} className={styles.cardButton}>
          {product.button} <ArrowRight size={18} />
        </Link>
        <span className={styles.buttonNote}>Veja todos os detalhes antes de comprar</span>
      </div>
    </article>
  );
}

export default function CoursesCatalog() {
  return (
    <div className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Voltar ao site de Rafael Fossalussa">
          <span className={styles.brandMark}>RF</span>
          <span>
            <b>Rafael Fossalussa</b>
            <small>Trader &amp; Educador</small>
          </span>
        </Link>
        <Link href="/" className={styles.siteLink}>Ver site completo <ArrowRight size={14} /></Link>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}><span /> Sala e treinamentos</span>
              <h1>Escolha seu <em>próximo passo</em> no mercado.</h1>
              <p>
                Seja para acompanhar o pregão ao vivo ou aprofundar uma técnica específica,
                encontre aqui o caminho que faz mais sentido para o seu momento.
              </p>
              <div className={styles.heroProof}>
                <span><Check size={15} /> Conteúdo direto ao ponto</span>
                <span><BarChart3 size={15} /> Foco em método e gestão</span>
              </div>
            </div>
            <div className={styles.heroPhoto}>
              <Image
                src="/rafael-hero.png"
                alt="Rafael Fossalussa"
                fill
                priority
                sizes="(max-width: 760px) 290px, 390px"
              />
              <div className={styles.photoCaption}>
                <span>Aprenda com quem vive o mercado</span>
                <strong>Rafael Fossalussa</strong>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.catalog}>
          <div className={styles.catalogHead}>
            <span>Encontre o seu caminho</span>
            <h2>Uma decisão por vez.</h2>
            <p>Clique em um produto para conhecer a proposta completa, entender para quem é e tirar suas dúvidas.</p>
          </div>

          <div className={styles.cards}>
            {catalog.map((product, index) => (
              <ProductCard product={product} index={index} key={product.slug} />
            ))}
          </div>
        </section>

        <section className={styles.help}>
          <div className={styles.helpIcon}><BarChart3 /></div>
          <div>
            <span>Ainda não sabe por onde começar?</span>
            <h2>Comece pelo problema que você quer resolver agora.</h2>
          </div>
          <div className={styles.helpItems}>
            <p><b>Quero acompanhamento diário</b><Link href="/produto/sala-gl">Sala Rafael Fossalussa <ArrowRight size={14} /></Link></p>
            <p><b>Quero um método estruturado</b><Link href="/produto/gradiente-linear">Gradiente Linear 2.0 <ArrowRight size={14} /></Link></p>
            <p><b>Quero melhorar operações curtas</b><Link href="/produto/metodo-scalping">Método Scalping <ArrowRight size={14} /></Link></p>
            <p><b>Quero entender a abertura</b><Link href="/produto/abertura-dolar">Abertura no Dólar <ArrowRight size={14} /></Link></p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <strong>Rafael Fossalussa</strong>
          <span>Método, gestão e disciplina.</span>
        </div>
        <p>
          Todo o conteúdo tem caráter exclusivamente educacional e informativo e não constitui recomendação
          de investimento. Operações em renda variável envolvem risco de perda. Resultados passados não
          garantem resultados futuros.
        </p>
        <span className={styles.secure}><LockKeyhole size={13} /> Compras processadas pela Hotmart</span>
      </footer>
    </div>
  );
}

