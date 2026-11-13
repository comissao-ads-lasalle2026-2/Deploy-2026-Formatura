/**
 * PORTAL DA FORMATURA - ANÁLISE E DESENVOLVIMENTO DE SISTEMAS (ADS)
 * UNILASALLE 2026/2 - Standart com Quadro
 * Base de dados atualizada em tempo real / via exportações do WhatsApp
 */

const GRADUATION_DATA = {
  meta: {
    curso: "Análise e Desenvolvimento de Sistemas (ADS)",
    instituicao: "Universidade La Salle - Canoas/RS",
    semestre: "2026/2",
    grupoWhats: "TI + ENGENHARIAS 2026/2 - standart com quadro",
    pacoteEscolhido: "Standard com Quadro (R$ 1.200,00)",
    ultimaAtualizacao: "13/11/2026 às 15:00",
    contagemRegressivaAlvo: "2026-11-16T18:30:00-03:00" // Próximo evento: Apitaço ADS
  },

  // Alertas urgentes exibidos no topo da página
  avisosUrgentes: [
    {
      id: "urgente-apitaco",
      tipo: "danger", // danger, warning, info
      badge: "PRÓXIMA SEGUNDA-FEIRA",
      titulo: "Apitaço de ADS Confirmado: 16/11 (Segunda) às 19h",
      descricao: "Chegar na Sala Google às 18h30 (30 min de antecedência). Convidaremos o Paraninfo Prof. Mozart Lemos e a Homenageada Tutora Priscila Gonçalves. Levar apitos próprios!",
      linkAcao: "#apitaco",
      textoAcao: "Ver Detalhes do Apitaço"
    },
    {
      id: "urgente-votacao",
      tipo: "warning",
      badge: "VOTAÇÃO EM ANDAMENTO",
      titulo: "Definição do Modelo do Vídeo de Homenagem aos Familiares (Até 20/11)",
      descricao: "Precisamos decidir em consenso entre todas as engenharias/TI: Modelo Árvore (Digital) ou Modelo Cartaz (Presencial na Prova de Togas).",
      linkAcao: "#votacao",
      textoAcao: "Ver Modelos & Votar"
    }
  ],

  // Destaques e estatísticas rápidas
  estatisticas: [
    { label: "Pacote ADS Fechado", valor: "Standard c/ Quadro", detalhe: "R$ 1.200,00" },
    { label: "Próximo Marco", valor: "Apitaço ADS", detalhe: "16/11 às 19h (Sala Google)" },
    { label: "Prova de Togas", valor: "12/12 Manhã", detalhe: "A partir das 09h" },
    { label: "Colação de Grau", valor: "06/03 às 15h", detalhe: "Ensaio: 03/03 às 19h" }
  ],

  // Linha do tempo oficial dos eventos
  cronograma: [
    {
      id: 1,
      titulo: "Definição do Pacote de Formatura",
      data: "24/09/2026",
      hora: "16:07",
      status: "concluido", // concluido, atual, futuro
      badge: "Concluído",
      resumo: "Turma de ADS e demais engenharias aprovaram por unanimidade o Pacote Standard com Quadro (R$ 1.200,00).",
      focoAds: true
    },
    {
      id: 2,
      titulo: "Período de Abertura de Requerimento & Contratação (CASA)",
      data: "07/10 a 04/11/2026",
      hora: "Prazo encerrado",
      status: "concluido",
      badge: "Concluído",
      resumo: "Inscrições oficiais de formandos realizadas pelo portal CASA da Universidade La Salle.",
      focoAds: false
    },
    {
      id: 3,
      titulo: "Votação do Modelo do Vídeo de Homenagem",
      data: "13/11 a 20/11/2026",
      hora: "Até 20/11",
      status: "atual",
      badge: "Ação Necessária",
      resumo: "Consenso entre os cursos para escolha entre Modelo Árvore (Digital) vs Modelo Cartaz (Presencial na Prova de Togas).",
      focoAds: true
    },
    {
      id: 4,
      titulo: "Apitaço ADS (Convite Paraninfo & Homenageada)",
      data: "16/11/2026",
      hora: "19:00 (Chegar 18:30)",
      status: "atual",
      badge: "IMPERDÍVEL",
      resumo: "Ponto de encontro na Sala Google. Entrega de convites para Prof. Mozart (Prédio 15, Sala 801) e Tutora Priscila (Prédio 1, 6º andar).",
      focoAds: true
    },
    {
      id: 5,
      titulo: "Prova do ENADE",
      data: "29/11/2026",
      hora: "Dia todo",
      status: "futuro",
      badge: "Acadêmico",
      resumo: "Atenção formandos convocados para o Exame Nacional de Desempenho dos Estudantes.",
      focoAds: true
    },
    {
      id: 6,
      titulo: "Prova de Togas Oficial",
      data: "12/12/2026",
      hora: "A partir das 09:00 (Manhã)",
      status: "futuro",
      badge: "Marco Oficial",
      resumo: "Sessão oficial com a SP Produtora no campus. Fotos individuais, turma e com professores.",
      focoAds: false
    },
    {
      id: 7,
      titulo: "Prazo Final: Upload de Fotos e Músicas",
      data: "24/01/2027",
      hora: "23:59",
      status: "futuro",
      badge: "Prazo Crítico",
      resumo: "Envio obrigatório no Portal da SP Produtora da música de entrada individual (MP3) e foto pessoal para o telão.",
      focoAds: false
    },
    {
      id: 8,
      titulo: "Celebração Ecumênica",
      data: "02/03/2027",
      hora: "A definir",
      status: "futuro",
      badge: "Celebração",
      resumo: "Culto/celebração ecumênica dos formandos pré-colação.",
      focoAds: false
    },
    {
      id: 9,
      titulo: "Ensaio Geral da Solenidade",
      data: "03/03/2027",
      hora: "19:00",
      status: "futuro",
      badge: "Obrigatório",
      resumo: "Alinhamento das posições, entradas, juramento e oradores no local da formatura.",
      focoAds: false
    },
    {
      id: 10,
      titulo: "Solenidade Oficial de Colação de Grau",
      data: "06/03/2027",
      hora: "15:00",
      status: "futuro",
      badge: "GRANDE DIA",
      resumo: "Cerimônia solene de formatura no Centro de Eventos Unilasalle. O grande momento de vestir a toga e pegar o canudo!",
      focoAds: false
    }
  ],

  // Detalhes do Apitaço (específico para ADS)
  apitacoAds: {
    data: "Segunda-feira, 16 de Novembro de 2026",
    horarioInicio: "19h00",
    horarioChegada: "18h30 (30 minutos de antecedência)",
    pontoEncontro: "Sala Google (Unilasalle)",
    homenageados: [
      {
        papel: "Paraninfo",
        nome: "Prof. Mozart Lemos de Siqueira",
        localizacao: "Prédio 15 – Sala 801"
      },
      {
        papel: "Homenageada",
        nome: "Tutora Priscila Gonçalves",
        localizacao: "Prédio 1 – 6º andar"
      }
    ],
    orientacoes: [
      "A produtora fornecerá acessórios e adereços na Sala Google para entrarmos no clima da festa.",
      "Cada formando deve levar seu próprio apito (por motivos de higiene, a produtora não fornece).",
      "Sugestão da Unilasalle: providenciar faixas personalizadas para o Paraninfo e a Homenageada como lembrança.",
      "A produtora fará o registro fotográfico oficial de toda a comemoração.",
      "Pontualidade é fundamental para não atrasar a passagem nas salas de aula."
    ]
  },

  // Votação do vídeo dos familiares
  votacaoVideo: {
    prazo: "Até dia 20/11/2026 (Definição pela manhã de 21/11)",
    tipoDecisao: "Consenso geral entre todos os cursos da nossa solenidade (TI + Engenharias)",
    opcoes: [
      {
        id: "arvore",
        nome: "Modelo Árvore Genealógica (Digital)",
        descricao: "Não requer gravação presencial no dia da prova de togas. Cada formando cria um mosaico horizontal em JPG com até 6 fotos de familiares e sobe diretamente no portal da SP Produtora. Montagem 100% digital.",
        vantagens: "Mais prático, sem correria no dia da prova de toga, ideal para quem tem familiares distantes.",
        videoUrl: "https://vimeo.com/1044854930/750971b00a",
        embedId: "1044854930"
      },
      {
        id: "cartaz",
        nome: "Modelo Cartaz de Fotos (Presencial)",
        descricao: "Cada formando confecciona fisicamente um cartaz em folha A3 contendo até 6 fotos e uma frase de homenagem legível. Leva pronto no dia da Prova de Togas para gravação individual em vídeo.",
        vantagens: "Mais emotivo no vídeo com o formando segurando o cartaz na tela.",
        videoUrl: "https://vimeo.com/1046947056/25d66cb1de",
        embedId: "1046947056"
      }
    ]
  },

  // Regras de Músicas e Fotos
  regrasMidia: {
    prazoLimite: "24/01/2027",
    plataforma: "Portal do Formando SP Produtora",
    musicaIndividual: {
      formato: "Arquivo MP3",
      tamanhoMaximo: "8 MB",
      qualidadeRecomendada: "160 kbps ou superior",
      tempoAparecimento: "Aproximadamente 30 segundos ao ser chamado ao palco",
      configuracao: "O formando faz upload do MP3 no portal e utiliza o mini player interno para marcar o minuto/segundo exato de início da música. Deixar pelo menos 1m30s de margem de segurança restante.",
      proibicoes: [
        "Letras com palavras impróprias ou de baixo calão",
        "Apologia a bebidas alcoólicas, substâncias ilícitas ou crimes",
        "Incitação à violência, discriminação ou preconceito",
        "Referências e jingles político-partidários",
        "Hinos de times de futebol"
      ]
    },
    fotoPessoal: {
      descricao: "Aparece no telão da solenidade em composição com a foto oficial de toga.",
      especificacoes: "Pode ser 1 foto significativa (infância, momentos com família, viagem) ou um mosaico com até 3 imagens dentro dela.",
      restricoes: "EVITAR rigorosamente roupas de banho/praia e exposição explícita de bebidas alcoólicas, pois a imagem é projetada em alta definição no telão da cerimônia solene."
    },
    musicasColetivas: {
      descricao: "A comissão de formatura deve enviar à produtora links do YouTube para:",
      itens: [
        "1. Música da entrada geral das turmas na solenidade",
        "2. Música de fundo para o vídeo de homenagem aos familiares",
        "3. Música animada para a tradicional jogada do chapéu (encerramento)"
      ]
    }
  },

  // Prova de Togas e Regras de Fotógrafo Particular
  provaToga: {
    data: "12 de Dezembro de 2026 (Sábado de Manhã)",
    horario: "A partir das 09h00",
    convidados: "Até 8 pessoas permitidas no campus",
    familyDayEstudio: "Possibilidade de agendar no Estúdio SP Produtora (permite até 10 familiares e 1 pet). Agendamento via WhatsApp: (51) 98210-0021.",
    regrasFotografoParticular: [
      "Prioridade Absoluta: o cronograma oficial da produtora vem primeiro. O formando NÃO pode se afastar com seu fotógrafo a ponto de perder as fotos coletivas de turma.",
      "Acesso Exclusivo: aos estúdios oficiais montados no local, somente entram os formandos, equipe da produtora e professores.",
      "Uso de Chapéu/Canudo da Produtora: é exclusivo da SP Produtora. Fotógrafo particular DEVE levar seu próprio chapéu/canudo se quiser fotos extras.",
      "Troca de Roupa: após a foto oficial de toga, quem for participar da foto de camiseta de turma deve trocar de roupa imediatamente sem reter a toga.",
      "Locais Autorizados: consultar as áreas livres do campus permitidas para fotógrafos externos."
    ]
  },

  // Feed de Atualizações (extraído do chat do WhatsApp com contexto e data)
  atualizacoesMural: [
    {
      id: "att-1311",
      data: "13/11/2026",
      hora: "12:07",
      autor: "Paola (SP Produtora)",
      tag: "Produtora",
      titulo: "Orientações Oficiais: Vídeo de Homenagem, Músicas, Fotos e Prova de Togas",
      conteudo: "Publicadas as instruções detalhadas para o upload de fotos pessoais e músicas de entrada no Portal da SP Produtora até 24/01/2027. Aberta votação de consenso para escolha do modelo do vídeo de pais (Árvore vs Cartaz) até 20/11.",
      linkWhats: "#votacao",
      relevanteAds: true
    },
    {
      id: "att-0911",
      data: "09/11/2026",
      hora: "16:28",
      autor: "Setor de Eventos Unilasalle",
      tag: "Unilasalle",
      titulo: "Cronograma e Ponto de Encontro do Apitaço",
      conteudo: "Definido o ponto de encontro de todas as turmas na Sala Google com 30 minutos de antecedência. Solicitada a colaboração com pontualidade para registro fotográfico pela produtora.",
      linkWhats: "#apitaco",
      relevanteAds: true
    },
    {
      id: "att-2910",
      data: "29/10/2026",
      hora: "17:37",
      autor: "Setor de Eventos Unilasalle",
      tag: "ADS Exclusivo",
      titulo: "Definição Oficial da Data do Apitaço de ADS",
      conteudo: "Confirmado: Análise e Desenvolvimento de Sistemas fará seu apitaço no dia 16/11 às 19h. Homenageados: Prof. Mozart Lemos (Prédio 15, Sala 801) e Tutora Priscila Gonçalves (Prédio 1, 6º andar).",
      linkWhats: "#apitaco",
      relevanteAds: true
    },
    {
      id: "att-2810",
      data: "28/10/2026",
      hora: "11:59",
      autor: "Setor de Eventos Unilasalle",
      tag: "Financeiro",
      titulo: "Prazos de Pagamento e Atendimento CASA",
      conteudo: "Para dúvidas financeiras e emissão de boletos dos pacotes, o contato deve ser feito respondendo ao ticket do chamado no CASA Unilasalle.",
      linkWhats: "https://casa.unilasalle.edu.br",
      relevanteAds: false
    },
    {
      id: "att-2409",
      data: "24/09/2026",
      hora: "16:07",
      autor: "Comissão ADS",
      tag: "ADS Exclusivo",
      titulo: "Escolha do Pacote da Formatura de ADS",
      conteudo: "Grupo de Análise e Desenvolvimento de Sistemas definiu por adesão ao Pacote Standard com Quadro pelo valor de R$ 1.200,00, alinhando com as engenharias.",
      linkWhats: "#financeiro",
      relevanteAds: true
    }
  ],

  // Perguntas Frequentes (FAQ)
  faq: [
    {
      pergunta: "E se eu pagar o pacote e reprovar em alguma disciplina no final do semestre?",
      resposta: "Conforme esclarecido pela comissão e secretaria, o valor pago não é perdido. O formando pode transferir a colação para o semestre subsequente, ficando como crédito junto à instituição."
    },
    {
      pergunta: "Quantos convidados posso levar na Prova de Togas do dia 12/12?",
      resposta: "No dia 12/12 no campus, é permitido levar até 8 convidados para fotos no evento. Caso opte também pela sessão no Estúdio da SP Produtora (Family Day), são permitidos até 10 familiares e 1 pet."
    },
    {
      pergunta: "Posso levar meu próprio fotógrafo no dia da Prova de Togas?",
      resposta: "Sim, porém com regras rigorosas: o fotógrafo particular não pode entrar nos estúdios oficiais da SP Produtora, não pode usar o capelo/canudo da produtora e nunca deve atrasar o formando nos horários de fotos da turma."
    },
    {
      pergunta: "Como configuro minha música de entrada?",
      resposta: "Você deve fazer o upload de um arquivo MP3 de boa qualidade (160kbps+) de até 8MB no Portal da SP Produtora até o dia 24/01/2027 e marcar no player interno o ponto exato onde a música deve começar (dura ~30 segundos ao ser chamado)."
    },
    {
      pergunta: "Onde posso tirar dúvidas sobre cobrança ou boletos?",
      resposta: "Dúvidas financeiras e boletos devem ser tratados diretamente com o CASA da Unilasalle via ticket em casa.unilasalle.edu.br respondendo ao e-mail do protocolo de formatura."
    }
  ],

  // Contatos rápidos e links úteis
  contatos: [
    {
      nome: "Setor de Eventos Unilasalle",
      papel: "Organização institucional, protocolo e salas",
      whatsapp: "+555195719015",
      whatsappFormatado: "(51) 9571-9015",
      horario: "Segunda a Sexta, das 9h às 18h",
      link: "https://wa.me/555195719015"
    },
    {
      nome: "SP Produtora (Estúdio / Family Day)",
      papel: "Fotos de toga, agendamento de estúdio e portal",
      whatsapp: "+5551982100021",
      whatsappFormatado: "(51) 98210-0021",
      horario: "Horário comercial",
      link: "https://wa.me/5551982100021"
    },
    {
      nome: "Portal CASA Unilasalle",
      papel: "Abertura de requerimentos, tickets e financeiro",
      link: "https://casa.unilasalle.edu.br/hc/pt-br/requests/new",
      tipo: "web"
    }
  ]
};

// Se executado em Node.js (para testes do script Python), exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GRADUATION_DATA;
}
