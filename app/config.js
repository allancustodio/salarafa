// ============================================================================
// CONFIG CENTRAL — edite tudo aqui. Nenhum outro arquivo precisa ser tocado
// para trocar links, números, telefone, dados da enquete, etc.
// ============================================================================

export const config = {
  // --- Contato / redes ---
  whatsapp: "5514991155513", // formato internacional, só números
  whatsappMsg:
    "Olá Rafael! Vim pelo seu site e quero saber mais sobre a sala e os cursos.",
  instagram: "https://www.instagram.com/rafael.fossalussa/",
  instagramHandle: "@rafael.fossalussa",

  // --- Prova de comunidade ---
  tradersFormados: "1.000+",

  // --- CNPI (analista da sala) — TROQUE O NÚMERO QUANDO CONFIRMAR ---
  cnpiNome: "Ricardo Bueno",
  cnpiNumero: "[a confirmar]", // ex.: "CNPI 1234"

  // --- Produtos / checkouts ---
  produtos: {
    sala: {
      nome: "Sala Rafael Fossalussa",
      preco: "R$ 200",
      periodo: "/mês",
      nota: "Assinatura semestral · 6 meses",
      url: "https://hotmart.com/pt-br/marketplace/produtos/sala-gl-2-0/X102809916R?sck=HOTMART_MEM_CA",
    },
    salaLive: {
      nome: "Sala ao Vivo",
      preco: "R$ 200/mês (Semestral)",
      desc: "Transmissão ao vivo diária com operações reais e análise em tempo real.",
      url: "https://hotmart.com/pt-br/marketplace/produtos/sala-gl-2-0/X102809916R?sck=HOTMART_PRODUCT_PAGE",
    },
    scalp: {
      nome: "Método Scalping",
      preco: "R$ 899",
      desc: "Operações rápidas, leitura de fluxo e execução com critério.",
      url: "https://hotmart.com/pt-br/marketplace/produtos/metodo-scalping/Q95155469K?sck=HOTMART_MEM_CA",
    },
    leilao: {
      nome: "Leilão do Dólar",
      preco: "R$ 1.299,00",
      desc: "O leilão do dólar futuro destrinchado, passo a passo.",
      url: "https://hotmart.com/pt-br/marketplace/produtos/metodo-leilao-dolar/Q95182127U?sck=HOTMART_PRODUCT_PAGE", // LINK QUEBRADO — reemitir na Hotmart e trocar aqui
    },
    gl2: {
      nome: "Gradiente Linear 2.0",
      preco: "R$ 1.500",
      desc: "Meu método completo, do zero ao avançado.",
      url: "https://hotmart.com/pt-br/club/rafaelfossalussa/gradiente-linear-2-0/C103100615H",
    },
  },

  // --- A SEMANA DA SALA (edite toda semana) ---
  // Coloque o print da enquete em: public/semana/enquete.png
  semana: {
    referencia: "Semana de 07 a 11 de julho",
    positivo: 18,
    negativo: 6,
    aprendendo: 11,
    print: "/semana/enquete.png", // se o arquivo não existir, aparece um placeholder
  },
};
