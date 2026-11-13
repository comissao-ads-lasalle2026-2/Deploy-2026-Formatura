# 🎓 Portal de Informações da Formatura - ADS 2026/2 (Unilasalle)

Portal web moderno, responsivo e de alta performance desenvolvido especialmente para os formandos do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da Universidade La Salle (Canoas/RS), turma 2026/2.

O objetivo do portal é centralizar, filtrar e organizar as centenas de mensagens do grupo de WhatsApp *"TI + ENGENHARIAS 2026/2 - standart com quadro"*, permitindo que os formandos acompanhem prazos críticos, datas de apitaço, prova de togas, regras de músicas e fotos, votações e financeiro em um único lugar limpo e objetivo.

---

## 🚀 Funcionalidades do Portal

- ⏱️ **Contagem Regressiva em Tempo Real**: Timer regressivo para o próximo compromisso da turma (**Apitaço ADS em 16/11 às 18h30**).
- 🎯 **Filtro Foco ADS vs Visão Geral**: Alternância em um clique para ver apenas o que impacta Análise e Desenvolvimento de Sistemas ou todos os cursos do agrupamento (Engenharias e TI).
- 📌 **Apitaço de ADS em Destaque**:
  - **Data:** Segunda-feira, 16/11 às 19h (Chegar às 18h30 na **Sala Google**).
  - **Paraninfo:** Prof. Mozart Lemos de Siqueira (Prédio 15, Sala 801).
  - **Homenageada:** Tutora Priscila Gonçalves (Prédio 1, 6º andar).
  - Orientações de fantasias, adereços e apitos próprios.
- 🗳️ **Votação do Vídeo dos Familiares (Até 20/11)**:
  - Comparativo entre o **Modelo Árvore (Digital)** e o **Modelo Cartaz (Presencial na Prova de Toga)**.
  - Pré-visualização direta dos exemplos em vídeo do Vimeo.
- 📸 **Guia da Prova de Togas & Family Day (12/12)**:
  - Regras para fotógrafo particular, convidados (até 8 pessoas no campus) e estúdio SP (até 10 pessoas + 1 pet).
- 🎵 **Regras de Envio de Foto e Música (Prazo: 24/01/2027)**:
  - Instruções de MP3 (até 8MB, 160kbps+, ponto de início).
  - Regras de fotos pessoais para o telão e proibições legais.
- 💬 **Mural Filtrável de Avisos do WhatsApp**: Histórico de comunicados oficiais por tag (*ADS Exclusivo*, *Produtora SP*, *Unilasalle Eventos*, *Financeiro*).
- 📋 **Botão "Copiar Resumo p/ Whats"**: Gera uma mensagem formatada com emojis pronta para colar no grupo da turma.
- 🌙 **Tema Dark & Light Mode**: Design glassmorphic de alto nível pensado para estudantes e desenvolvedores de tecnologia.
- 🔍 **Busca Instantânea**: Localize qualquer assunto digitando palavras-chave.

---

## 📂 Estrutura de Arquivos

```text
PORTAL INFORMACOES FORMATURA (ADS)/
├── index.html                  # Página principal do portal
├── assets/
│   ├── css/
│   │   └── style.css           # Estilização completa com Glassmorphism e responsividade
│   └── js/
│       ├── data.js             # Base oficial estruturada com todos os dados e contatos
│       ├── data.json           # Avisos dinâmicos gerados pelo script de atualização
│       └── app.js              # Lógica de contagem regressiva, filtros, busca e modais
├── scripts/
│   └── atualizar_portal.py     # Script Python para ler novas exportações de chat do WhatsApp
├── Whats exportado/            # Pasta onde você salva os exports do WhatsApp
│   └── Export 13112026/
├── .gitignore
└── README.md
```

---

## 🔄 Como Atualizar o Portal Periodicamente

Sempre que houver novidades no grupo de WhatsApp:

1. No WhatsApp, abra o grupo da formatura, toque em **Mais opções (⋮) → Mais → Exportar conversa (Sem mídia)**.
2. Salve o arquivo `chat.txt` ou `chat.md` dentro da pasta `Whats exportado/`.
3. Abra o terminal na pasta do projeto e execute:

```bash
python scripts/atualizar_portal.py
```

O script filtrará automaticamente todas as mensagens oficiais do Setor de Eventos e da Produtora SP, categorizando e atualizando o arquivo `assets/js/data.json` imediatamente.

---

## 🌐 Publicação no GitHub Pages

Para publicar este site no GitHub Pages gratuitamente:

### 1. Inicializar o repositório Git localmente:
```bash
git init
git add .
git commit -m "feat: Portal oficial Formatura ADS 2026/2"
```

### 2. Conectar ao seu repositório remoto:
```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

*(Se utilizar Token de Acesso Pessoal, a URL pode ser formatada como `https://SEU_TOKEN@github.com/SEU_USUARIO/SEU_REPOSITORIO.git`)*.

### 3. Ativar o GitHub Pages:
1. No seu repositório no GitHub, clique em **Settings** (Configurações).
2. Na aba lateral esquerda, clique em **Pages**.
3. Em **Build and deployment > Source**, selecione **Deploy from a branch**.
4. Em **Branch**, selecione `main` e a pasta `/ (root)`.
5. Clique em **Save**. Em cerca de 1 a 2 minutos o site estará online no link:
   `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`

---

## 💻 Teste Local

Para visualizar o site na sua máquina:
- Basta dar duplo clique no arquivo `index.html`, ou:
- Executar um servidor local leve:
  ```bash
  python -m http.server 8000
  ```
  E acessar `http://localhost:8000` no seu navegador.
