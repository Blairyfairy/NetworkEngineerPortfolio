const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll(".job-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".job-card");
    const isOpen = card.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    const plus = card.querySelector(".job-plus");
    if (plus) plus.textContent = isOpen ? "−" : "+";
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const scrollTopButton = document.querySelector(".scroll-top-btn");
if (scrollTopButton) {
  const updateScrollButton = () => {
    scrollTopButton.classList.toggle("is-visible", window.scrollY > 260);
  };
  updateScrollButton();
  window.addEventListener("scroll", updateScrollButton, { passive: true });
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const currentPage = (window.location.pathname.split("/").pop() || "index.html");
document.querySelectorAll(".nav-links a[href]").forEach((link) => {
  const linkPage = link.getAttribute("href").split("#")[0];
  if (linkPage === currentPage) link.classList.add("is-active");
});


// Daniel Sean deep gallery: JSON-driven, JPG-first with extension fallback, lazy visible groups only.
(() => {
  const active = document.getElementById("galleryActiveImage");
  const title = document.getElementById("galleryActiveTitle");
  const caption = document.getElementById("galleryActiveCaption");
  const counter = document.getElementById("galleryCounter");
  const rail = document.getElementById("galleryThumbRail");
  const prev = document.querySelector(".gallery-prev");
  const next = document.querySelector(".gallery-next");
  if (!active || !rail) return;
  let images = []; let index = 0;
  const fallback = ["assets/img/gallery-core.svg", "assets/img/gallery-cloud.svg", "assets/img/gallery-observe.svg", "assets/img/gallery-secure.svg"];
  const trySources = (img, sources, fallbackSrc) => { const list = Array.isArray(sources) && sources.length ? sources.slice() : [fallbackSrc]; let attempt = 0; img.onerror = () => { attempt += 1; img.src = list[attempt] || fallbackSrc || "assets/img/gallery-core.svg"; }; img.src = list[0]; };
  const renderActive = () => { const item = images[index]; if (!item) return; title.textContent = item.title || `Daniel Sean Gallery Placeholder ${index + 1}`; caption.textContent = item.caption || "Clearly nonsense placeholder until real gallery content is provided."; active.alt = item.title || `Gallery image ${index + 1}`; trySources(active, item.sources, fallback[index % fallback.length]); counter.textContent = `Image ${index + 1} of ${images.length}`; rail.querySelectorAll("button").forEach((btn, i) => btn.classList.toggle("is-active", i === index)); const current = rail.querySelector(`button[data-index="${index}"]`); if (current) current.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); };
  const renderThumbs = () => { rail.innerHTML = ""; images.forEach((item, i) => { const btn = document.createElement("button"); btn.type = "button"; btn.className = "gallery-thumb"; btn.dataset.index = String(i); btn.setAttribute("aria-label", `Open gallery image ${i + 1}`); const img = document.createElement("img"); img.alt = ""; img.loading = "lazy"; img.decoding = "async"; img.dataset.sources = JSON.stringify(item.sources || []); img.dataset.fallback = fallback[i % fallback.length]; btn.appendChild(img); btn.addEventListener("click", () => { index = i; renderActive(); }); rail.appendChild(btn); }); const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { const img = entry.target; if (entry.isIntersecting) { trySources(img, JSON.parse(img.dataset.sources || "[]"), img.dataset.fallback); } else if (!img.closest(".is-active")) { img.removeAttribute("src"); } }); }, { root: rail, rootMargin: "160px", threshold: 0.01 }); rail.querySelectorAll(".gallery-thumb img").forEach((img) => observer.observe(img)); };
  const move = (step) => { index = (index + step + images.length) % images.length; renderActive(); };
  if (prev) prev.addEventListener("click", () => move(-1)); if (next) next.addEventListener("click", () => move(1));
  fetch("assets/img/gallery-images.json").then((response) => response.ok ? response.json() : Promise.reject(response)).then((data) => { images = Array.isArray(data) ? data : []; renderThumbs(); renderActive(); }).catch(() => { images = Array.from({ length: 100 }, (_, i) => ({ title: `Daniel Sean Gallery Placeholder ${String(i + 1).padStart(3, "0")}`, caption: `Clearly nonsense placeholder until input is given for image ${i + 1}.`, sources: [`assets/img/img${i + 1}.jpg`, `assets/img/img${i + 1}.png`, `assets/img/img${i + 1}.webp`] })); renderThumbs(); renderActive(); });
})();
