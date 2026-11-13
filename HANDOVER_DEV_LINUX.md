# 🚀 HANDOVER DO PROJETO: PORTAL FORMATURA ADS 2026/2 (UNILASALLE)
> **Instruções para o Antigravity / Desenvolvedor ao abrir este projeto no Linux**  
> *Data do Handover: 13 de Novembro de 2026*  
> *Branch Principal:* `main`  
> *Repositório Oficial:* `https://github.com/comissao-ads-lasalle2026-2/Deploy-2026-Formatura.git`  
> *Deploy em Produção (GitHub Pages):* [https://comissao-ads-lasalle2026-2.github.io/Deploy-2026-Formatura/](https://comissao-ads-lasalle2026-2.github.io/Deploy-2026-Formatura/)

---

## 🧭 1. Contexto do Projeto e Papel do Usuário

- **Usuário:** Aluno concluinte do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da **Universidade La Salle (Canoas/RS)**, integrante da **Comissão de Formatura** da turma **2026/2**.
- **Objetivo da Aplicação:** Portal informativo e interativo independente para os formandos de ADS. A solenidade é compartilhada com engenharias e outros cursos de TI (*TI + ENGENHARIAS 2026/2*), gerando centenas de mensagens dispersas no WhatsApp. O portal filtra, organiza e dá foco exclusivo ao formando de ADS.
- **Diretriz Máxima de Privacidade e Segurança:**
  - 🔒 **Zero Exposição Pessoal:** O repositório está hospedado na organização pública desacoplada `comissao-ads-lasalle2026-2` (nunca no perfil pessoal do aluno).
  - 🔒 **Zero Coleta Sensível:** O portal **NUNCA** solicita, armazena ou expõe CPF, RG, telefones pessoais, endereços ou e-mails privados dos colegas de turma.
  - 🔒 **Sem Nomes Hardcoded:** Nenhum placeholder ou exemplo no código deve conter o nome pessoal do desenvolvedor/aluno ("Anderson").
  - 🔒 **Área da Comissão Protegida:** Painel de moderador protegido por hash **SHA-256** no client (`ads2026` / `comissao2026`), com possibilidade de troca de senha no navegador.

---

## 🏗️ 2. Arquitetura e Tecnologias

A aplicação é uma **SPA Estática de Alta Performance (Zero Build Step)**:
- **Frontend:** HTML5 Semântico, CSS3 Moderno (Glassmorphism, CSS Custom Properties, Dark/Light/Cyber/Matrix/Royal/Synthwave themes), Vanilla JavaScript ES6+.
- **Jogos Retrô (Easter Egg):** Canvas 2D + Web Audio API (áudio sintetizado 8-bit em tempo real, sem dependências de arquivos MP3 externos).
- **Backend de Votação (Opcional):** Google Apps Script (`scripts/google_apps_script.js`) integrado a uma planilha no Google Drive para auditar voto único por matrícula.
- **Automação:** Script Python 3 (`scripts/atualizar_portal.py`) que processa exports do WhatsApp (`.txt` ou `.md`) e atualiza o mural de avisos sem expor números de telefone.

---

## 📂 3. Mapa de Arquivos do Projeto

```text
PORTAL INFORMACOES FORMATURA (ADS)/
├── index.html                  # Interface completa do portal (Hero, Timer, Apitaço, Votação, Mídia, Jogos, FAQ, Moderação)
├── assets/
│   ├── css/
│   │   └── style.css           # Design System completo: Glassmorphism, temas, animações neon e responsividade mobile
│   └── js/
│       ├── data.js             # Base oficial estática curada (cronograma ADS, regras de togas, músicas, FAQ, paraninfos)
│       ├── data.json           # Feed dinâmico de avisos extraídos do WhatsApp pelo script Python
│       ├── app.js              # Lógica da aplicação (timer regressivo, filtros, checklist, simulador de orçamento, votação com voto único, hash SHA-256)
│       └── arcade.js           # Easter Egg Retrô: Cyber Pinball 2026 e Bomber-ADS com física e Web Audio API
├── scripts/
│   ├── atualizar_portal.py     # Script Python para parsing de exports do WhatsApp e atualização do data.json
│   └── google_apps_script.js   # Script pronto para deploy no Google Apps Script (Web App) para votações em planilha
├── Whats exportado/            # [IGNORADO NO GIT] Arquivos brutos de export do WhatsApp (.txt, .md, .zip)
├── .gitignore                  # Ignora backups locais, exports brutos e arquivos temporários do sistema
├── HANDOVER_DEV_LINUX.md       # Este guia de handover para continuação imediata no Linux
└── README.md                   # Documentação pública do repositório
```

---

## 📅 4. Calendário Oficial e Marcos Críticos da Formatura

1. **APITAÇO OFICIAL DE ADS (Urgente):**
   - **Data:** Segunda-feira, **16/11/2026**.
   - **Horário:** Chegar às **18h30** (início pontual às 19h00).
   - **Ponto de Encontro:** **Sala Google**.
   - **Paraninfo Escolhido:** Prof. Mozart Lemos de Siqueira (Prédio 15, Sala 801).
   - **Homenageada Escolhida:** Tutora Priscila Gonçalves (Prédio 1, 6º andar).
   - **Traje/Acessórios:** Levar apitos próprios! A produtora levará fantasias e fará a cobertura fotográfica.

2. **ENQUETE: VÍDEO DE HOMENAGEM AOS FAMILIARES:**
   - **Prazo de Votação da Solenidade:** Até **20/11/2026** (comunicação à produtora dia 21/11).
   - **Modelo Árvore Genealógica (100% Digital):**
     - O formando cria mosaico JPG com até 6 fotos e sobe no portal da SP Produtora até 24/01/2027.
     - *Zero trabalho presencial, não compra papel A3 e não filma no dia das togas.*
   - **Modelo Cartaz de Fotos (FÍSICO em Folha A3):**
     - Requer **folha A3 impressa em mãos no dia 12/12** (feita no Canva e impressa em gráfica, ou colagem manual com fotos e caneta).
     - *Não pode levar apenas no celular.* O formando veste toga e é filmado segurando a folha.

3. **PROVA DE TOGAS NO CAMPUS:**
   - **Data:** Sábado, **12/12/2026** (período da manhã).
   - **Convidados:** Até 8 pessoas no campus (ou 10 + 1 pet no estúdio Family Day).
   - **Fotógrafo Particular:** Permitido apenas com material próprio e sem atrasar o cronograma oficial da turma.

4. **PRAZO FINAL DE MÍDIAS NO PORTAL DO FORMANDO SP:**
   - **Data Limite:** **24/01/2027**.
   - **Música MP3:** Até 8MB, 160kbps+, marcando ponto de corte de 30s para a entrada.
   - **Foto Pessoal:** Upload da foto de infância/família no portal.

5. **COLAÇÃO DE GRAU PRESENCIAL:**
   - **Período Previsto:** **Março de 2027**.
   - **Pacote:** Standard com Quadro (R$ 1.200,00).

---

## 🎮 5. Easter Egg Retrô (Fliperama ADS 2026)

- **Localização:** Ícone pulsante **👾** no canto superior direito da barra de navegação (ao lado de "Temas").
- **Jogos Implementados em `assets/js/arcade.js`:**
  - **🎯 Cyber Pinball 2026:** Mesa neon com bumpers interativos (*ADS*, *2026*, *TOGA*, *APITAÇO*), flippers duplos, rampa de lançamento, mola plunger, 3 bolas e High Score no `localStorage`.
  - **💣 Bomber-ADS:** Labirinto clássico com blocos de código `{}` destrutíveis por bombas, bugs 👾 móveis e caça ao Diploma 📜.
- **Responsividade e Controles:**
  - **Mobile/Tablet:** Toque nas metades da tela ou botões virtuais (Flip Esquerdo, Flip Direito, Lançar, D-Pad e Bomba).
  - **Desktop (Linux/Windows/Mac):** Setas direcionais / WASD e Barra de Espaço.
  - **Áudio:** Web Audio API sintetizado em tempo real com toggle `🔊 Som: ON/OFF`.

---

## 🐧 6. Como Rodar e Desenvolver no Notebook Linux

Ao clonar ou abrir este repositório no seu notebook com Linux:

### 1. Iniciar o Servidor Local
Por ser uma SPA puramente estática, você não precisa de `npm`, `node` ou `yarn`. Basta qualquer servidor HTTP:
```bash
# Opção 1: Python 3 nativo do Linux
python3 -m http.server 8080

# Opção 2: Se tiver a extensão "Live Server" no VS Code / Antigravity:
# Clique com botão direito em index.html -> "Open with Live Server"
```
Acesse no navegador: `http://localhost:8080`

### 2. Sincronizar Novos Avisos do WhatsApp
Se você exportar uma nova conversa do grupo no WhatsApp:
1. Coloque o arquivo `.txt` ou `.md` na pasta `Whats exportado/`.
2. Execute o script de automação:
   ```bash
   python3 scripts/atualizar_portal.py
   ```
3. O arquivo `assets/js/data.json` será recalculado automaticamente.

### 3. Deploy de Atualizações no GitHub Pages
Como o deploy está atrelado à branch `main` do GitHub Pages:
```bash
git add .
git commit -m "feat/fix: descrição da alteração"
git push origin main
```
*Em cerca de 30 a 60 segundos o GitHub Pages atualiza o site no ar.*

---

## 🔐 7. Senhas e Acessos Administrativos

- **Área da Comissão (Painel no Rodapé):**
  - Senhas padrão válidas: `ads2026` ou `comissao2026`
  - Armazenamento: Validação via hash SHA-256 (`crypto.subtle`).
  - Recursos do Painel:
    - Comandos prontos de automação Python e Git.
    - Campo para conectar a URL do Web App do Google Apps Script (planilha de votação).
    - Botão `🔄 Resetar Voto de Teste` para limpar votos locais e testar enquetes novamente.
    - Botão `🔑 Alterar Senha` para definir senha customizada no navegador.

---

## 📌 8. Próximos Passos Sugeridos (Roadmap de Continuação)

Caso deseje continuar evoluindo o portal a partir do notebook Linux, aqui estão as tarefas mapeadas:
1. **Google Sheets para a Votação em Nuvem:**
   - Criar uma planilha no Google Drive com o script `scripts/google_apps_script.js` implantado como Web App.
   - Colar a URL gerada no Painel de Moderação (`ads2026`) para consolidar os votos da turma em tempo real na nuvem.
2. **Atualização Pós-Apitaço (após 16/11):**
   - Inserir as fotos oficiais do Apitaço no mural da turma.
   - Mudar a contagem regressiva principal para o próximo marco (**Prova de Togas em 12/12**).
3. **Músicas Sugeridas pela Turma:**
   - Adicionar uma mini-seção colaborativa com lista de músicas instrumentais/rock/eletrônica sugeridas pelos colegas para a entrada individual.
