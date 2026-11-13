# 🎓 Portal de Informações da Formatura - ADS 2026/2 (Unilasalle)

> **Deploy Oficial em Produção:**  
> 🌐 [https://andersonrgs.github.io/Deploy-2026-Formatura-ADS-La-Salle/](https://andersonrgs.github.io/Deploy-2026-Formatura-ADS-La-Salle/)

---

## 🎯 1. Objetivo

O **Portal da Formatura ADS 2026/2** foi criado como a fonte única da verdade (*single source of truth*) para a comissão e para todos os formandos do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da Universidade La Salle (Canoas/RS).

Seus principais objetivos são:
- **Centralizar e Filtrar Informações:** Transformar centenas de mensagens diárias dispersas em dados claros, cronológicos e acionáveis.
- **Dar Foco Exclusivo a ADS:** Garantir que o formando de ADS visualize imediatamente o que diz respeito ao seu curso (datas, locais, professores homenageados e prazos), sem se perder em discussões de outros cursos.
- **Prevenir Perda de Prazos Críticos:** Alertar com antecedência sobre eventos como o Apitaço (16/11), Votação de Vídeos (20/11), Prova de Togas (12/12) e envio de mídias (24/01/2027).
- **Transparência da Comissão:** Fornecer um canal aberto e acessível onde qualquer colega de turma pode consultar valores contratados, contatos oficiais de suporte e respostas para dúvidas frequentes.

---

## 💡 2. Razão e Motivação

### O Problema Enfrentado:
1. **Grupo Misto e Ruidoso no WhatsApp:**  
   O grupo oficial reúne diversos cursos simultâneos sob o nome *"TI + ENGENHARIAS 2026/2 - standart com quadro"* (ADS, Ciência da Computação, Gestão da TI, Ciência de Dados, Engenharia Elétrica, Mecânica, Produção e Civil). Com dezenas de mensagens diárias sobre assuntos particulares de cada curso, comunicados vitais da produtora e da universidade acabavam soterrados.
   
2. **Rotina Intensa dos Alunos de ADS:**  
   Alunos de Análise e Desenvolvimento de Sistemas normalmente atuam no mercado de tecnologia em período integral (estágio, CLT, plantões e projetos). É inviável acompanhar chats em tempo real durante o horário comercial.

3. **Complexidade de Regras e Prazos Rígidos:**  
   Questões como regras de fotógrafo particular, especificações técnicas de áudio MP3 (8MB, 160kbps+, minutagem), trajes para o telão e boletos via chamado no CASA possuem penalidades ou custos extras se não forem cumpridos pontualmente.

### A Solução:
Criar um portal web estático, leve, ultra rápido, responsivo para dispositivos móveis e com um fluxo simples de atualização: **exportar o WhatsApp periodicamente e rodar um script automatizado que atualiza o site em segundos**.

---

## 🛠️ 3. Implementação Feita

### 3.1. Arquitetura Técnica
A aplicação foi desenvolvida seguindo o modelo de **Static Web App** desacoplada de frameworks pesados, garantindo carregamento instantâneo no celular, custo zero de hospedagem e alta disponibilidade:

- **Frontend Core:** HTML5 Semântico + Vanilla JavaScript (ES6+).
- **Design System:** CSS Moderno com suporte nativo a Glassmorphism, temas **Dark/Light** (com persistência em `localStorage`), variáveis CSS e tipografia limpa (*Inter* e *JetBrains Mono*).
- **Modelagem de Dados:**
  - `assets/js/data.js`: Objeto estruturado com todas as diretrizes curadas (datas oficiais, nomes de paraninfos/homenageados de ADS, orientações da produtora, regras de fotos, faixas e apitos).
  - `assets/js/data.json`: Arquivo dinâmico gerado pelo script Python contendo o feed de atualizações extraído do chat.
- **Hospedagem & Deploy Contínuo:** GitHub Pages configurado diretamente na branch `main`.

---

### 3.2. Módulos e Funcionalidades Desenvolvidas

| Módulo | Descrição e Implementação |
| :--- | :--- |
| **Contagem Regressiva** | Timer em tempo real apontando para o próximo marco (**Apitaço ADS em 16/11 às 18h30**). Atualização por segundo sem consumo excessivo de bateria. |
| **Filtro ADS vs. Visão Geral** | Toggle comutador que filtra a linha do tempo entre eventos exclusivos de ADS e o cronograma geral conjunto de todas as Engenharias/TI. |
| **Apitaço de ADS em Destaque** | Detalhamento dos horários (chegada às 18h30 na Sala Google), homenageados de ADS (**Prof. Mozart Lemos** - Sala 801 e **Tutora Priscila Gonçalves** - 6º andar), aviso de levar apitos próprios e orientações de faixas. |
| **Enquete do Vídeo dos Familiares** | Seção com votação aberta até **20/11** comparando **Modelo Árvore (Digital)** vs. **Modelo Cartaz (Presencial)**, com visualização em modal dos vídeos de exemplo hospedados no Vimeo. |
| **Guia de Mídias (Portal SP)** | Instruções passo a passo para upload de fotos (composições de até 3 imagens, proibição de roupas de banho/álcool) e músicas de entrada (MP3, 160k+, minutagem e proibições de apologia/hinos). |
| **Mural Filtrável do WhatsApp** | Feed de comunicados oficiais categorizado por tags: `ADS Exclusivo`, `Produtora`, `Unilasalle` e `Financeiro`. |
| **Busca Instantânea** | Campo de busca por texto em tempo real para localizar rapidamente tópicos como *"toga"*, *"boleto"*, *"reprovação"*, etc. |
| **Botão Copiar Resumo Whats** | Gera e copia para a área de transferência uma mensagem resumida com formatação e emojis pronta para colar no grupo da turma. |
| **FAQ & Contatos** | Dúvidas esclarecidas sobre reprovações/créditos, convidados da prova de togas e links diretos para WhatsApp de Eventos, Estúdio SP e portal CASA. |
| **Painel Restrito da Comissão (Moderador)** | Área protegida por senha/PIN exclusiva para a comissão e moderadores, contendo as instruções e comandos de atualização e deploy, totalmente oculta para visitantes comuns. |

---

### 3.3. Pipeline de Automação em Python (`scripts/atualizar_portal.py`)

Para manter o site atualizado sem esforço manual:
1. O script varre o diretório `Whats exportado/` em busca do arquivo `.md` ou `.txt` mais recente.
2. Aplica expressões regulares especializadas que interpretam formatos do WhatsApp (tanto Markdown quanto texto puro com carimbo de data/hora).
3. Identifica autores relevantes (*Eventos Unilassale*, *SP Produtora / Paola / Matheus*, *Comissão ADS*).
4. Filtra comunicados por palavras-chave relevantes (*apitaço, toga, ensaio, requerimento, vimeo, contrato, valores*).
5. Gera automaticamente o arquivo `assets/js/data.json`, consumido dinamicamente pelo frontend.

---

## 📁 4. Estrutura do Repositório

```text
PORTAL INFORMACOES FORMATURA (ADS)/
├── index.html                  # Interface completa do portal (Hero, Timeline, Apitaço, Votação, Mídia, FAQ)
├── assets/
│   ├── css/
│   │   └── style.css           # Estilos completos: Glassmorphism, temas claro/escuro e responsividade mobile
│   └── js/
│       ├── data.js             # Base oficial estática com meta-informações e diretrizes de ADS
│       ├── data.json           # Base gerada automaticamente com as últimas mensagens do WhatsApp
│       └── app.js              # Lógica da aplicação (timer, busca, filtros de curso/mural, modal de vídeo)
├── scripts/
│   └── atualizar_portal.py     # Script Python para parsing e atualização periódica do chat
├── Whats exportado/            # Diretório de armazenamento dos históricos exportados do WhatsApp
│   └── Export 13112026/
│       ├── chat.md
│       ├── chat.txt
│       └── TI + ENGENHARIAS 2026_2 - standart com quadro.zip
├── .gitignore                  # Arquivos ignorados pelo controle de versão
└── README.md                   # Esta documentação
```

---

## 🔄 5. Fluxo de Atualização Periódica

Quando houver novas conversas relevantes no WhatsApp:

1. **Exportar a conversa:**  
   No aplicativo do WhatsApp, abra o grupo da formatura, toque em **Mais opções (⋮) → Mais → Exportar conversa (Sem mídia)**.
2. **Salvar o arquivo:**  
   Cole o novo arquivo `chat.txt` ou `chat.md` dentro da pasta `Whats exportado/`.
3. **Executar o script:**  
   ```bash
   python scripts/atualizar_portal.py
   ```
4. **Publicar a atualização no GitHub:**  
   ```bash
   git add .
   git commit -m "update: sincronizando novos avisos do WhatsApp"
   git push
   ```
   *O GitHub Pages atualizará o site publicado automaticamente em instantes.*

---

## 👥 Comissão de Formatura
- **Curso:** Análise e Desenvolvimento de Sistemas (ADS)
- **Instituição:** Universidade La Salle (Canoas/RS)
- **Turma:** 2026/2
- **Pacote Oficial Aprovado:** Standard com Quadro (R$ 1.200,00)
- **Paraninfo Escolhido:** Prof. Mozart Lemos de Siqueira
- **Homenageada Escolhida:** Tutora Priscila Gonçalves
