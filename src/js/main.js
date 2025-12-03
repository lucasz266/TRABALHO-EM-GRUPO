document.addEventListener("DOMContentLoaded", function () {

  /* ============================
     TIMER (15 minutos, reinicia)
     ============================ */
  function iniciarTimer() {
    var tempo = 15 * 60;
    var display = document.getElementById("countdown");
    if (!display) return;

    setInterval(function () {
      var m = String(Math.floor(tempo / 60)).padStart(2, "0");
      var s = String(tempo % 60).padStart(2, "0");
      display.textContent = m + ":" + s;
      tempo--;
      if (tempo < 0) tempo = 15 * 60;
    }, 1000);
  }
  iniciarTimer();


  /* ============================
     ESTOQUE ANIMADO
     ============================ */
  var estoque = 100;
  var inner = document.getElementById("estoque-compact") || document.getElementById("estoque");
  var unidadesElem = document.getElementById("unidades-compact") || document.getElementById("unidades");

  function reduzirEstoque() {
    var perda = Math.floor(Math.random() * 6) + 2;
    estoque = Math.max(7, estoque - perda);

    if (inner) inner.style.width = estoque + "%";
    if (unidadesElem) unidadesElem.textContent = Math.max(1, Math.ceil(estoque / 14));

    setTimeout(reduzirEstoque, Math.random() * 7000 + 3500);
  }
  reduzirEstoque();


  /* ============================
     POPUP DE COMPRA
     ============================ */
  var popup = document.getElementById("popup-compra");
  var span = document.getElementById("popup-texto");
  var nomesPopup = ["Joana de SP", "Carlos do RJ", "Ana de MG", "Pedro da BA", "Fernanda do PR", "Luiz de SC"];

  function mostrarPopup() {
    if (!popup || !span) return;

    span.textContent = nomesPopup[Math.floor(Math.random() * nomesPopup.length)] + " comprou agora!";
    popup.style.display = "block";

    setTimeout(function () {
      popup.style.display = "none";
    }, 4500);

    setTimeout(mostrarPopup, Math.random() * 25000 + 20000);
  }

  setTimeout(mostrarPopup, 7000);


  /* ============================
     DEPOIMENTOS
     ============================ */
  var depoimentos = [
    "“Produto excelente! A qualidade é surreal.” – Ana M.",
    "“Muito mais sustentável do que eu esperava.” – Lucas R.",
    "“A promoção vale MUITO a pena!” – Mariana F.",
    "“Mudou minha rotina!” – Paulo C.",
    "“Melhor compra do ano.” – Júlia S."
  ];

  var idx = 0;
  var depo = document.getElementById("depoimento");

  if (depo) depo.textContent = depoimentos[0];

  setInterval(function () {
    if (!depo) return;
    depo.textContent = depoimentos[idx];
    idx = (idx + 1) % depoimentos.length;
  }, 4000);


  /* ============================
     VÍDEO VITRINE (AUTOPLAY SMART)
     ============================ */
  var videos = document.querySelectorAll(".img-produto");

  videos.forEach(function (video) {
    var card = video.closest(".video-card");
    var overlay = null;
    var botao = null;

    if (card) {
      overlay = card.querySelector(".video-overlay");
      botao = card.querySelector(".play-btn");
    }

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    if (botao) {
      botao.addEventListener("click", function () {
        video.play();
        if (overlay) overlay.classList.add("hidden");
      });
    }

    video.addEventListener("mouseenter", function () {
      if (window.innerWidth > 768) video.play();
    });

    video.addEventListener("mouseleave", function () {
      if (window.innerWidth > 768) video.pause();
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.6 });

    observer.observe(video);
  });


  /* ============================
     MENU MOBILE
     ============================ */
  var hamburger = document.getElementById("hamburger");
  var mobileNav = document.getElementById("mobileNav");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      mobileNav.style.display = mobileNav.style.display === "block" ? "none" : "block";
    });
  }


  /* ============================
     DARK MODE (SEM DUPLICAÇÃO)
     ============================ */
  var toggleBtn = document.getElementById("toggleMode");
  var mode = localStorage.getItem("site-mode");

  if (mode) document.body.className = mode;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");
      localStorage.setItem("site-mode", document.body.className);
    });
  }

});
