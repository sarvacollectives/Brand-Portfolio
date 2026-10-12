const canvas = document.querySelector("#motion-field");
const ctx = canvas.getContext("2d");
const root = document.documentElement;
const cursor = document.querySelector(".cursor-dot");
const pointer = { x: 0, y: 0, active: false };
let particles = [];
let width = 0;
let height = 0;
let tick = 0;

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(95, Math.max(42, Math.floor((width * height) / 17000)));
  particles = Array.from({ length: count }, (_, index) => ({
    x: (index * 97) % width,
    y: (index * 151) % height,
    seed: index * 0.37,
    radius: 1 + ((index * 13) % 28) / 20,
  }));
}

function drawField() {
  tick += 0.006;
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = "source-over";

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(216, 165, 54, 0.1)");
  gradient.addColorStop(0.48, "rgba(73, 107, 77, 0.06)");
  gradient.addColorStop(1, "rgba(93, 19, 108, 0.1)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = "multiply";
  particles.forEach((particle, index) => {
    const waveX = Math.sin(tick * 2 + particle.seed) * 42;
    const waveY = Math.cos(tick * 1.65 + particle.seed * 1.4) * 36;
    const pullX = pointer.active ? (pointer.x - width / 2) * 0.018 : 0;
    const pullY = pointer.active ? (pointer.y - height / 2) * 0.018 : 0;
    const x = (particle.x + waveX + pullX + width) % width;
    const y = (particle.y + waveY + pullY + height) % height;

    ctx.beginPath();
    ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle =
      index % 5 === 0
        ? "rgba(216, 165, 54, 0.34)"
        : index % 3 === 0
          ? "rgba(93, 19, 108, 0.22)"
          : "rgba(23, 16, 22, 0.16)";
    ctx.fill();

    if (index % 2 === 0) {
      const next = particles[(index + 7) % particles.length];
      const nextX = (next.x + Math.sin(tick * 2 + next.seed) * 42 + pullX + width) % width;
      const nextY = (next.y + Math.cos(tick * 1.65 + next.seed * 1.4) * 36 + pullY + height) % height;
      const distance = Math.hypot(nextX - x, nextY - y);

      if (distance < 190) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
        ctx.strokeStyle = `rgba(93, 19, 108, ${0.08 - distance / 3200})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawField);
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
}

function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? window.scrollY / max : 0;
  root.style.setProperty("--scroll-progress", progress.toFixed(4));
}

function projectMotion() {
  const panels = [...document.querySelectorAll(".project-panel")];

  function update() {
    const center = window.innerHeight / 2;
    panels.forEach((panel) => {
      const box = panel.getBoundingClientRect();
      const panelCenter = box.top + box.height / 2;
      const distance = Math.max(-1, Math.min(1, (panelCenter - center) / center));
      const lift = Math.round(distance * 28);
      const scale = 1 + (1 - Math.abs(distance)) * 0.08;
      panel.style.setProperty("--scroll-lift", lift);
      panel.style.setProperty("--project-scale", scale.toFixed(3));
      panel.style.setProperty("--turn", `${tick * 90}deg`);
    });

    requestAnimationFrame(update);
  }

  update();
}

function initTiltCards() {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function initMagneticLinks() {
  document.querySelectorAll("[data-magnetic]").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}

function initFounderCinema() {
  const cinema = document.querySelector(".founder-cinema");
  if (!cinema) return;

  cinema.addEventListener("pointermove", (event) => {
    const rect = cinema.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    cinema.style.setProperty("--founder-x", `${x.toFixed(2)}%`);
    cinema.style.setProperty("--founder-y", `${y.toFixed(2)}%`);
    cinema.style.setProperty("--founder-spin", `${(x * 3.6).toFixed(2)}deg`);
  });

  cinema.addEventListener("pointerleave", () => {
    cinema.style.setProperty("--founder-x", "50%");
    cinema.style.setProperty("--founder-y", "45%");
    cinema.style.setProperty("--founder-spin", "0deg");
  });
}

function updateCursor(event) {
  if (!cursor) return;
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
}

window.addEventListener("resize", resize);
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.active = true;
  updateCursor(event);
});
window.addEventListener("pointerleave", () => {
  pointer.active = false;
});

document.querySelectorAll("a, button, [data-tilt]").forEach((element) => {
  element.addEventListener("pointerenter", () => cursor?.classList.add("is-active"));
  element.addEventListener("pointerleave", () => cursor?.classList.remove("is-active"));
});

resize();
drawField();
revealOnScroll();
projectMotion();
initTiltCards();
initMagneticLinks();
initFounderCinema();
updateScrollProgress();
