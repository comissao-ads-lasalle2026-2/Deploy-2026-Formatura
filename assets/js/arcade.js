/**
 * RETRO ADS ARCADE (EASTER EGG)
 * =============================================================================
 * Inclui dois clássicos retrô 100% responsivos e jogáveis em qualquer dispositivo:
 * 1. Cyber Pinball ADS 2026 (Fliperama com física, bumpers neon e flippers)
 * 2. Bomber-ADS 2026 (Caça ao Diploma com labirinto e bombas)
 *
 * Suporte completo para:
 * - Telas touch (celular e tablet) com botões virtuais e toque em tela
 * - Teclado de computador (Setas, WASD, Barra de Espaço)
 * - Efeitos sonoros 8-bit sintetizados em tempo real via Web Audio API (sem áudio externo)
 * =============================================================================
 */

(function() {
  "use strict";

  // --- ÁUDIO RETRÔ SINTETIZADO (Web Audio API) ---
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playRetroSound(type) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === "flipper") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "bumper") {
        osc.type = "square";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.04);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "launch") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === "drain") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(250, now);
        osc.frequency.linearRampToValueAtTime(70, now + 0.3);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "bomb") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.3);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "win") {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const noteOsc = audioCtx.createOscillator();
          const noteGain = audioCtx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(audioCtx.destination);
          noteOsc.type = "square";
          noteOsc.frequency.setValueAtTime(freq, now + idx * 0.08);
          noteGain.gain.setValueAtTime(0.12, now + idx * 0.08);
          noteGain.gain.linearRampToValueAtTime(0.001, now + idx * 0.08 + 0.15);
          noteOsc.start(now + idx * 0.08);
          noteOsc.stop(now + idx * 0.08 + 0.16);
        });
      }
    } catch (e) {}
  }

  // --- GERENCIADOR DE MODAL E JOGOS ---
  let activeGame = "pinball"; // "pinball" ou "bomber"
  let pinballAnim = null;
  let bomberAnim = null;

  window.openArcadeModal = function(gameName = "pinball") {
    initAudio();
    const modal = document.getElementById("arcade-modal");
    if (!modal) return;
    modal.classList.add("open");
    switchArcadeGame(gameName);
  };

  window.closeArcadeModal = function() {
    const modal = document.getElementById("arcade-modal");
    if (modal) modal.classList.remove("open");
    stopPinball();
    stopBomber();
  };

  window.switchArcadeGame = function(game) {
    activeGame = game;
    stopPinball();
    stopBomber();

    const btnPinball = document.getElementById("tab-pinball");
    const btnBomber = document.getElementById("tab-bomber");
    const boxPinball = document.getElementById("arcade-pinball-box");
    const boxBomber = document.getElementById("arcade-bomber-box");

    if (game === "pinball") {
      if (btnPinball) btnPinball.classList.add("active");
      if (btnBomber) btnBomber.classList.remove("active");
      if (boxPinball) boxPinball.style.display = "flex";
      if (boxBomber) boxBomber.style.display = "none";
      startPinball();
    } else {
      if (btnPinball) btnPinball.classList.remove("active");
      if (btnBomber) btnBomber.classList.add("active");
      if (boxPinball) boxPinball.style.display = "none";
      if (boxBomber) boxBomber.style.display = "flex";
      startBomber();
    }
  };

  window.toggleArcadeSound = function() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById("arcade-sound-btn");
    if (btn) {
      btn.innerHTML = soundEnabled ? "🔊 Som: ON" : "🔇 Som: OFF";
    }
  };

  /* ==========================================================================
     JOGO 1: CYBER PINBALL ADS 2026
     ========================================================================== */
  const P_WIDTH = 360;
  const P_HEIGHT = 560;

  let pCanvas, pCtx;
  let pBall = { x: 338, y: 500, vx: 0, vy: 0, r: 8, inPlay: false };
  let pScore = 0;
  let pHighScore = parseInt(localStorage.getItem("ads_pinball_hi") || "0", 10);
  let pBallsLeft = 3;
  let pGameOver = false;

  // Flippers
  const pLeftFlipper = {
    x: 105, y: 470, length: 62,
    restAngle: 0.5, hitAngle: -0.45,
    currAngle: 0.5, active: false
  };

  const pRightFlipper = {
    x: 235, y: 470, length: 62,
    restAngle: Math.PI - 0.5, hitAngle: Math.PI + 0.45,
    currAngle: Math.PI - 0.5, active: false
  };

  // Bumpers com tema de Formatura ADS
  const pBumpers = [
    { x: 120, y: 175, r: 24, label: "ADS", color: "#06b6d4", pts: 500, flash: 0 },
    { x: 220, y: 175, r: 24, label: "2026", color: "#a855f7", pts: 500, flash: 0 },
    { x: 170, y: 255, r: 28, label: "🎓 TOGA", color: "#10b981", pts: 1000, flash: 0 },
    { x: 170, y: 105, r: 20, label: "APITAÇO", color: "#f59e0b", pts: 750, flash: 0 }
  ];

  function startPinball() {
    pCanvas = document.getElementById("pinball-canvas");
    if (!pCanvas) return;
    pCtx = pCanvas.getContext("2d");
    resetPinballGame();
    setupPinballControls();
    if (!pinballAnim) pinballLoop();
  }

  function stopPinball() {
    if (pinballAnim) {
      cancelAnimationFrame(pinballAnim);
      pinballAnim = null;
    }
  }

  function resetPinballGame() {
    pScore = 0;
    pBallsLeft = 3;
    pGameOver = false;
    resetBallToPlunger();
    updatePinballUI();
  }

  function resetBallToPlunger() {
    pBall.x = 338;
    pBall.y = 480;
    pBall.vx = 0;
    pBall.vy = 0;
    pBall.inPlay = false;
  }

  window.launchPinballBall = function() {
    if (pGameOver) {
      resetPinballGame();
      return;
    }
    if (!pBall.inPlay) {
      pBall.inPlay = true;
      pBall.vy = -15 - Math.random() * 3;
      pBall.vx = (Math.random() - 0.5) * 1.5;
      playRetroSound("launch");
    }
  };

  window.setPinballFlipper = function(side, active) {
    if (side === "left") pLeftFlipper.active = active;
    if (side === "right") pRightFlipper.active = active;
    if (active) playRetroSound("flipper");
  };

  let pKeyListenersBound = false;
  function setupPinballControls() {
    if (pKeyListenersBound) return;
    pKeyListenersBound = true;

    window.addEventListener("keydown", (e) => {
      if (activeGame !== "pinball") return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setPinballFlipper("left", true);
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setPinballFlipper("right", true);
      }
      if (e.key === " " || e.key === "ArrowDown" || e.key === "s") {
        launchPinballBall();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (activeGame !== "pinball") return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setPinballFlipper("left", false);
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setPinballFlipper("right", false);
      }
    });

    // Touch na tela do canvas
    const canvas = document.getElementById("pinball-canvas");
    if (canvas) {
      canvas.addEventListener("pointerdown", (e) => {
        const rect = canvas.getBoundingClientRect();
        const touchX = ((e.clientX - rect.left) / rect.width) * P_WIDTH;
        if (touchX > 310) {
          launchPinballBall();
        } else if (touchX < P_WIDTH / 2) {
          setPinballFlipper("left", true);
        } else {
          setPinballFlipper("right", true);
        }
      });

      canvas.addEventListener("pointerup", (e) => {
        setPinballFlipper("left", false);
        setPinballFlipper("right", false);
      });
      canvas.addEventListener("pointercancel", (e) => {
        setPinballFlipper("left", false);
        setPinballFlipper("right", false);
      });
    }
  }

  function updatePinballPhysics() {
    if (pGameOver) return;

    // Atualiza flippers
    const flipperSpeed = 0.35;
    const lTarget = pLeftFlipper.active ? pLeftFlipper.hitAngle : pLeftFlipper.restAngle;
    pLeftFlipper.currAngle += (lTarget - pLeftFlipper.currAngle) * flipperSpeed;

    const rTarget = pRightFlipper.active ? pRightFlipper.hitAngle : pRightFlipper.restAngle;
    pRightFlipper.currAngle += (rTarget - pRightFlipper.currAngle) * flipperSpeed;

    // Se a bola não estiver lançada, fica na rampa
    if (!pBall.inPlay) {
      pBall.x = 338;
      pBall.y = 480;
      return;
    }

    // Física da bola
    const gravity = 0.22;
    pBall.vy += gravity;
    pBall.vx *= 0.995;
    pBall.vy *= 0.995;

    // Velocidade terminal de segurança
    const maxSpeed = 16;
    const speed = Math.hypot(pBall.vx, pBall.vy);
    if (speed > maxSpeed) {
      pBall.vx = (pBall.vx / speed) * maxSpeed;
      pBall.vy = (pBall.vy / speed) * maxSpeed;
    }

    pBall.x += pBall.vx;
    pBall.y += pBall.vy;

    // Colisão com teto arqueado e paredes
    if (pBall.y < 90 && pBall.x < 320) {
      // Curva superior do domo
      const cx = 160, cy = 90, cr = 140;
      const dx = pBall.x - cx;
      const dy = pBall.y - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > cr) {
        const nx = dx / dist;
        const ny = dy / dist;
        pBall.x = cx + nx * cr;
        pBall.y = cy + ny * cr;
        const dot = pBall.vx * nx + pBall.vy * ny;
        pBall.vx = (pBall.vx - 2 * dot * nx) * 0.8;
        pBall.vy = (pBall.vy - 2 * dot * ny) * 0.8;
      }
    } else {
      if (pBall.y - pBall.r < 10) {
        pBall.y = 10 + pBall.r;
        pBall.vy = Math.abs(pBall.vy) * 0.8;
      }
    }

    // Parede lateral esquerda
    if (pBall.x - pBall.r < 20) {
      pBall.x = 20 + pBall.r;
      pBall.vx = Math.abs(pBall.vx) * 0.85;
    }

    // Parede da rampa de tiro (separador direito)
    if (pBall.y > 140 && pBall.x > 315 - pBall.r && pBall.x < 320) {
      pBall.x = 315 - pBall.r;
      pBall.vx = -Math.abs(pBall.vx) * 0.85;
    }

    // Parede extrema direita
    if (pBall.x + pBall.r > 348) {
      pBall.x = 348 - pBall.r;
      pBall.vx = -Math.abs(pBall.vx) * 0.85;
    }

    // Guia diagonal inferior esquerda
    checkLineCollision(pBall, 20, 390, pLeftFlipper.x, pLeftFlipper.y, 0.7);
    // Guia diagonal inferior direita
    checkLineCollision(pBall, 315, 390, pRightFlipper.x, pRightFlipper.y, 0.7);

    // Colisão com Bumpers
    pBumpers.forEach(b => {
      if (b.flash > 0) b.flash--;
      const dx = pBall.x - b.x;
      const dy = pBall.y - b.y;
      const dist = Math.hypot(dx, dy);
      const minDist = pBall.r + b.r;

      if (dist < minDist) {
        const nx = dx / dist;
        const ny = dy / dist;
        pBall.x = b.x + nx * minDist;
        pBall.y = b.y + ny * minDist;

        // Impulso forte do bumper
        const impulse = 8.5;
        pBall.vx = nx * impulse;
        pBall.vy = ny * impulse;

        b.flash = 12;
        pScore += b.pts;
        playRetroSound("bumper");
        updatePinballUI();
      }
    });

    // Colisão com Flipper Esquerdo
    checkFlipperCollision(pBall, pLeftFlipper, true);
    // Colisão com Flipper Direito
    checkFlipperCollision(pBall, pRightFlipper, false);

    // Queda no dreno (perde a bola)
    if (pBall.y > P_HEIGHT + 20) {
      pBallsLeft--;
      playRetroSound("drain");
      if (pBallsLeft <= 0) {
        pGameOver = true;
        if (pScore > pHighScore) {
          pHighScore = pScore;
          localStorage.setItem("ads_pinball_hi", pHighScore.toString());
        }
      } else {
        resetBallToPlunger();
      }
      updatePinballUI();
    }
  }

  function checkFlipperCollision(ball, flipper, isLeft) {
    const x1 = flipper.x;
    const y1 = flipper.y;
    const x2 = x1 + Math.cos(flipper.currAngle) * flipper.length;
    const y2 = y1 + Math.sin(flipper.currAngle) * flipper.length;

    // Distância da bola até o segmento de reta do flipper
    const lineDX = x2 - x1;
    const lineDY = y2 - y1;
    const lineLenSq = lineDX * lineDX + lineDY * lineDY;
    let t = ((ball.x - x1) * lineDX + (ball.y - y1) * lineDY) / lineLenSq;
    t = Math.max(0, Math.min(1, t));

    const nearestX = x1 + t * lineDX;
    const nearestY = y1 + t * lineDY;
    const dist = Math.hypot(ball.x - nearestX, ball.y - nearestY);

    if (dist < ball.r + 5) {
      const normalX = -(y2 - y1) / Math.sqrt(lineLenSq);
      const normalY = (x2 - x1) / Math.sqrt(lineLenSq);

      // Reposiciona bola para fora do flipper
      ball.x = nearestX + normalX * (ball.r + 6);
      ball.y = nearestY + normalY * (ball.r + 6);

      // Impulso extra se flipper estiver subindo
      const kick = flipper.active ? 13 : 4;
      ball.vx = normalX * kick + (Math.random() - 0.5) * 2;
      ball.vy = normalY * kick;
      pScore += 50;
      updatePinballUI();
    }
  }

  function checkLineCollision(ball, x1, y1, x2, y2, restitution = 0.7) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    let t = ((ball.x - x1) * dx + (ball.y - y1) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));

    const nx = x1 + t * dx;
    const ny = y1 + t * dy;
    const dist = Math.hypot(ball.x - nx, ball.y - ny);

    if (dist < ball.r) {
      const normalX = (ball.x - nx) / dist;
      const normalY = (ball.y - ny) / dist;

      ball.x = nx + normalX * ball.r;
      ball.y = ny + normalY * ball.r;

      const dot = ball.vx * normalX + ball.vy * normalY;
      ball.vx = (ball.vx - 2 * dot * normalX) * restitution;
      ball.vy = (ball.vy - 2 * dot * normalY) * restitution;
    }
  }

  function drawPinball() {
    if (!pCtx) return;
    pCtx.clearRect(0, 0, P_WIDTH, P_HEIGHT);

    // Fundo Cyberpunk Retrô
    const bgGrad = pCtx.createLinearGradient(0, 0, 0, P_HEIGHT);
    bgGrad.addColorStop(0, "#080c18");
    bgGrad.addColorStop(1, "#0f172a");
    pCtx.fillStyle = bgGrad;
    pCtx.fillRect(0, 0, P_WIDTH, P_HEIGHT);

    // Grade de fundo sutil estilo Matrix
    pCtx.strokeStyle = "rgba(6, 182, 212, 0.05)";
    pCtx.lineWidth = 1;
    for (let x = 0; x < P_WIDTH; x += 25) {
      pCtx.beginPath();
      pCtx.moveTo(x, 0);
      pCtx.lineTo(x, P_HEIGHT);
      pCtx.stroke();
    }
    for (let y = 0; y < P_HEIGHT; y += 25) {
      pCtx.beginPath();
      pCtx.moveTo(0, y);
      pCtx.lineTo(P_WIDTH, y);
      pCtx.stroke();
    }

    // Paredes e Bordas Neon
    pCtx.strokeStyle = "#06b6d4";
    pCtx.lineWidth = 3;
    pCtx.shadowBlur = 10;
    pCtx.shadowColor = "#06b6d4";

    pCtx.beginPath();
    // Borda superior arqueada
    pCtx.moveTo(20, 390);
    pCtx.lineTo(20, 90);
    pCtx.arc(160, 90, 140, Math.PI, 0, false);
    pCtx.lineTo(320, 530);
    pCtx.stroke();

    // Rampa de tiro direita
    pCtx.beginPath();
    pCtx.moveTo(348, 90);
    pCtx.lineTo(348, 530);
    pCtx.stroke();

    // Guias inferiores até os flippers
    pCtx.strokeStyle = "#a855f7";
    pCtx.shadowColor = "#a855f7";
    pCtx.beginPath();
    pCtx.moveTo(20, 390);
    pCtx.lineTo(pLeftFlipper.x, pLeftFlipper.y);
    pCtx.moveTo(320, 390);
    pCtx.lineTo(pRightFlipper.x, pRightFlipper.y);
    pCtx.stroke();

    pCtx.shadowBlur = 0; // Desliga glow para formas internas

    // Bumpers
    pBumpers.forEach(b => {
      pCtx.save();
      pCtx.shadowBlur = b.flash > 0 ? 25 : 12;
      pCtx.shadowColor = b.color;
      pCtx.fillStyle = b.flash > 0 ? "#ffffff" : b.color;
      pCtx.beginPath();
      pCtx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      pCtx.fill();

      // Borda interna
      pCtx.strokeStyle = "#ffffff";
      pCtx.lineWidth = 2;
      pCtx.stroke();

      // Texto do Bumper
      pCtx.fillStyle = b.flash > 0 ? "#000000" : "#ffffff";
      pCtx.font = "bold 10px 'JetBrains Mono', monospace";
      pCtx.textAlign = "center";
      pCtx.textBaseline = "middle";
      pCtx.fillText(b.label, b.x, b.y);
      pCtx.restore();
    });

    // Flippers
    drawFlipper(pLeftFlipper, "#10b981");
    drawFlipper(pRightFlipper, "#10b981");

    // Bola
    pCtx.save();
    pCtx.shadowBlur = 12;
    pCtx.shadowColor = "#ffffff";
    const ballGrad = pCtx.createRadialGradient(pBall.x - 2, pBall.y - 2, 1, pBall.x, pBall.y, pBall.r);
    ballGrad.addColorStop(0, "#ffffff");
    ballGrad.addColorStop(0.7, "#cbd5e1");
    ballGrad.addColorStop(1, "#64748b");
    pCtx.fillStyle = ballGrad;
    pCtx.beginPath();
    pCtx.arc(pBall.x, pBall.y, pBall.r, 0, Math.PI * 2);
    pCtx.fill();
    pCtx.restore();

    // Mola do Lançador (Plunger)
    if (!pBall.inPlay) {
      pCtx.strokeStyle = "#f59e0b";
      pCtx.lineWidth = 3;
      pCtx.beginPath();
      for (let y = 495; y < 535; y += 8) {
        pCtx.moveTo(330, y);
        pCtx.lineTo(346, y + 4);
      }
      pCtx.stroke();
    }

    // Tela de GAME OVER
    if (pGameOver) {
      pCtx.fillStyle = "rgba(0, 0, 0, 0.85)";
      pCtx.fillRect(0, 0, P_WIDTH, P_HEIGHT);

      pCtx.fillStyle = "#f43f5e";
      pCtx.font = "bold 26px 'JetBrains Mono', monospace";
      pCtx.textAlign = "center";
      pCtx.fillText("GAME OVER", P_WIDTH / 2, 220);

      pCtx.fillStyle = "#ffffff";
      pCtx.font = "14px 'Inter', sans-serif";
      pCtx.fillText(`Pontuação Final: ${pScore}`, P_WIDTH / 2, 260);

      if (pScore >= pHighScore && pScore > 0) {
        pCtx.fillStyle = "#fbbf24";
        pCtx.fillText("🏆 NOVO RECORDE DA TURMA! 🏆", P_WIDTH / 2, 290);
      }

      pCtx.fillStyle = "#06b6d4";
      pCtx.font = "bold 13px 'Inter', sans-serif";
      pCtx.fillText("Toque em 'Lançar' ou Espaço para Reiniciar", P_WIDTH / 2, 340);
    }
  }

  function drawFlipper(flipper, color) {
    pCtx.save();
    pCtx.translate(flipper.x, flipper.y);
    pCtx.rotate(flipper.currAngle);

    pCtx.shadowBlur = 8;
    pCtx.shadowColor = color;
    pCtx.fillStyle = color;

    // Formato chanfrado de flipper
    pCtx.beginPath();
    pCtx.arc(0, 0, 7, Math.PI / 2, -Math.PI / 2, false);
    pCtx.lineTo(flipper.length, -3);
    pCtx.arc(flipper.length, 0, 3, -Math.PI / 2, Math.PI / 2, false);
    pCtx.lineTo(0, 7);
    pCtx.closePath();
    pCtx.fill();

    // Pivô
    pCtx.fillStyle = "#ffffff";
    pCtx.beginPath();
    pCtx.arc(0, 0, 3, 0, Math.PI * 2);
    pCtx.fill();

    pCtx.restore();
  }

  function updatePinballUI() {
    const scoreEl = document.getElementById("pinball-score-val");
    const hiEl = document.getElementById("pinball-hi-val");
    const ballsEl = document.getElementById("pinball-balls-val");

    if (scoreEl) scoreEl.textContent = pScore.toString().padStart(6, "0");
    if (hiEl) hiEl.textContent = pHighScore.toString().padStart(6, "0");
    if (ballsEl) ballsEl.textContent = "● ".repeat(Math.max(0, pBallsLeft)).trim() || "0";
  }

  function pinballLoop() {
    updatePinballPhysics();
    drawPinball();
    if (activeGame === "pinball") {
      pinballAnim = requestAnimationFrame(pinballLoop);
    }
  }


  /* ==========================================================================
     JOGO 2: BOMBER-ADS 2026 (CAÇADOR DE DIPLOMA)
     ========================================================================== */
  const B_GRID = 11;
  const B_TILE = 32; // 352x352 total
  let bCanvas, bCtx;

  // Mapa: 0 = vazio, 1 = parede de aço indestrutível, 2 = bug/bloco de código destrutível, 3 = diploma secreto
  let bMap = [];
  let bPlayer = { x: 1, y: 1, px: 32, py: 32, speed: 2.5, alive: true, won: false };
  let bBombs = [];
  let bFlames = [];
  let bEnemies = [];
  let bScore = 0;
  let bGameOver = false;

  function startBomber() {
    bCanvas = document.getElementById("bomber-canvas");
    if (!bCanvas) return;
    bCtx = bCanvas.getContext("2d");
    resetBomberGame();
    setupBomberControls();
    if (!bomberAnim) bomberLoop();
  }

  function stopBomber() {
    if (bomberAnim) {
      cancelAnimationFrame(bomberAnim);
      bomberAnim = null;
    }
  }

  function resetBomberGame() {
    bMap = [];
    bBombs = [];
    bFlames = [];
    bScore = 0;
    bGameOver = false;
    bPlayer = { x: 1, y: 1, px: 32, py: 32, speed: 2.5, alive: true, won: false };

    // Gera grid clássico
    for (let r = 0; r < B_GRID; r++) {
      bMap[r] = [];
      for (let c = 0; c < B_GRID; c++) {
        // Bordas
        if (r === 0 || r === B_GRID - 1 || c === 0 || c === B_GRID - 1) {
          bMap[r][c] = 1;
        } else if (r % 2 === 0 && c % 2 === 0) {
          bMap[r][c] = 1; // Pilares fixos de aço
        } else if ((r <= 2 && c <= 2)) {
          bMap[r][c] = 0; // Zona de spawn segura do player
        } else {
          // 60% chance de ter bloco de código quebrável
          bMap[r][c] = Math.random() < 0.65 ? 2 : 0;
        }
      }
    }

    // Esconde o diploma dentro de um dos blocos quebráveis
    let diplomaPlaced = false;
    for (let r = B_GRID - 3; r >= 3 && !diplomaPlaced; r--) {
      for (let c = B_GRID - 3; c >= 3 && !diplomaPlaced; c--) {
        if (bMap[r][c] === 2) {
          bMap[r][c] = 3; // Bloco que contém o Diploma
          diplomaPlaced = true;
        }
      }
    }

    // Inimigos: 2 "Bugs de Código 404"
    bEnemies = [
      { x: 9, y: 1, px: 9 * B_TILE, py: 1 * B_TILE, dir: "down", timer: 0 },
      { x: 1, y: 9, px: 1 * B_TILE, py: 9 * B_TILE, dir: "right", timer: 0 }
    ];

    updateBomberUI();
  }

  const bKeys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
  let bKeyListenersBound = false;

  function setupBomberControls() {
    if (bKeyListenersBound) return;
    bKeyListenersBound = true;

    window.addEventListener("keydown", (e) => {
      if (activeGame !== "bomber") return;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") bKeys.ArrowUp = true;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") bKeys.ArrowDown = true;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") bKeys.ArrowLeft = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") bKeys.ArrowRight = true;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        dropBomberBomb();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (activeGame !== "bomber") return;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") bKeys.ArrowUp = false;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") bKeys.ArrowDown = false;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") bKeys.ArrowLeft = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") bKeys.ArrowRight = false;
    });
  }

  window.setBomberMove = function(dir, pressed) {
    if (dir === "up") bKeys.ArrowUp = pressed;
    if (dir === "down") bKeys.ArrowDown = pressed;
    if (dir === "left") bKeys.ArrowLeft = pressed;
    if (dir === "right") bKeys.ArrowRight = pressed;
  };

  window.dropBomberBomb = function() {
    if (!bPlayer.alive || bPlayer.won) return;
    const tileX = Math.round(bPlayer.px / B_TILE);
    const tileY = Math.round(bPlayer.py / B_TILE);

    // Limite de 1 bomba ativa por vez
    if (bBombs.length > 0) return;

    bBombs.push({
      x: tileX,
      y: tileY,
      timer: 110 // ~1.8 segundos
    });
    playRetroSound("flipper");
  };

  function updateBomberPhysics() {
    if (!bPlayer.alive || bPlayer.won) return;

    // Movimentação do jogador
    let nextX = bPlayer.px;
    let nextY = bPlayer.py;
    const spd = bPlayer.speed;

    if (bKeys.ArrowUp) nextY -= spd;
    if (bKeys.ArrowDown) nextY += spd;
    if (bKeys.ArrowLeft) nextX -= spd;
    if (bKeys.ArrowRight) nextX += spd;

    // Colisão simples por caixa delimitadora (bounding box com raio 10px)
    if (canMoveTo(nextX, bPlayer.py)) bPlayer.px = nextX;
    if (canMoveTo(bPlayer.px, nextY)) bPlayer.py = nextY;

    bPlayer.x = Math.round(bPlayer.px / B_TILE);
    bPlayer.y = Math.round(bPlayer.py / B_TILE);

    // Verifica se pegou o diploma
    if (bMap[bPlayer.y][bPlayer.x] === 4) {
      bPlayer.won = true;
      bScore += 5000;
      playRetroSound("win");
      updateBomberUI();
    }

    // Atualiza Bombas
    for (let i = bBombs.length - 1; i >= 0; i--) {
      const bomb = bBombs[i];
      bomb.timer--;
      if (bomb.timer <= 0) {
        explodeBomb(bomb.x, bomb.y);
        bBombs.splice(i, 1);
      }
    }

    // Atualiza Chamas
    for (let i = bFlames.length - 1; i >= 0; i--) {
      const f = bFlames[i];
      f.life--;

      // Dano no jogador
      const pDist = Math.hypot(bPlayer.px - f.x * B_TILE, bPlayer.py - f.y * B_TILE);
      if (pDist < 20) {
        bPlayer.alive = false;
        bGameOver = true;
        playRetroSound("drain");
      }

      // Dano nos inimigos
      bEnemies.forEach((en, idx) => {
        if (Math.hypot(en.px - f.x * B_TILE, en.py - f.y * B_TILE) < 22) {
          bEnemies.splice(idx, 1);
          bScore += 1000;
          updateBomberUI();
        }
      });

      if (f.life <= 0) bFlames.splice(i, 1);
    }

    // Atualiza Inimigos (IA básica que anda nos corredores)
    bEnemies.forEach(en => {
      en.timer++;
      const dirs = [
        { d: "up", dx: 0, dy: -1.5 },
        { d: "down", dx: 0, dy: 1.5 },
        { d: "left", dx: -1.5, dy: 0 },
        { d: "right", dx: 1.5, dy: 0 }
      ];

      let curDir = dirs.find(d => d.d === en.dir);
      if (!curDir || en.timer > 40 || !canMoveTo(en.px + curDir.dx, en.py + curDir.dy)) {
        en.timer = 0;
        const validDirs = dirs.filter(d => canMoveTo(en.px + d.dx * 8, en.py + d.dy * 8));
        if (validDirs.length > 0) {
          en.dir = validDirs[Math.floor(Math.random() * validDirs.length)].d;
        }
      }

      curDir = dirs.find(d => d.d === en.dir);
      if (curDir && canMoveTo(en.px + curDir.dx, en.py + curDir.dy)) {
        en.px += curDir.dx;
        en.py += curDir.dy;
      }

      // Colisão inimigo com player
      if (Math.hypot(bPlayer.px - en.px, bPlayer.py - en.py) < 18) {
        bPlayer.alive = false;
        bGameOver = true;
        playRetroSound("drain");
      }
    });
  }

  function canMoveTo(px, py) {
    const pad = 6;
    const corners = [
      { x: px - pad, y: py - pad },
      { x: px + pad, y: py - pad },
      { x: px - pad, y: py + pad },
      { x: px + pad, y: py + pad }
    ];

    for (let pt of corners) {
      const tx = Math.floor((pt.x + B_TILE / 2) / B_TILE);
      const ty = Math.floor((pt.y + B_TILE / 2) / B_TILE);
      if (tx < 0 || tx >= B_GRID || ty < 0 || ty >= B_GRID) return false;
      const tile = bMap[ty][tx];
      if (tile === 1 || tile === 2 || tile === 3) return false; // Bloqueado
    }
    return true;
  }

  function explodeBomb(bx, by) {
    playRetroSound("bomb");
    const radius = 2;
    bFlames.push({ x: bx, y: by, life: 25 });

    const directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 }
    ];

    directions.forEach(dir => {
      for (let r = 1; r <= radius; r++) {
        const nx = bx + dir.dx * r;
        const ny = by + dir.dy * r;

        if (nx < 0 || nx >= B_GRID || ny < 0 || ny >= B_GRID) break;
        const tile = bMap[ny][nx];

        if (tile === 1) break; // Parede indestrutível bloqueia fogo
        bFlames.push({ x: nx, y: ny, life: 25 });

        if (tile === 2) {
          bMap[ny][nx] = 0; // Destrói bloco
          bScore += 100;
          updateBomberUI();
          break; // Fogo cessa neste bloco
        } else if (tile === 3) {
          bMap[ny][nx] = 4; // Revela o Diploma!
          bScore += 500;
          updateBomberUI();
          break;
        }
      }
    });
  }

  function drawBomber() {
    if (!bCtx) return;
    bCtx.clearRect(0, 0, B_GRID * B_TILE, B_GRID * B_TILE);

    // Fundo do labirinto
    bCtx.fillStyle = "#090d16";
    bCtx.fillRect(0, 0, B_GRID * B_TILE, B_GRID * B_TILE);

    // Desenha grid
    for (let r = 0; r < B_GRID; r++) {
      for (let c = 0; c < B_GRID; c++) {
        const tile = bMap[r][c];
        const x = c * B_TILE;
        const y = r * B_TILE;

        if (tile === 1) {
          // Parede de Aço
          bCtx.fillStyle = "#334155";
          bCtx.fillRect(x + 1, y + 1, B_TILE - 2, B_TILE - 2);
          bCtx.strokeStyle = "#64748b";
          bCtx.strokeRect(x + 2, y + 2, B_TILE - 4, B_TILE - 4);
        } else if (tile === 2 || tile === 3) {
          // Bloco Destrutível (Bloco de Código)
          bCtx.fillStyle = "#1e293b";
          bCtx.fillRect(x + 1, y + 1, B_TILE - 2, B_TILE - 2);
          bCtx.strokeStyle = "#06b6d4";
          bCtx.lineWidth = 1;
          bCtx.strokeRect(x + 2, y + 2, B_TILE - 4, B_TILE - 4);

          bCtx.fillStyle = "#06b6d4";
          bCtx.font = "bold 9px monospace";
          bCtx.textAlign = "center";
          bCtx.textBaseline = "middle";
          bCtx.fillText("{}", x + B_TILE / 2, y + B_TILE / 2);
        } else if (tile === 4) {
          // Diploma Revelado!
          bCtx.fillStyle = "rgba(245, 158, 11, 0.25)";
          bCtx.fillRect(x + 2, y + 2, B_TILE - 4, B_TILE - 4);
          bCtx.font = "16px sans-serif";
          bCtx.textAlign = "center";
          bCtx.textBaseline = "middle";
          bCtx.fillText("📜", x + B_TILE / 2, y + B_TILE / 2);
        }
      }
    }

    // Bombas
    bBombs.forEach(bomb => {
      const x = bomb.x * B_TILE + B_TILE / 2;
      const y = bomb.y * B_TILE + B_TILE / 2;
      const pulse = Math.sin(bomb.timer * 0.2) * 2;

      bCtx.fillStyle = "#f43f5e";
      bCtx.beginPath();
      bCtx.arc(x, y, 10 + pulse, 0, Math.PI * 2);
      bCtx.fill();

      // Pavio
      bCtx.strokeStyle = "#fbbf24";
      bCtx.lineWidth = 2;
      bCtx.beginPath();
      bCtx.moveTo(x, y - 10);
      bCtx.lineTo(x + 4, y - 14);
      bCtx.stroke();
    });

    // Chamas
    bFlames.forEach(f => {
      const x = f.x * B_TILE;
      const y = f.y * B_TILE;
      bCtx.fillStyle = f.life > 10 ? "#f59e0b" : "#ef4444";
      bCtx.fillRect(x + 2, y + 2, B_TILE - 4, B_TILE - 4);
    });

    // Inimigos (Bugs 404)
    bEnemies.forEach(en => {
      const x = en.px + B_TILE / 2;
      const y = en.py + B_TILE / 2;
      bCtx.font = "16px sans-serif";
      bCtx.textAlign = "center";
      bCtx.textBaseline = "middle";
      bCtx.fillText("👾", x, y);
    });

    // Jogador (Formando com Capelo 🎓)
    if (bPlayer.alive) {
      const x = bPlayer.px + B_TILE / 2;
      const y = bPlayer.py + B_TILE / 2;
      bCtx.font = "18px sans-serif";
      bCtx.textAlign = "center";
      bCtx.textBaseline = "middle";
      bCtx.fillText("🎓", x, y);
    }

    // Tela de Fim de Jogo ou Vitória
    if (bGameOver || bPlayer.won) {
      bCtx.fillStyle = "rgba(0, 0, 0, 0.85)";
      bCtx.fillRect(0, 0, B_GRID * B_TILE, B_GRID * B_TILE);

      bCtx.textAlign = "center";
      if (bPlayer.won) {
        bCtx.fillStyle = "#10b981";
        bCtx.font = "bold 20px 'JetBrains Mono', monospace";
        bCtx.fillText("PARABÉNS, FORMANDO!", (B_GRID * B_TILE) / 2, 140);
        bCtx.font = "13px 'Inter', sans-serif";
        bCtx.fillStyle = "#ffffff";
        bCtx.fillText("Você resgatou o Diploma ADS 2026!", (B_GRID * B_TILE) / 2, 175);
      } else {
        bCtx.fillStyle = "#f43f5e";
        bCtx.font = "bold 22px 'JetBrains Mono', monospace";
        bCtx.fillText("VOCÊ FOI DEPURADO!", (B_GRID * B_TILE) / 2, 140);
        bCtx.font = "13px 'Inter', sans-serif";
        bCtx.fillStyle = "#ffffff";
        bCtx.fillText("O bug pegou o seu código...", (B_GRID * B_TILE) / 2, 175);
      }

      bCtx.fillStyle = "#06b6d4";
      bCtx.font = "bold 12px 'Inter', sans-serif";
      bCtx.fillText("Toque no botão 'Novo Jogo' para reiniciar", (B_GRID * B_TILE) / 2, 230);
    }
  }

  function updateBomberUI() {
    const scoreEl = document.getElementById("bomber-score-val");
    if (scoreEl) scoreEl.textContent = bScore.toString().padStart(5, "0");
  }

  function bomberLoop() {
    updateBomberPhysics();
    drawBomber();
    if (activeGame === "bomber") {
      bomberAnim = requestAnimationFrame(bomberLoop);
    }
  }

  window.restartBomber = function() {
    resetBomberGame();
  };

})();
