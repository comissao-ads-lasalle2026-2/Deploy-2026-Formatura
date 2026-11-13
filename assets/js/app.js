/**
 * PORTAL DA FORMATURA ADS 2026/2 - APP LOGIC
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderAlerts();
  renderStats();
  initCountdown();
  renderApitaco();
  renderVoting();
  renderTimeline("ads"); // Default: foco em ADS
  renderFeed("todos");
  renderMediaGuide();
  renderFaq();
  renderContacts();
  initFilterTabs();
  initSearch();
  initModal();
  loadDynamicAnnouncements();
  initModeratorAuth();
  initChecklist();
  calculateGraduationBudget();
  updateBadgePreview();
  initVotingSystem();
});

/* Carrega avisos extras de data.json se disponível (modo servidor / GitHub Pages) */
async function loadDynamicAnnouncements() {
  try {
    const res = await fetch("assets/js/data.json");
    if (res.ok) {
      const data = await res.json();
      if (data && data.avisos && data.avisos.length > 0) {
        // Se houver avisos gerados pelo script, unificar com o feed
        GRADUATION_DATA.atualizacoesMural = data.avisos.reverse();
        renderFeed("todos");
      }
    }
  } catch (err) {
    // Silencioso em caso de file:/// sem servidor local
  }
}

/* ==========================================================================
   1. CONTROLE MULTI-TEMAS (5 PALETAS VISUAIS MODERNAS)
   ========================================================================== */
const THEMES = [
  { id: "cyber-ads", name: "Cyber ADS (Tech)", icon: "💻" },
  { id: "emerald-matrix", name: "Matrix Dev (Verde)", icon: "🟢" },
  { id: "royal-gold", name: "Royal Navy & Gold (Gala)", icon: "👑" },
  { id: "purple-nebula", name: "Synthwave AI (Púrpura)", icon: "🔮" },
  { id: "light-clean", name: "Minimal Acadêmico (Claro)", icon: "☀️" }
];

function initTheme() {
  const savedTheme = localStorage.getItem("ads_grad_theme") || "cyber-ads";
  applyTheme(savedTheme, false);

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      toggleQuickTheme();
    });
  }
}

function applyTheme(themeId, showNotification = true) {
  document.documentElement.setAttribute("data-theme", themeId);
  localStorage.setItem("ads_grad_theme", themeId);
  updateThemeIcon(themeId);
  updateThemePickerUI(themeId);
  if (showNotification) {
    const t = THEMES.find(item => item.id === themeId);
    showToast(`🎨 Estilo alterado para: ${t ? t.name : themeId}`);
  }
}

function updateThemePickerUI(currentTheme) {
  document.querySelectorAll(".theme-card-option").forEach(card => card.classList.remove("active"));
  const activeCard = document.getElementById(`theme-opt-${currentTheme}`);
  if (activeCard) activeCard.classList.add("active");
}

window.openThemeModal = function() {
  const modal = document.getElementById("theme-modal");
  const current = document.documentElement.getAttribute("data-theme") || "cyber-ads";
  updateThemePickerUI(current);
  if (modal) modal.classList.add("open");
};

window.closeThemeModal = function() {
  const modal = document.getElementById("theme-modal");
  if (modal) modal.classList.remove("open");
};

window.selectTheme = function(themeId) {
  applyTheme(themeId, true);
  closeThemeModal();
};

window.toggleQuickTheme = function() {
  const current = document.documentElement.getAttribute("data-theme") || "cyber-ads";
  const currentIndex = THEMES.findIndex(t => t.id === current);
  const nextIndex = (currentIndex + 1) % THEMES.length;
  applyTheme(THEMES[nextIndex].id, true);
};

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  if (!icon) return;
  if (theme === "light-clean" || theme === "light") {
    icon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`; // lua
  } else {
    icon.innerHTML = `<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>`; // sol
  }
}

/* ==========================================================================
   2. ALERTAS URGENTES NO TOPO
   ========================================================================== */
function renderAlerts() {
  const container = document.getElementById("alerts-container");
  if (!container || !GRADUATION_DATA.avisosUrgentes) return;

  container.innerHTML = GRADUATION_DATA.avisosUrgentes.map(aviso => `
    <div class="alert-card ${aviso.tipo}">
      <div>
        <div class="alert-header">
          <span class="alert-badge">${aviso.badge}</span>
          <h3 class="alert-title">${aviso.titulo}</h3>
        </div>
        <p class="alert-desc">${aviso.descricao}</p>
      </div>
      <a href="${aviso.linkAcao}" class="alert-btn">${aviso.textoAcao} →</a>
    </div>
  `).join("");
}

/* ==========================================================================
   3. ESTATÍSTICAS RÁPIDAS
   ========================================================================== */
function renderStats() {
  const container = document.getElementById("stats-container");
  if (!container || !GRADUATION_DATA.estatisticas) return;

  container.innerHTML = GRADUATION_DATA.estatisticas.map(stat => `
    <div class="glass-panel stat-card">
      <span class="stat-label">${stat.label}</span>
      <div class="stat-value">${stat.valor}</div>
      <span class="stat-detail">${stat.detalhe}</span>
    </div>
  `).join("");
}

/* ==========================================================================
   4. CONTAGEM REGRESSIVA PARA O PRÓXIMO EVENTO (APITAÇO ADS)
   ========================================================================== */
function initCountdown() {
  const targetDateStr = GRADUATION_DATA.meta.contagemRegressivaAlvo;
  const target = new Date(targetDateStr).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById("cd-days").textContent = "00";
      document.getElementById("cd-hours").textContent = "00";
      document.getElementById("cd-mins").textContent = "00";
      document.getElementById("cd-secs").textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("cd-days").textContent = String(days).padStart(2, "0");
    document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("cd-mins").textContent = String(mins).padStart(2, "0");
    document.getElementById("cd-secs").textContent = String(secs).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   5. FILTRO: FOCO ADS VS TODAS AS TURMAS
   ========================================================================== */
function initFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const mode = tab.dataset.mode; // 'ads' ou 'all'
      renderTimeline(mode);
      showToast(mode === "ads" ? "Exibindo eventos com foco em ADS" : "Exibindo todos os eventos da formatura");
    });
  });
}

/* ==========================================================================
   6. LINHA DO TEMPO (TIMELINE)
   ========================================================================== */
function renderTimeline(filterMode = "ads") {
  const container = document.getElementById("timeline-container");
  if (!container || !GRADUATION_DATA.cronograma) return;

  const filtered = GRADUATION_DATA.cronograma.filter(item => {
    if (filterMode === "ads") {
      return item.focoAds === true || item.status === "atual" || item.id >= 6;
    }
    return true;
  });

  container.innerHTML = filtered.map(item => `
    <div class="timeline-item ${item.status}">
      <div class="timeline-dot"></div>
      <div class="glass-panel timeline-card">
        <div class="timeline-card-header">
          <div class="timeline-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${item.data} • ${item.hora}
          </div>
          <span class="timeline-badge ${item.status}">${item.badge}</span>
        </div>
        <h4 class="timeline-title">${item.titulo}</h4>
        <p class="timeline-summary">${item.resumo}</p>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   7. DETALHES DO APITAÇO DE ADS
   ========================================================================== */
function renderApitaco() {
  const infoContainer = document.getElementById("apitaco-info");
  const orientacoesContainer = document.getElementById("apitaco-orientacoes");
  const dados = GRADUATION_DATA.apitacoAds;
  if (!dados) return;

  if (infoContainer) {
    infoContainer.innerHTML = `
      <div class="homenageados-grid">
        ${dados.homenageados.map(h => `
          <div class="homenageado-card">
            <div class="homenageado-avatar">${h.papel === "Paraninfo" ? "👨‍🏫" : "👩‍🏫"}</div>
            <div class="homenageado-info">
              <span class="homenageado-role">${h.papel} de ADS</span>
              <h4>${h.nome}</h4>
              <span class="homenageado-loc">📍 ${h.localizacao}</span>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  if (orientacoesContainer) {
    orientacoesContainer.innerHTML = `
      <ul class="orientacoes-list">
        ${dados.orientacoes.map(o => `
          <li>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span>${o}</span>
          </li>
        `).join("")}
      </ul>
    `;
  }
}

/* ==========================================================================
   8. VOTAÇÃO DO VÍDEO DOS FAMILIARES
   ========================================================================== */
function renderVoting() {
  const container = document.getElementById("voting-container");
  const dados = GRADUATION_DATA.votacaoVideo;
  if (!container || !dados) return;

  container.innerHTML = dados.opcoes.map(opcao => `
    <div class="glass-panel voting-card">
      <div>
        <span class="voting-tag">Opção em Votação</span>
        <h4 class="voting-title">${opcao.nome}</h4>
        <p class="voting-desc">${opcao.descricao}</p>
        <div class="voting-vantagem">
          💡 <strong>Destaque:</strong> ${opcao.vantagens}
        </div>
      </div>
      <div class="voting-actions">
        <button class="btn-primary" onclick="openVideoModal('${opcao.embedId}', '${opcao.nome}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Assistir Exemplo no Vimeo
        </button>
        <a href="${opcao.videoUrl}" target="_blank" rel="noopener" class="btn-secondary">
          Abrir Link Externo ↗
        </a>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   9. FEED / MURAL DE ATUALIZAÇÕES DO WHATSAPP
   ========================================================================== */
function renderFeed(filter = "todos") {
  const container = document.getElementById("feed-container");
  if (!container || !GRADUATION_DATA.atualizacoesMural) return;

  const filtered = GRADUATION_DATA.atualizacoesMural.filter(item => {
    if (filter === "todos") return true;
    if (filter === "ads") return item.relevanteAds;
    if (filter === "produtora") return item.tag === "Produtora";
    if (filter === "unilasalle") return item.tag === "Unilasalle";
    return true;
  });

  container.innerHTML = filtered.map(item => `
    <div class="glass-panel feed-card">
      <div class="feed-meta">
        <span class="feed-author">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          ${item.autor} • ${item.data} às ${item.hora}
        </span>
        <span class="feed-tag ${item.tag === 'ADS Exclusivo' ? 'ads' : ''}">${item.tag}</span>
      </div>
      <h4 class="feed-title">${item.titulo}</h4>
      <p class="feed-content">${item.conteudo}</p>
    </div>
  `).join("");

  // Setup buttons filter
  const filterBtns = document.querySelectorAll(".feed-filter-btn");
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderFeed(btn.dataset.tag);
    };
  });
}

/* ==========================================================================
   10. GUIA DE MÍDIA (FOTO PESSOAL E MÚSICA DE ENTRADA)
   ========================================================================== */
function renderMediaGuide() {
  const container = document.getElementById("media-guide-container");
  const midia = GRADUATION_DATA.regrasMidia;
  if (!container || !midia) return;

  container.innerHTML = `
    <!-- Música de Entrada -->
    <div class="glass-panel guide-card">
      <div class="guide-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
      </div>
      <h4 class="guide-title">Música de Entrada Individual (MP3)</h4>
      <p class="guide-desc">Toca quando o seu nome for anunciado ao subir no palco (~30s).</p>
      
      <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
        <p>• <strong>Formato:</strong> ${midia.musicaIndividual.formato} (até ${midia.musicaIndividual.tamanhoMaximo})</p>
        <p>• <strong>Qualidade:</strong> ${midia.musicaIndividual.qualidadeRecomendada}</p>
        <p>• <strong>Configuração:</strong> ${midia.musicaIndividual.configuracao}</p>
        <p>• <strong>Prazo limite:</strong> <span style="color:var(--accent-rose); font-weight:700;">${midia.prazoLimite}</span></p>
      </div>

      <div class="forbidden-box">
        <h5>🚫 É RIGOROSAMENTE PROIBIDO:</h5>
        <ul>
          ${midia.musicaIndividual.proibicoes.map(p => `<li>${p}</li>`).join("")}
        </ul>
      </div>
    </div>

    <!-- Foto Pessoal para Telão -->
    <div class="glass-panel guide-card">
      <div class="guide-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
      </div>
      <h4 class="guide-title">Foto Pessoal no Telão</h4>
      <p class="guide-desc">${midia.fotoPessoal.descricao}</p>
      
      <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
        <p>• <strong>Composição:</strong> ${midia.fotoPessoal.especificacoes}</p>
        <p>• <strong>Onde enviar:</strong> Portal do Formando da SP Produtora</p>
        <p>• <strong>Prazo limite:</strong> <span style="color:var(--accent-rose); font-weight:700;">${midia.prazoLimite}</span></p>
      </div>

      <div class="forbidden-box">
        <h5>⚠️ ATENÇÃO COM O CONTEÚDO:</h5>
        <p>${midia.fotoPessoal.restricoes}</p>
      </div>
    </div>

    <!-- Prova de Togas & Família -->
    <div class="glass-panel guide-card">
      <div class="guide-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      </div>
      <h4 class="guide-title">Prova de Toga & Fotógrafo Particular</h4>
      <p class="guide-desc">Marcado para <strong>12/12/2026</strong> pela manhã no campus.</p>
      
      <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
        <p>• <strong>Convidados:</strong> Até 8 pessoas por formando.</p>
        <p>• <strong>Family Day (Estúdio SP):</strong> Até 10 familiares + 1 pet (agendar via WhatsApp: 51 98210-0021).</p>
      </div>

      <div style="margin-top: 1rem; font-size: 0.8rem; color: var(--text-muted);">
        <strong style="color:var(--accent-amber);">Regras do Fotógrafo Particular:</strong>
        <ul style="padding-left:1.2rem; margin-top:0.35rem;">
          <li>Prioridade absoluta aos fotógrafos da produtora.</li>
          <li>Não pode atrasar o cronograma da foto oficial da turma.</li>
          <li>Canudo/chapéu oficial é exclusivo da SP; fotógrafo particular deve levar o dele.</li>
        </ul>
      </div>
    </div>
  `;
}

/* ==========================================================================
   11. FAQ ACCORDION
   ========================================================================== */
function renderFaq() {
  const container = document.getElementById("faq-container");
  if (!container || !GRADUATION_DATA.faq) return;

  container.innerHTML = GRADUATION_DATA.faq.map((item, index) => `
    <div class="faq-item" id="faq-item-${index}">
      <button class="faq-question" onclick="toggleFaq(${index})">
        <span>${item.pergunta}</span>
        <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div class="faq-answer">
        <p>${item.resposta}</p>
      </div>
    </div>
  `).join("");
}

window.toggleFaq = function(index) {
  const item = document.getElementById(`faq-item-${index}`);
  if (item) {
    item.classList.toggle("active");
  }
};

/* ==========================================================================
   12. CONTATOS E LINKS OFICIAIS
   ========================================================================== */
function renderContacts() {
  const container = document.getElementById("contacts-container");
  if (!container || !GRADUATION_DATA.contatos) return;

  container.innerHTML = GRADUATION_DATA.contatos.map(c => `
    <div class="glass-panel contact-card">
      <div class="contact-info">
        <h4>${c.nome}</h4>
        <p class="contact-role">${c.papel}</p>
        ${c.horario ? `<p style="font-size:0.8rem; color:var(--text-muted);">⏰ ${c.horario}</p>` : ""}
        ${c.whatsappFormatado ? `<p style="font-size:0.85rem; font-weight:600; color:var(--accent-cyan); margin-top:0.35rem;">📱 ${c.whatsappFormatado}</p>` : ""}
      </div>
      <div class="contact-btn">
        <a href="${c.link}" target="_blank" rel="noopener" class="btn-primary" style="width:100%; justify-content:center;">
          ${c.tipo === "web" ? "Acessar Portal CASA ↗" : "Conversar no WhatsApp 💬"}
        </a>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   13. BUSCA RÁPIDA DE CONTEÚDO
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById("portal-search");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    if (!term) {
      renderTimeline("ads");
      renderFeed("todos");
      return;
    }

    // Filtrar timeline
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach(el => {
      const text = el.textContent.toLowerCase();
      el.style.display = text.includes(term) ? "block" : "none";
    });

    // Filtrar feed
    const feedCards = document.querySelectorAll(".feed-card");
    feedCards.forEach(el => {
      const text = el.textContent.toLowerCase();
      el.style.display = text.includes(term) ? "block" : "none";
    });
  });
}

/* ==========================================================================
   14. MODAL PARA PREVIEW DE VÍDEOS DO VIMEO
   ========================================================================== */
function initModal() {
  const modal = document.getElementById("video-modal");
  const closeBtn = document.getElementById("modal-close");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      closeModal();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

window.openVideoModal = function(videoId, title) {
  const modal = document.getElementById("video-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalPlayer = document.getElementById("modal-player");

  if (!modal || !modalPlayer) return;

  modalTitle.textContent = title;
  modalPlayer.innerHTML = `<iframe src="https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  modal.classList.add("open");
};

function closeModal() {
  const modal = document.getElementById("video-modal");
  const modalPlayer = document.getElementById("modal-player");
  if (modal) {
    modal.classList.remove("open");
    if (modalPlayer) modalPlayer.innerHTML = "";
  }
}

/* ==========================================================================
   15. UTILITÁRIOS: COPIAR RESUMO WHATSAPP & TOAST
   ========================================================================== */
window.copyWhatsSummary = function() {
  const text = `🎓 *PORTAL DA FORMATURA ADS 2026/2 - RESUMO ATUALIZADO* 🚀
  
📍 *Próximo Marco: APITAÇO DE ADS*
🗓 Data: Segunda-feira, 16/11 às 19h (Chegar às 18h30)
📌 Ponto de Encontro: Sala Google
👨‍🏫 Paraninfo: Prof. Mozart Lemos (Prédio 15, Sala 801)
👩‍🏫 Homenageada: Tutora Priscila Gonçalves (Prédio 1, 6º andar)
🔔 Trazer apitos próprios! A produtora levará fantasias e fará as fotos.

🗳 *VOTAÇÃO URGENTE DO VÍDEO DOS PAIS (Até 20/11)*
Decisão entre Modelo Árvore (Digital) vs Modelo Cartaz (Presencial na Prova de Togas).

📸 *PROVA DE TOGAS:* 12/12 pela manhã
🎵 *PRAZO MÚSICA & FOTO:* 24/01/2027

Acesse todos os detalhes, links e avisos no portal oficial dos formandos de ADS!`;

  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 Resumo copiado para a área de transferência! Cole no WhatsApp.");
  }).catch(() => {
    showToast("Não foi possível copiar automaticamente.");
  });
};

function showToast(msg) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   16. CONTROLE DE ACESSO RESTRITO / MODERADOR (COMISSÃO)
   ========================================================================== */
const VALID_HASHES = [
  "479454c871e6fa83aaddd19139d40083858a5aba520a414d6ffa5f5562abd4ec", // ads2026
  "aa84517be5306896dad70ce57cbaad1b98b9cd74b82d00b5a23de5cd744ac477"  // comissao2026
];

function initModeratorAuth() {
  const isAuth = sessionStorage.getItem("ads_moderator_session") === "true";
  const panel = document.getElementById("moderator-panel");
  const linkBtn = document.getElementById("btn-open-moderator");
  
  if (isAuth && panel) {
    panel.style.display = "block";
    if (linkBtn) linkBtn.innerHTML = "🔓 Painel da Comissão (Ativo)";
  }
}

async function sha256Hex(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

window.openAuthModal = function() {
  const isAuth = sessionStorage.getItem("ads_moderator_session") === "true";
  const panel = document.getElementById("moderator-panel");
  if (isAuth && panel) {
    panel.scrollIntoView({ behavior: "smooth" });
    showToast("Você já está autenticado no painel.");
    return;
  }
  const modal = document.getElementById("auth-modal");
  const err = document.getElementById("auth-error");
  const pwdInput = document.getElementById("moderator-pwd");
  if (err) err.style.display = "none";
  if (pwdInput) pwdInput.value = "";
  if (modal) {
    modal.classList.add("open");
    setTimeout(() => pwdInput && pwdInput.focus(), 100);
  }
};

window.closeAuthModal = function() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.classList.remove("open");
};

window.handleModeratorLogin = async function(event) {
  event.preventDefault();
  const pwdInput = document.getElementById("moderator-pwd");
  const err = document.getElementById("auth-error");
  const panel = document.getElementById("moderator-panel");
  const linkBtn = document.getElementById("btn-open-moderator");

  if (!pwdInput) return;
  const inputVal = pwdInput.value.trim();
  const inputHash = await sha256Hex(inputVal);
  const customHash = localStorage.getItem("ads_custom_moderator_hash");

  const isValid = VALID_HASHES.includes(inputHash) || (customHash && inputHash === customHash);

  if (isValid) {
    sessionStorage.setItem("ads_moderator_session", "true");
    closeAuthModal();
    if (panel) {
      panel.style.display = "block";
      panel.scrollIntoView({ behavior: "smooth" });
    }
    if (linkBtn) linkBtn.innerHTML = "🔓 Painel da Comissão (Ativo)";
    showToast("🛡️ Acesso concedido! Bem-vindo à Área da Comissão.");
  } else {
    if (err) err.style.display = "block";
    pwdInput.focus();
    pwdInput.select();
  }
};

window.logoutModerator = function() {
  sessionStorage.removeItem("ads_moderator_session");
  const panel = document.getElementById("moderator-panel");
  const linkBtn = document.getElementById("btn-open-moderator");
  if (panel) panel.style.display = "none";
  if (linkBtn) linkBtn.innerHTML = "🔒 Área da Comissão / Moderação";
  showToast("🔒 Sessão de moderação encerrada com sucesso.");
};

window.promptChangePassword = async function() {
  const newPwd = prompt("Digite a nova senha de moderador (mínimo 4 caracteres):");
  if (!newPwd) return;
  if (newPwd.trim().length < 4) {
    alert("A senha deve ter pelo menos 4 caracteres.");
    return;
  }
  const hash = await sha256Hex(newPwd.trim());
  localStorage.setItem("ads_custom_moderator_hash", hash);
  showToast("🔑 Senha de moderador alterada com sucesso neste dispositivo!");
};

/* ==========================================================================
   17. CHECKLIST INTERATIVO DO FORMANDO
   ========================================================================== */
const CHECKLIST_ITEMS = [
  { id: "c1", title: "Abertura do Requerimento no CASA", desc: "Protocolo de colação de grau registrado no portal acadêmico Unilasalle." },
  { id: "c2", title: "Pacote Oficial da Formatura", desc: "Adesão ao pacote Standard com Quadro (R$ 1.200,00) via financeiro do CASA." },
  { id: "c3", title: "Presença Confirmada no Apitaço ADS", desc: "Segunda-feira (16/11) às 18h30 na Sala Google com apito próprio." },
  { id: "c4", title: "Voto no Modelo do Vídeo dos Familiares", desc: "Votar entre Modelo Árvore (Digital) vs Modelo Cartaz até dia 20/11." },
  { id: "c5", title: "Preparação para a Prova de Togas", desc: "Sábado 12/12 pela manhã. Fotos oficiais, de turma e familiares no campus." },
  { id: "c6", title: "Música MP3 de Entrada Preparada", desc: "Arquivo MP3 de boa qualidade (160k+) cortado para entrada no palco (~30s)." },
  { id: "c7", title: "Foto Pessoal no Portal do Formando SP", desc: "Upload da foto de infância/família até dia 24/01/2027 no portal da produtora." }
];

function initChecklist() {
  const container = document.getElementById("checklist-container");
  if (!container) return;

  const savedStates = JSON.parse(localStorage.getItem("ads_checklist_states") || "{}");

  container.innerHTML = CHECKLIST_ITEMS.map(item => {
    const isDone = !!savedStates[item.id];
    return `
      <div class="check-item ${isDone ? 'done' : ''}" id="check-row-${item.id}" onclick="toggleCheckItem('${item.id}')">
        <input type="checkbox" id="check-${item.id}" ${isDone ? 'checked' : ''} onclick="event.stopPropagation(); toggleCheckItem('${item.id}')">
        <div class="check-item-text">
          <h5>${item.title}</h5>
          <p>${item.desc}</p>
        </div>
      </div>
    `;
  }).join("");

  updateChecklistProgress();
}

window.toggleCheckItem = function(id) {
  const checkbox = document.getElementById(`check-${id}`);
  const row = document.getElementById(`check-row-${id}`);
  if (!checkbox || !row) return;

  checkbox.checked = !checkbox.checked;
  row.classList.toggle("done", checkbox.checked);

  const savedStates = JSON.parse(localStorage.getItem("ads_checklist_states") || "{}");
  savedStates[id] = checkbox.checked;
  localStorage.setItem("ads_checklist_states", JSON.stringify(savedStates));

  updateChecklistProgress();
  if (checkbox.checked) {
    showToast("✅ Etapa concluída com sucesso!");
  }
};

function updateChecklistProgress() {
  const savedStates = JSON.parse(localStorage.getItem("ads_checklist_states") || "{}");
  const doneCount = CHECKLIST_ITEMS.filter(item => !!savedStates[item.id]).length;
  const total = CHECKLIST_ITEMS.length;
  const percent = Math.round((doneCount / total) * 100);

  const progressBar = document.getElementById("checklist-progress-bar");
  const progressText = document.getElementById("checklist-progress-text");

  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressText) progressText.textContent = `${percent}% Concluído (${doneCount} de ${total})`;
}

/* ==========================================================================
   18. SIMULADOR DE ORÇAMENTO DA FORMATURA
   ========================================================================== */
window.calculateGraduationBudget = function() {
  const basePackage = 1200; // Standard com quadro
  const extrasEl = document.getElementById("calc-extras");
  const installmentsEl = document.getElementById("calc-installments");
  const totalDisplay = document.getElementById("calc-total-display");
  const installmentsDisplay = document.getElementById("calc-installments-display");

  const extras = extrasEl ? parseFloat(extrasEl.value) : 50;
  const installments = installmentsEl ? parseInt(installmentsEl.value) : 5;

  const total = basePackage + extras;
  const perInstallment = (total / installments).toFixed(2).replace(".", ",");
  const formattedTotal = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  if (totalDisplay) totalDisplay.textContent = formattedTotal;
  if (installmentsDisplay) {
    installmentsDisplay.textContent = installments === 1 
      ? "Valor integral à vista" 
      : `ou ${installments}x de R$ ${perInstallment}`;
  }
};

/* ==========================================================================
   19. GERADOR DE BADGE DO FORMANDO ADS
   ========================================================================== */
window.updateBadgePreview = function() {
  const input = document.getElementById("badge-name-input");
  const displayName = document.getElementById("badge-display-name");
  if (!input || !displayName) return;
  displayName.textContent = input.value.trim().toUpperCase() || "FORMANDO ADS";
};

window.copyBadgeShareText = function() {
  const input = document.getElementById("badge-name-input");
  const name = input && input.value.trim() ? input.value.trim() : "Formando";
  const text = `🎓 *CONCLUINTE ADS 2026/2 - UNILASALLE* 🚀\n\n` +
               `👤 Nome: ${name.toUpperCase()}\n` +
               `💻 Curso: Análise e Desenvolvimento de Sistemas\n` +
               `🏛 Instituição: Universidade La Salle (Canoas/RS)\n` +
               `🗓 Colação de Grau: Março/2027\n\n` +
               `Acompanhe todos os detalhes da nossa formatura no portal oficial:\n` +
               `https://comissao-ads-lasalle2026-2.github.io/Deploy-2026-Formatura/`;

  navigator.clipboard.writeText(text).then(() => {
    showToast("🎉 Texto do Card copiado para o WhatsApp!");
  }).catch(() => {
    showToast("Não foi possível copiar automaticamente.");
  });
};

/* ==========================================================================
   20. SISTEMA DE VOTAÇÃO E ENQUETES (VOTO ÚNICO COM GOOGLE SHEETS / LOCAL)
   ========================================================================== */
let currentPlacar = {
  total: 0,
  arvore: 0,
  cartaz: 0,
  pctArvore: 0,
  pctCartaz: 0
};

function loadStoredPlacar() {
  const savedPlacar = localStorage.getItem("ads_poll_placar");
  if (savedPlacar) {
    try {
      const p = JSON.parse(savedPlacar);
      if (p && typeof p.total === "number") return p;
    } catch(e) {}
  }

  // Se não há placar geral salvo, mas o formando já votou localmente neste aparelho:
  const savedVote = localStorage.getItem("ads_vote_familiares");
  if (savedVote) {
    try {
      const v = JSON.parse(savedVote);
      if (v && v.choice) {
        const isArvore = v.choice === "arvore";
        return {
          total: 1,
          arvore: isArvore ? 1 : 0,
          cartaz: isArvore ? 0 : 1,
          pctArvore: isArvore ? 100 : 0,
          pctCartaz: isArvore ? 0 : 100
        };
      }
    } catch(e) {}
  }

  return {
    total: 0,
    arvore: 0,
    cartaz: 0,
    pctArvore: 0,
    pctCartaz: 0
  };
}

function initVotingSystem() {
  const cfgInput = document.getElementById("cfg-voting-script-url");
  const savedUrl = localStorage.getItem("comissao_voting_api_url") || "";
  if (cfgInput) cfgInput.value = savedUrl;

  // Carrega placar persistente ou reconstrói a partir do voto do formando
  currentPlacar = loadStoredPlacar();

  // Verifica se o aluno já votou neste aparelho
  const savedVote = JSON.parse(localStorage.getItem("ads_vote_familiares") || "null");
  if (savedVote) {
    showVoteReceipt(savedVote.nome, savedVote.choice, savedVote.matricula);
  }

  // Renderiza imediatamente com porcentagens visíveis
  renderPlacarUI(currentPlacar);
  fetchCurrentPlacar();
}

window.selectPollOption = function(choice) {
  document.querySelectorAll(".poll-option-card").forEach(c => c.classList.remove("selected"));
  const card = document.getElementById(`opt-card-${choice}`);
  const radio = document.getElementById(`radio-${choice}`);
  if (card) card.classList.add("selected");
  if (radio) radio.checked = true;
};

async function fetchCurrentPlacar() {
  const apiUrl = localStorage.getItem("comissao_voting_api_url");
  if (!apiUrl) return;

  try {
    const res = await fetch(`${apiUrl}?enqueteId=homenagem-familiares`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.placar && data.placar.total > 0) {
        currentPlacar = data.placar;
        localStorage.setItem("ads_poll_placar", JSON.stringify(currentPlacar));
        renderPlacarUI(currentPlacar);
      }
    }
  } catch (err) {
    // Mantém placar local se offline
  }
}

function renderPlacarUI(placar) {
  const pctArvore = document.getElementById("pct-arvore");
  const pctCartaz = document.getElementById("pct-cartaz");
  const fillArvore = document.getElementById("fill-arvore");
  const fillCartaz = document.getElementById("fill-cartaz");
  const totalVotes = document.getElementById("poll-total-votes");

  const arvore = (placar && placar.arvore) ? Number(placar.arvore) : 0;
  const cartaz = (placar && placar.cartaz) ? Number(placar.cartaz) : 0;
  const total = (placar && typeof placar.total === "number") ? Number(placar.total) : (arvore + cartaz);

  const pctA = total > 0 ? Math.round((arvore / total) * 100) : 0;
  const pctC = total > 0 ? (100 - pctA) : 0;

  if (pctArvore) {
    pctArvore.innerHTML = `<span class="poll-badge-pct arvore">${pctA}%</span><span class="poll-badge-count">(${arvore} ${arvore === 1 ? 'voto' : 'votos'})</span>`;
  }
  if (pctCartaz) {
    pctCartaz.innerHTML = `<span class="poll-badge-pct cartaz">${pctC}%</span><span class="poll-badge-count">(${cartaz} ${cartaz === 1 ? 'voto' : 'votos'})</span>`;
  }
  if (fillArvore) fillArvore.style.width = `${pctA}%`;
  if (fillCartaz) fillCartaz.style.width = `${pctC}%`;
  if (totalVotes) {
    totalVotes.innerHTML = total > 0 
      ? `Total computado: <strong style="color:var(--text-primary);">${total}</strong> formando${total === 1 ? '' : 's'}` 
      : `Aguardando primeiros votos da turma`;
  }
}

window.handleCastVote = async function(event) {
  event.preventDefault();

  const nameInput = document.getElementById("voter-name");
  const idInput = document.getElementById("voter-id");
  const choiceRadio = document.querySelector('input[name="poll_choice"]:checked');
  const btnSubmit = document.getElementById("btn-submit-vote");
  const statusMsg = document.getElementById("vote-status-msg");

  if (!nameInput || !idInput || !choiceRadio) return;

  const nome = nameInput.value.trim();
  const matricula = idInput.value.trim();
  const choice = choiceRadio.value;

  if (nome.length < 3 || matricula.length < 4) {
    showToast("⚠️ Preencha seu nome completo e matrícula válida.");
    return;
  }

  // Verifica se já votou localmente
  const savedVote = JSON.parse(localStorage.getItem("ads_vote_familiares") || "null");
  if (savedVote) {
    showToast("⚠️ Você já registrou seu voto nesta enquete!");
    return;
  }

  btnSubmit.disabled = true;
  btnSubmit.innerHTML = "⏳ Gravando voto...";
  if (statusMsg) statusMsg.textContent = "Validando dados...";

  const apiUrl = localStorage.getItem("comissao_voting_api_url");

  if (apiUrl) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          enqueteId: "homenagem-familiares",
          nome: nome,
          matricula: matricula,
          voto: choice
        })
      });

      const result = await response.json();

      if (result.status === "duplicado") {
        alert(result.mensagem || "⚠️ Esta matrícula já registrou voto anteriormente.");
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = "🗳️ Confirmar Meu Voto";
        if (statusMsg) statusMsg.textContent = "";
        return;
      }

      if (result.placar) {
        currentPlacar = result.placar;
      }
    } catch (e) {
      console.warn("API remota indisponível, computando voto localmente:", e);
    }
  }

  // Registra confirmação local e atualiza placar
  if (choice === "arvore") currentPlacar.arvore++;
  else currentPlacar.cartaz++;
  currentPlacar.total = currentPlacar.arvore + currentPlacar.cartaz;
  currentPlacar.pctArvore = Math.round((currentPlacar.arvore / currentPlacar.total) * 100);
  currentPlacar.pctCartaz = 100 - currentPlacar.pctArvore;

  // Persiste tanto o voto quanto o placar atualizado
  localStorage.setItem("ads_vote_familiares", JSON.stringify({ nome, matricula, choice }));
  localStorage.setItem("ads_poll_placar", JSON.stringify(currentPlacar));

  renderPlacarUI(currentPlacar);
  showVoteReceipt(nome, choice, matricula);
  showToast("🎉 Parabéns! Seu voto oficial foi registrado com sucesso!");
};

function showVoteReceipt(nome, choice, matricula) {
  const form = document.getElementById("vote-form");
  const receipt = document.getElementById("vote-receipt");
  const receiptText = document.getElementById("vote-receipt-text");

  if (form) form.style.display = "none";
  if (receipt && receiptText) {
    const nomeModelo = choice === "arvore" ? "🌳 Modelo Árvore (Digital)" : "📜 Modelo Cartaz (Presencial)";
    receiptText.innerHTML = `
      <div style="font-size:0.95rem; line-height:1.6;">
        Olá, <strong>${nome}</strong> (Matrícula: <code>${matricula}</code>).<br>
        Seu voto oficial foi registrado para: <strong style="color:var(--accent-emerald);">${nomeModelo}</strong>.
      </div>
      <div style="margin-top:0.6rem; font-size:0.8rem; color:var(--text-secondary); display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
        <span style="background:rgba(16,185,129,0.2); color:var(--accent-emerald); padding:0.2rem 0.5rem; border-radius:var(--radius-sm); font-weight:700;">
          ✓ Voto Único Computado
        </span>
        <span>A porcentagem atualizada da turma está calculada no placar abaixo em tempo real.</span>
      </div>
    `;
    receipt.style.display = "block";
  }
}

window.resetLocalVote = function() {
  if (confirm("Deseja realmente limpar seu voto de teste deste navegador para testar a votação novamente?")) {
    localStorage.removeItem("ads_vote_familiares");
    localStorage.removeItem("ads_poll_placar");
    currentPlacar = { total: 0, arvore: 0, cartaz: 0, pctArvore: 0, pctCartaz: 0 };
    renderPlacarUI(currentPlacar);
    
    const form = document.getElementById("vote-form");
    const receipt = document.getElementById("vote-receipt");
    const btnSubmit = document.getElementById("btn-submit-vote");
    const statusMsg = document.getElementById("vote-status-msg");
    const nameInput = document.getElementById("voter-name");
    const idInput = document.getElementById("voter-id");
    
    if (form) form.style.display = "block";
    if (receipt) receipt.style.display = "none";
    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = "🗳️ Confirmar Meu Voto";
    }
    if (statusMsg) statusMsg.textContent = "";
    if (nameInput) nameInput.value = "";
    if (idInput) idInput.value = "";
    
    document.querySelectorAll(".poll-option-card").forEach(c => c.classList.remove("selected"));
    const radios = document.querySelectorAll('input[name="poll_choice"]');
    radios.forEach(r => r.checked = false);

    showToast("🔄 Voto de teste resetado! O formulário está pronto para um novo teste.");
  }
};

window.saveVotingApiUrl = function() {
  const input = document.getElementById("cfg-voting-script-url");
  if (!input) return;
  const url = input.value.trim();
  localStorage.setItem("comissao_voting_api_url", url);
  showToast("🔗 Conexão com Google Apps Script salva com sucesso!");
  fetchCurrentPlacar();
};
