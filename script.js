// =========================
// Footer year
// =========================
document.getElementById("year").textContent = new Date().getFullYear();

// =========================
// Starfield background
// =========================
(() => {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  // Respect users who prefer reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext("2d", { alpha: false });

  let w = 0, h = 0, dpr = 1;
  let stars = [];

  const layers = [
    { count: 120, speed: 0.10, size: [0.6, 1.4], alpha: [0.25, 0.7] }, // far
    { count: 90,  speed: 0.22, size: [0.8, 2.0], alpha: [0.35, 0.85] }, // mid
    { count: 50,  speed: 0.40, size: [1.2, 2.6], alpha: [0.45, 1.0] }, // near
  ];

  const rand = (a, b) => a + Math.random() * (b - a);

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars = [];
    layers.forEach((L, layerIndex) => {
      for (let i = 0; i < L.count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: rand(L.size[0], L.size[1]),
          a: rand(L.alpha[0], L.alpha[1]),
          s: L.speed,
          t: Math.random() * Math.PI * 2,
          layer: layerIndex,
        });
      }
    });
  }

  function drawBackground() {
    const g = ctx.createRadialGradient(w * 0.2, h * 0.3, 0, w * 0.2, h * 0.3, Math.max(w, h) * 0.8);
    g.addColorStop(0, "#0a1020");
    g.addColorStop(0.35, "#070a12");
    g.addColorStop(1, "#05070d");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    const g2 = ctx.createRadialGradient(w * 0.8, h * 0.2, 0, w * 0.8, h * 0.2, Math.max(w, h) * 0.7);
    g2.addColorStop(0, "rgba(124,156,255,0.10)");
    g2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);
  }

  let last = performance.now();
  function tick(now) {
    const dt = Math.min(40, now - last) / 16.67;
    last = now;

    drawBackground();

    for (const star of stars) {
      star.y -= star.s * dt;
      if (star.y < -10) {
        star.y = h + 10;
        star.x = Math.random() * w;
      }

      star.t += 0.02 * (star.layer + 1) * dt;
      const tw = 0.15 * Math.sin(star.t);

      ctx.globalAlpha = Math.max(0, Math.min(1, star.a + tw));
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  requestAnimationFrame(tick);
})();

// =========================
// Contact form (EmailJS) - safe
// =========================
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  if (!window.emailjs) {
    console.warn("EmailJS not loaded yet.");
    return;
  }

  emailjs.init("0IFYPHW7oCC0LT8HA");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm("service_htv7tuo", "template_vcjq7vs", this)
      .then(() => {
        alert("Message sent successfully!");
        form.reset();
      })
      .catch(() => {
        alert("Failed to send message. Try again later.");
      });
  });
})();

// =========================
// Lucide icons - safe
// =========================
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();
});
