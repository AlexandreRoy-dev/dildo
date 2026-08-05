import { renderCartUi, initNav } from "./cart.js";
import { initAgeGate } from "./age.js";

function initReveal() {
  const nodes = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((n) => n.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2 }
  );

  nodes.forEach((n) => io.observe(n));

  window.requestAnimationFrame(() => {
    document.querySelectorAll(".hero [data-reveal]").forEach((n, i) => {
      n.style.transitionDelay = `${i * 0.1}s`;
      n.classList.add("is-in");
    });
  });
}

initAgeGate();
initNav();
initReveal();
renderCartUi({
  cartRoot: document.querySelector("[data-cart]"),
  cartList: document.querySelector("[data-cart-list]"),
  cartCount: document.querySelector("[data-cart-count]"),
  cartTotal: document.querySelector("[data-cart-total]"),
  toast: document.querySelector("[data-toast]"),
});
