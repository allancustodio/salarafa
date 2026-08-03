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

  // --- Produtos / landing pages ---
  produtos: {
    sala: {
      nome: "Sala Rafael Fossalussa",
      preco: "R$ 200",
      periodo: "/mês",
      nota: "Plano semestral · 6 meses",
      desc: "Transmissão ao vivo diária com operações reais e análise em tempo real.",
      ctaLabel: "Ver Sala",
      url: "/produto/sala-gl",
    },
    scalp: {
      nome: "Método Scalping",
      preco: "R$ 899",
      desc: "Operações rápidas, leitura de fluxo e execução com critério.",
      url: "/produto/metodo-scalping",
    },
    leilao: {
      nome: "Leilão do Dólar",
      preco: "R$ 1.299,00",
      desc: "O leilão do dólar futuro destrinchado, passo a passo.",
      url: "/produto/abertura-dolar",
    },
    gl2: {
      nome: "Gradiente Linear 2.0",
      preco: "R$ 1.499",
      desc: "Meu método completo, do zero ao avançado.",
      url: "/produto/gradiente-linear",
    },
  },

  // --- A SEMANA DA SALA (edite toda semana) ---
  // Coloque o print da enquete em: public/semana/enquete.png
  semana: {
    referencia: "Semana de 07 a 11 de julho",
    positivo:74,
    negativo: 1,
    aprendendo: 5,
    print: "/semana/enquete.png", // se o arquivo não existir, aparece um placeholder
    historico: [
      { semana: "24-28 jun", gain: 16, loss: 5, nao_operei: 8, simulador: 12 },
      { semana: "01-05 jul", gain: 17, loss: 7, nao_operei: 9, simulador: 10 },
      { semana: "08-12 jul", gain: 19, loss: 4, nao_operei: 6, simulador: 14 },
      { semana: "15-19 jul", gain: 18, loss: 6, nao_operei: 11, simulador: 9 }, // semana atual
    ],
  },
};
