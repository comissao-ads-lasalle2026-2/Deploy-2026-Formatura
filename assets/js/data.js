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
    ultimaAtualizacao: "19/11/2026 às 11:15",
    contagemRegressivaAlvo: "2026-11-20T23:59:59-03:00", // Próximo evento crítico: Encerramento da Votação dos Pais
    contagemRegressivaTitulo: "Contagem Regressiva: Encerramento da Votação do Vídeo dos Pais (20/11 às 23h59)",
    
    // Conexão oficial com a Planilha de Votações no Google Drive (Google Apps Script)
    // Audita voto único por matrícula e consolida o placar em tempo real:
    votingApiUrl: "https://script.google.com/macros/s/AKfycbwacQ2PdSl5sZOD7qz2gC1PMUBR8Euw0PLmnWe0j6IzFXelQjH7sqKn-9xrDCFTYNo/exec",

    // Links Oficiais do Sistema da SP Produtora
    linksProdutora: {
      autoCadastroTurma: "http://sistema.spprod.com.br/sign/208497d70e1dd38156edd7249f9e70001ade853d",
      login: "http://sistema.spprod.com.br",
      criarConta: "http://sistema.spprod.com.br/signup",
      instagram: "https://instagram.com/sp.produtorars"
    }
  },

  // Alertas urgentes exibidos no topo da página
  avisosUrgentes: [
    {
      id: "urgente-votacao",
      tipo: "danger", // danger, warning, info
      badge: "VOTAÇÃO ABERTA • ENCERRA 20/11",
      titulo: "Vídeo de Homenagem: Cartaz Lidera por 4 a 3 no Placar Geral da Solenidade!",
      descricao: "Com os votos dos outros cursos de Engenharias e TI, o Modelo Cartaz está vencendo por 4 a 3. O posicionamento de ADS definirá a escolha oficial da nossa formatura. Registre seu voto!",
      linkAcao: "#votacao",
      textoAcao: "Votar Agora na Enquete"
    },
    {
      id: "concluido-apitaco",
      tipo: "info",
      badge: "REALIZADO EM 16/11",
      titulo: "Apitaço Oficial de ADS Realizado com Sucesso!",
      descricao: "A turma esteve reunida na Sala Google e entregou os convites oficiais para o Paraninfo Prof. Mozart Lemos e a Homenageada Tutora Priscila Gonçalves.",
      linkAcao: "#apitaco",
      textoAcao: "Ver Homenageados"
    }
  ],

  // Destaques e estatísticas rápidas
  estatisticas: [
    { label: "Pacote ADS Fechado", valor: "Standard c/ Quadro", detalhe: "R$ 1.200,00" },
    { label: "Próximo Marco", valor: "Votação dos Pais", detalhe: "Encerra 20/11 (Sexta)" },
    { label: "Prova de Togas", valor: "12/12 Manhã", detalhe: "A partir das 09h" },
    { label: "Colação de Grau", valor: "06/03 às 15h", detalhe: "Ensaio: 03/03 às 19h" }
  ],

  // Esteira de Marcos Consecutivos Automáticos (O relógio e os descritivos transitam sozinhos cronologicamente)
  marcosConsecutivos: [
    {
      id: "votacao-pais",
      titulo: "Contagem Regressiva: Encerramento da Votação do Vídeo dos Pais (20/11 às 23h59)",
      dataAlvo: "2026-11-20T23:59:59-03:00",
      descricao: "Definição de consenso entre as turmas: Modelo Árvore (Digital) vs Modelo Cartaz (Presencial na Prova de Togas). Registre seu voto!",
      estatisticaValor: "Votação dos Pais",
      estatisticaDetalhe: "Encerra 20/11 (Sexta)",
      linkAcao: "#votacao"
    },
    {
      id: "enade",
      titulo: "Contagem Regressiva: Prova do ENADE 2026 (29/11 às 13h)",
      dataAlvo: "2026-11-29T13:00:00-03:00",
      descricao: "Atenção formandos de ADS convocados para o Exame Nacional de Desempenho dos Estudantes no campus.",
      estatisticaValor: "Prova do ENADE",
      estatisticaDetalhe: "29/11 às 13h",
      linkAcao: "#cronograma"
    },
    {
      id: "prova-togas",
      titulo: "Contagem Regressiva: Prova de Togas no Campus Unilasalle (12/12 às 09h)",
      dataAlvo: "2026-12-12T09:00:00-03:00",
      descricao: "Sessão oficial com a SP Produtora no campus. Fotos individuais, com a turma e familiares (até 8 convidados). Chegue com 30min de antecedência!",
      estatisticaValor: "Prova de Togas",
      estatisticaDetalhe: "12/12 a partir das 09h",
      linkAcao: "#midia"
    },
    {
      id: "upload-midia",
      titulo: "Contagem Regressiva: Prazo de Músicas e Fotos na SP Produtora (24/01 às 23h59)",
      dataAlvo: "2027-01-24T23:59:59-03:00",
      descricao: "Envio obrigatório no Portal do Formando da SP Produtora: MP3 da sua música de entrada individual (cortada em 30s) e sua foto pessoal para o telão.",
      estatisticaValor: "Músicas & Fotos SP",
      estatisticaDetalhe: "Até 24/01/2027",
      linkAcao: "#midia"
    },
    {
      id: "ensaio-geral",
      titulo: "Contagem Regressiva: Ensaio Geral da Solenidade (03/03 às 19h)",
      dataAlvo: "2027-03-03T19:00:00-03:00",
      descricao: "Alinhamento obrigatório de entrada das turmas, ordem de chamada, juramento acadêmico e oradores no Centro de Eventos.",
      estatisticaValor: "Ensaio Geral",
      estatisticaDetalhe: "03/03/2027 às 19h",
      linkAcao: "#cronograma"
    },
    {
      id: "colacao-solene",
      titulo: "Contagem Regressiva para a Colação de Grau ADS 2026/2! 🎓",
      dataAlvo: "2027-03-06T15:00:00-03:00",
      descricao: "O momento da grande vitória! Cerimônia solene de formatura no Centro de Eventos Unilasalle. Vistam as togas e peguem o diploma!",
      estatisticaValor: "Colação Solene",
      estatisticaDetalhe: "06/03/2027 às 15h",
      linkAcao: "#cronograma"
    }
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
      hora: "Encerra 20/11 às 23h59",
      status: "atual",
      badge: "URGENTE • ATÉ 20/11",
      resumo: "Consenso entre os cursos para escolha entre Modelo Árvore (Digital) vs Modelo Cartaz (Presencial na Prova de Togas).",
      focoAds: true
    },
    {
      id: 4,
      titulo: "Apitaço ADS (Convite Paraninfo & Homenageada)",
      data: "16/11/2026",
      hora: "19:00",
      status: "concluido",
      badge: "Concluído",
      resumo: "Realizado com sucesso na Sala Google. Entrega de convites para Prof. Mozart (Prédio 15, Sala 801) e Tutora Priscila (Prédio 1, 6º andar).",
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
    placarGeralSolenidade: {
      atualizadoEm: "19/11/2026 às 10:07 (Chat Oficial WhatsApp)",
      totalCursosVotantes: 8,
      status: "Disputa acirrada entre as turmas: Modelo Cartaz lidera por 4 a 3. O voto de ADS definirá se teremos empate ou vitória do Cartaz!",
      arvore: [
        "Engenharia de Produção",
        "Engenharia Mecânica",
        "Engenharia Elétrica"
      ],
      cartaz: [
        "Gestão de TI",
        "Ciência de Dados",
        "Ciência da Computação",
        "Engenharia Civil"
      ],
      pendente: [
        "Análise e Desenvolvimento de Sistemas (ADS)"
      ]
    },
    opcoes: [
      {
        id: "arvore",
        nome: "Modelo Árvore Genealógica (100% Digital)",
        descricao: "Montagem 100% digital pelo computador ou celular. Cada formando cria um mosaico horizontal em arquivo JPG com até 6 fotos de familiares e sobe direto no portal da SP Produtora (prazo: 24/01/2027). Não precisa imprimir papel, não compra folha A3 e não requer gravação presencial no dia da prova de togas.",
        vantagens: "Muito mais prático: zero custo com impressão gráfica, sem risco de amassar cartaz e não consome tempo no dia 12/12.",
        videoUrl: "https://vimeo.com/1044854930/750971b00a",
        embedId: "1044854930"
      },
      {
        id: "cartaz",
        nome: "Modelo Cartaz de Fotos (Físico em Folha A3)",
        descricao: "Exige material FÍSICO e IMPRESSO em mãos no dia 12/12 (tamanho A3: 29,7 x 42 cm) com até 6 fotos e frase legível. Pode ser arte digital (feita no Canva/Photoshop) impressa em gráfica rápida ou colagem manual com fotos reveladas. Cada formando veste a toga e é filmado segurando a folha física na frente do corpo. Não é aceito arquivo apenas no celular.",
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
    convidadosCampus: "Até 8 pessoas permitidas no campus",
    localCampus: "Campus Unilasalle - Canoas/RS (PROIBIDA a entrada de animais/pets no campus)",
    familyDayEstudio: {
      duracao: "1 hora de ensaio",
      local: "Estúdio SP Produtora — Rua Silva Jardim, 151, Bairro Bela Vista, Porto Alegre/RS",
      capacidade: "Até 10 familiares + 01 pet",
      beneficioIncluso: "5 fotos digitais em alta resolução com tratamento profissional para download",
      agendamentoWhats: "+5551982100021",
      agendamentoFormatado: "(51) 98210-0021",
      regrasPet: "O pet é permitido e muito bem-vindo EXCLUSIVAMENTE na sessão de estúdio da SP Produtora. No dia da Prova de Togas no Campus Unilasalle, animais são proibidos pelo regulamento institucional."
    },
    regrasFotografoParticular: [
      "Prioridade Absoluta: o cronograma oficial da produtora vem primeiro. O formando NÃO pode se afastar com seu fotógrafo a ponto de perder as fotos coletivas de turma.",
      "Acesso Exclusivo: aos estúdios oficiais montados no local, somente entram os formandos, equipe da produtora e professores.",
      "Uso de Chapéu/Canudo da Produtora: é exclusivo da SP Produtora. Fotógrafo particular DEVE levar seu próprio chapéu/canudo se quiser fotos extras.",
      "Troca de Roupa: após a foto oficial de toga, quem for participar da foto de camiseta de turma deve trocar de roupa imediatamente sem reter a toga.",
      "Locais Autorizados: consultar as áreas livres do campus permitidas para fotógrafos externos."
    ]
  },

  // Central de Documentos Oficiais da Formatura (Arquivos para consulta e download na pasta docs/)
  documentosOficiais: [
    {
      id: "guia-sp-produtora",
      titulo: "Passo a Passo Oficial SP Produtora (Auto-Cadastro & Family Day)",
      nomeArquivo: "Guia_Oficial_SP_Produtora_Acesso_FamilyDay.pdf",
      caminho: "docs/Guia_Oficial_SP_Produtora_Acesso_FamilyDay.pdf",
      formato: "PDF",
      tamanho: "167 KB",
      data: "17/11/2026",
      emissor: "SP Produtora de Formaturas",
      descricao: "Guia completo distribuído via e-mail aos formandos. Contém o link oficial de auto-cadastro da nossa turma, criação de usuário no sistema, regras do ensaio Family Day com familiares e pet, e telefones diretos do suporte.",
      destaque: true
    },
    {
      id: "orientacoes-apitaco",
      titulo: "Orientações Oficiais do Apitaço de Formatura (Horários & Salas)",
      nomeArquivo: "Orientacoes_Apitaco_ADS.pdf",
      caminho: "docs/Orientacoes_Apitaco_ADS.pdf",
      formato: "PDF",
      tamanho: "92 KB",
      data: "17/11/2026",
      emissor: "Setor de Eventos Unilasalle",
      descricao: "Diretrizes e cronograma oficial da Unilasalle para a concentração na Sala Google, homenagem aos professores e percurso do apitaço das turmas.",
      destaque: false
    }
  ],

  // Feed de Atualizações (extraído do chat do WhatsApp com contexto e data)
  atualizacoesMural: [
    {
      id: "att-1911-votacao",
      data: "19/11/2026",
      hora: "10:07",
      autor: "Comissão Geral Solenidade",
      tag: "Votação",
      titulo: "Placar Geral dos Cursos: Modelo Cartaz Lidera por 4 a 3 (ADS Decide!)",
      conteudo: "Com a adesão da Engenharia Civil, o Modelo Cartaz atingiu 4 votos (Gestão de TI, Ciência de Dados, Ciência da Computação, Eng. Civil) contra 3 votos do Modelo Árvore (Eng. Produção, Eng. Mecânica, Eng. Elétrica). Análise e Desenvolvimento de Sistemas (ADS) é o último curso a votar até 20/11 para definir o consenso oficial da formatura.",
      linkWhats: "#votacao",
      relevanteAds: true
    },
    {
      id: "att-1911-unilasalle",
      data: "19/11/2026",
      hora: "09:41",
      autor: "Setor de Eventos Unilasalle",
      tag: "Unilasalle",
      titulo: "Esclarecimentos da Unilasalle: Prova de Togas, Pets e Vestimenta",
      conteudo: "A Unilasalle reiterou que é proibida a entrada de animais no campus durante a Prova de Togas. Orientações completas de vestimenta recomendada, horário exato de chegada dos familiares e a forma de disponibilização das fotos oficiais serão encaminhadas na próxima semana.",
      linkWhats: "#midia",
      relevanteAds: true
    },
    {
      id: "att-1811-paraninfos",
      data: "18/11/2026",
      hora: "11:56",
      autor: "Setor de Eventos Unilasalle",
      tag: "Unilasalle",
      titulo: "Oficialização dos Convites a Paraninfos e Homenageados",
      conteudo: "O Setor de Eventos reforçou a importância de todos os cursos formalizarem os convites aos seus professores homenageados e paraninfos, colocando-se à disposição para auxiliar com e-mails e contatos institucionais dos docentes.",
      linkWhats: "#apitaco",
      relevanteAds: true
    },
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
      pergunta: "Como faço meu auto-cadastro no sistema da SP Produtora?",
      resposta: "Nossa turma possui um link de auto-cadastro direto e oficial (http://sistema.spprod.com.br/sign/208497d70e1dd38156edd7249f9e70001ade853d). Caso ainda não possua usuário cadastrado no sistema da produtora, clique em 'Criar Conta' (http://sistema.spprod.com.br/signup) antes de acessar o formulário da turma. Se já tiver usuário, basta fazer login normal em http://sistema.spprod.com.br."
    },
    {
      pergunta: "Como funciona o Family Day e posso levar meu pet?",
      resposta: "O Family Day é um ensaio fotográfico de 1 hora no Estúdio da SP Produtora (Rua Silva Jardim, 151 - Bairro Bela Vista, Porto Alegre/RS) onde você pode levar até 10 familiares e 01 pet. Inclui 5 fotos digitais tratadas para download. O agendamento é feito pelo WhatsApp (51) 98210-0021. ATENÇÃO: Pets são permitidos EXCLUSIVAMENTE no estúdio da produtora; no dia da Prova de Togas no Campus Unilasalle a entrada de animais é expressamente proibida pelas normas da universidade."
    },
    {
      pergunta: "Como funciona o Modelo Cartaz do vídeo de homenagem? Precisa ser físico ou digital?",
      resposta: "O Modelo Cartaz exige obrigatoriamente um material FÍSICO e IMPRESSO em mãos no tamanho de uma folha A3 (29,7 x 42 cm) levado no dia da Prova de Togas (12/12). A gravação é presencial, com o formando de toga segurando a folha. Pode ser feito no Canva e impresso em gráfica rápida, ou colagem manual com fotos. Não é aceito arquivo no celular. Já o Modelo Árvore é 100% digital (apenas upload de JPG no portal até 24/01/2027, sem gravação presencial e sem impressão)."
    },
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
      resposta: "Dúvidas financeiras e boletos do pacote institucional devem ser tratados no CASA da Unilasalle via ticket em casa.unilasalle.edu.br. Para contratação de pacotes de fotos e produtos extras da produtora, o contato é direto com a Cleusa da SP Produtora no WhatsApp (51) 99456-7057."
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
      link: "https://wa.me/555195719015",
      tag: "Unilasalle"
    },
    {
      nome: "Luana — Suporte Portal SP Produtora",
      papel: "Dúvidas de cadastro, acesso ao sistema e upload de músicas/fotos",
      whatsapp: "+555133122400",
      whatsappFormatado: "(51) 3312-2400 (Fone / Whats)",
      horario: "Horário comercial",
      link: "https://wa.me/555133122400",
      tag: "SP Produtora"
    },
    {
      nome: "Cleusa — Financeiro SP Produtora",
      papel: "Contratação de pacotes de formandos, fotos extras e produtos",
      whatsapp: "+5551994567057",
      whatsappFormatado: "(51) 99456-7057",
      horario: "Horário comercial",
      link: "https://wa.me/5551994567057",
      tag: "Financeiro SP"
    },
    {
      nome: "Estúdio SP Produtora (Family Day)",
      papel: "Agendamento de ensaios de estúdio com família e pet",
      whatsapp: "+5551982100021",
      whatsappFormatado: "(51) 98210-0021",
      horario: "Segunda a Sábado com agendamento",
      link: "https://wa.me/5551982100021",
      tag: "Estúdio SP"
    },
    {
      nome: "Instagram Oficial SP Produtora",
      papel: "Portfólio de formaturas, coberturas e novidades",
      link: "https://instagram.com/sp.produtorars",
      whatsappFormatado: "@sp.produtorars",
      tipo: "web",
      tag: "Redes Sociais"
    },
    {
      nome: "Portal CASA Unilasalle",
      papel: "Abertura de requerimentos, tickets e financeiro institucional",
      link: "https://casa.unilasalle.edu.br/hc/pt-br/requests/new",
      tipo: "web",
      tag: "Unilasalle"
    }
  ]
};

// Garante disponibilidade global no navegador e em módulos
if (typeof window !== 'undefined') {
  window.GRADUATION_DATA = GRADUATION_DATA;
}

// Se executado em Node.js (para testes do script Python), exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GRADUATION_DATA;
}
