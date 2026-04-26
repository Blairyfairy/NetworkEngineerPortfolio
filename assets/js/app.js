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
