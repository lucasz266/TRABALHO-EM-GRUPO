/* ============================
   TIMER (15 minutos, reinicia)
   ============================ */
function iniciarTimer() {
  let tempo = 15 * 60;
  const display = document.getElementById("countdown");
  setInterval(() => {
    const m = String(Math.floor(tempo / 60)).padStart(2, "0");
    const s = String(tempo % 60).padStart(2, "0");
    if (display) display.textContent = `${m}:${s}`;
    tempo--;
    if (tempo < 0) tempo = 15 * 60;
  }, 1000);
}
iniciarTimer();

/* ============================
   ESTOQUE ANIMADO + ÚLTIMAS 7
   ============================ */
let estoque = 100;
const inner = document.getElementById("estoque-compact") || document.getElementById("estoque");
const unidadesElem = document.getElementById("unidades-compact") || document.getElementById("unidades");

function reduzirEstoque() {
  // diminuições aleatórias mas não abaixo de 7 (efeito últimas unidades)
  const perda = Math.floor(Math.random() * 6) + 2;
  estoque = Math.max(7, estoque - perda);
  if (inner) inner.style.width = `${estoque}%`;
  if (unidadesElem) unidadesElem.textContent = Math.max(1, Math.ceil(estoque / 14));
  // repete com intervalo variável
  setTimeout(reduzirEstoque, Math.random() * 7000 + 3500);
}
reduzirEstoque();

/* ============================
   POPUP DE COMPRA RECENTE
   ============================ */
const nomesPopup = ["Joana de SP","Carlos do RJ","Ana de MG","Pedro da BA","Fernanda do PR","Luiz de SC"];
function mostrarPopup(){
  const popup = document.getElementById("popup-compra");
  const span = document.getElementById("popup-texto");
  if(!popup || !span) return;
  span.textContent = `${nomesPopup[Math.floor(Math.random()*nomesPopup.length)]} comprou agora!`;
  popup.style.display = "block";
  setTimeout(()=> popup.style.display = "none", 4500);
  setTimeout(mostrarPopup, Math.random() * 25000 + 20000);
}
setTimeout(mostrarPopup, 7000);

/* ============================
   DEPOIMENTOS AUTOMÁTICOS
   ============================ */
const depoimentos = [
  "“Produto excelente! A qualidade é surreal.” – Ana M.",
  "“Muito mais sustentável do que eu esperava.” – Lucas R.",
  "“A promoção vale MUITO a pena!” – Mariana F.",
  "“Mudou minha rotina!” – Paulo C.",
  "“Melhor compra do ano.” – Júlia S."
];
let idx = 0;
function trocarDepoimento(){ 
  const p = document.getElementById("depoimento");
  if(p) p.textContent = depoimentos[idx];
  idx = (idx + 1) % depoimentos.length;
}
setInterval(trocarDepoimento, 4000);
trocarDepoimento();

/* ============================
   VIDEO OVERLAY: autoplay muted, play/pause toggle
   ============================ */
const promoVideo = document.getElementById("promoVideo");
const overlay = document.getElementById("videoOverlay");
const playBtn = document.getElementById("playPause");
if (promoVideo) {
  // try autoplay muted
  promoVideo.muted = true;
  promoVideo.loop = true;
  promoVideo.playsInline = true;
  promoVideo.preload = "auto";
  // if autoplay allowed, play; otherwise overlay visible waiting user
  promoVideo.play().then(()=> {
    if(overlay) overlay.style.opacity = "0"; // hide overlay if autoplay works
  }).catch(()=> {
    if(overlay) overlay.style.opacity = "1";
  });

  if(playBtn) {
    playBtn.addEventListener("click", () => {
      if(promoVideo.paused) {
        promoVideo.play();
        playBtn.textContent = "❚❚";
        overlay.style.opacity = "0";
      } else {
        promoVideo.pause();
        playBtn.textContent = "▶";
        overlay.style.opacity = "1";
      }
    });
  }

  // click on whole card toggles play/pause (mobile friendly)
  const videoCard = document.getElementById("videoCard");
  if (videoCard) {
    videoCard.addEventListener("click", (e) => {
      // don't trigger when clicking control elements
      if(e.target === playBtn) return;
      if(promoVideo.paused) { promoVideo.play(); if(overlay) overlay.style.opacity = "0"; if(playBtn) playBtn.textContent = "❚❚"; }
      else { promoVideo.pause(); if(overlay) overlay.style.opacity = "1"; if(playBtn) playBtn.textContent = "▶"; }
    });
  }
}

/* ============================
   NAV MOBILE TOGGLE
   ============================ */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
hamburger && hamburger.addEventListener("click", () => {
  if(mobileNav) mobileNav.style.display = mobileNav.style.display === "block" ? "none" : "block";
});

/* ============================
   DARK MODE TOGGLE (persist via localStorage)
   ============================ */
const toggleBtn = document.getElementById("toggleMode");
const currentMode = localStorage.getItem("site-mode");
if (currentMode) document.body.className = currentMode;
toggleBtn && toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  localStorage.setItem("site-mode", document.body.className);
});

/* ============================
   ACCESSIBILITY: ESC closes mobile nav
   ============================ */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if(mobileNav) mobileNav.style.display = "none";
  }
});
