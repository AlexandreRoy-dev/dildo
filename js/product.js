import { getProduct, relatedProducts, money } from "./catalog.js";
import { renderCartUi, initNav, addToCart } from "./cart.js";
import { initAgeGate } from "./age.js";

const productId = document.body.dataset.productId || "curve";
const product = getProduct(productId);

document.title = `${product.name} · erosia`;

const crumbCurrent = document.querySelector("[data-crumb-current]");
const title = document.querySelector("[data-pdp-title]");
const price = document.querySelector("[data-pdp-price]");
const blurb = document.querySelector("[data-pdp-blurb]");
const desc = document.querySelector("[data-pdp-desc]");
const tag = document.querySelector("[data-pdp-tag]");
const mainImg = document.querySelector("[data-pdp-main]");
const thumbs = document.querySelector("[data-pdp-thumbs]");
const modes = document.querySelector("[data-pdp-modes]");
const specs = document.querySelector("[data-pdp-specs]");
const related = document.querySelector("[data-pdp-related]");
const addBtn = document.querySelector("[data-pdp-add]");
const buyBtn = document.querySelector("[data-pdp-buy]");
const qtyInput = document.querySelector("[data-pdp-qty]");

if (crumbCurrent) crumbCurrent.textContent = product.name;
if (title) title.textContent = product.name;
if (price) price.textContent = money(product.price);
if (blurb) blurb.textContent = product.blurb;
if (desc) desc.textContent = product.description;
if (mainImg) {
  mainImg.src = product.image;
  mainImg.alt = product.name;
}

if (tag) {
  if (product.tag) {
    tag.hidden = false;
    tag.textContent = product.tag;
  } else {
    tag.hidden = true;
  }
}

if (thumbs) {
  thumbs.innerHTML = product.gallery
    .map(
      (src, i) => `
      <button type="button" class="pdp__thumb${i === 0 ? " is-active" : ""}" data-src="${src}" aria-label="Vue ${i + 1}">
        <img src="${src}" alt="" />
      </button>
    `
    )
    .join("");

  thumbs.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-src]");
    if (!btn || !mainImg) return;
    mainImg.src = btn.dataset.src;
    thumbs.querySelectorAll(".pdp__thumb").forEach((el) => el.classList.remove("is-active"));
    btn.classList.add("is-active");
  });
}

if (modes) {
  modes.innerHTML = product.modes
    .map(
      (mode, i) => `
      <button type="button" class="pdp__chip${i === 0 ? " is-active" : ""}" data-mode="${mode}">
        ${mode}
      </button>
    `
    )
    .join("");

  modes.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-mode]");
    if (!chip) return;
    modes.querySelectorAll(".pdp__chip").forEach((el) => el.classList.remove("is-active"));
    chip.classList.add("is-active");
  });
}

if (specs) {
  specs.innerHTML = product.specs
    .map(
      ([label, value]) => `
      <div class="pdp__spec">
        <dt>${label}</dt>
        <dd>${value}</dd>
      </div>
    `
    )
    .join("");
}

if (related) {
  related.innerHTML = relatedProducts(product.id)
    .map(
      (p) => `
      <a class="product product--link" href="${p.page}">
        <div class="product__media">
          <img src="${p.image}" alt="${p.name}" />
          ${p.tag ? `<span class="product__tag">${p.tag}</span>` : ""}
        </div>
        <div class="product__meta">
          <div>
            <h3>${p.name}</h3>
            <p>${p.blurb}</p>
          </div>
          <p class="price">${money(p.price)}</p>
        </div>
      </a>
    `
    )
    .join("");
}

const cartUi = renderCartUi({
  cartRoot: document.querySelector("[data-cart]"),
  cartList: document.querySelector("[data-cart-list]"),
  cartCount: document.querySelector("[data-cart-count]"),
  cartTotal: document.querySelector("[data-cart-total]"),
  toast: document.querySelector("[data-toast]"),
});

function currentQty() {
  const n = Number(qtyInput?.value || 1);
  return Number.isFinite(n) && n > 0 ? Math.min(10, Math.floor(n)) : 1;
}

addBtn?.addEventListener("click", () => {
  addToCart(product.id, currentQty());
  cartUi.render();
  cartUi.showToast(`${product.name} ajouté au panier`);
});

buyBtn?.addEventListener("click", () => {
  addToCart(product.id, currentQty());
  cartUi.render();
  window.location.href = "commande.html";
});

document.querySelectorAll("[data-qty-step]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!qtyInput) return;
    const step = Number(btn.dataset.qtyStep);
    const next = Math.min(10, Math.max(1, currentQty() + step));
    qtyInput.value = String(next);
  });
});

initAgeGate();
initNav();
