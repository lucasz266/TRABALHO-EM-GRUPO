document.addEventListener("DOMContentLoaded", function () {

  /* ============================
     TIMER
  ============================ */
  function iniciarTimer() {
    let tempo = 15 * 60;
    const display = document.getElementById("countdown");
    if (!display) return;

    setInterval(() => {
      const m = String(Math.floor(tempo / 60)).padStart(2, "0");
      const s = String(tempo % 60).padStart(2, "0");
      display.textContent = m + ":" + s;
      tempo--;
      if (tempo < 0) tempo = 15 * 60;
    }, 1000);
  }
  iniciarTimer();


  /* ============================
     ESTOQUE FAKE
  ============================ */
  let estoque = 100;
  const inner = document.getElementById("estoque-compact");
  const unidades = document.getElementById("unidades-compact");

  function reduzirEstoque() {
    const perda = Math.floor(Math.random() * 6) + 2;
    estoque = Math.max(7, estoque - perda);

    if (inner) inner.style.width = estoque + "%";
    if (unidades) unidades.textContent = Math.max(1, Math.ceil(estoque / 14));

    setTimeout(reduzirEstoque, Math.random() * 7000 + 3500);
  }
  reduzirEstoque();


  /* ============================
     POPUP DE COMPRA
  ============================ */
  const popup = document.getElementById("popup-compra");
  const span = document.getElementById("popup-texto");
  const nomes = ["Joana SP", "Carlos RJ", "Ana MG", "Pedro BA", "Fernanda PR", "Luiz SC"];

  function mostrarPopup() {
    if (!popup || !span) return;

    span.textContent = nomes[Math.floor(Math.random() * nomes.length)] + " comprou agora!";
    popup.style.display = "block";

    setTimeout(() => popup.style.display = "none", 4500);
    setTimeout(mostrarPopup, Math.random() * 25000 + 20000);
  }

  setTimeout(mostrarPopup, 7000);


  /* ============================
     DEPOIMENTOS
  ============================ */
  const depoimentos = [
    "“Produto excelente! A qualidade é surreal.” – Ana M.",
    "“Muito mais sustentável do que eu esperava.” – Lucas R.",
    "“A promoção vale MUITO a pena!” – Mariana F.",
    "“Mudou minha rotina!” – Paulo C.",
    "“Melhor compra do ano.” – Júlia S."
  ];

  let idx = 0;
  const depo = document.getElementById("depoimento");

  if (depo) depo.textContent = depoimentos[0];

  setInterval(() => {
    depo.textContent = depoimentos[idx];
    idx = (idx + 1) % depoimentos.length;
  }, 4000);


  /* ============================
     ✅ VÍDEOS 100% COMPLETOS
  ============================ */
  const videos = document.querySelectorAll(".video-vitrine");

  videos.forEach(video => {
    const card = video.closest(".video-card");
    const overlay = card.querySelector(".video-overlay");
    const botao = card.querySelector(".play-btn");

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    // Clique no botão
    botao.addEventListener("click", () => {
      if (video.paused) {
        video.muted = false;      // ATIVA O SOM
        video.play();
        overlay.classList.add("hidden");
      } else {
        video.pause();
        overlay.classList.remove("hidden");
      }
    });

    // Clique no próprio vídeo pausa
    video.addEventListener("click", () => {
      video.pause();
      overlay.classList.remove("hidden");
    });

    // Hover no desktop
    video.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) video.play();
    });

    video.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) video.pause();
    });

    // Autoplay por visibilidade
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
          overlay.classList.remove("hidden");
        }
      });
    }, { threshold: 0.6 });

    observer.observe(video);
  });


  /* ============================
     MENU MOBILE
  ============================ */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      mobileNav.style.display = mobileNav.style.display === "block" ? "none" : "block";
    });
  }


  /* ============================
     DARK MODE
  ============================ */
  const toggleBtn = document.getElementById("toggleMode");
  const mode = localStorage.getItem("site-mode");

  if (mode) document.body.className = mode;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");
      localStorage.setItem("site-mode", document.body.className);
    });
}

});


