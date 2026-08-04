import { CATALOG, money } from "./catalog.js";

const STORAGE_KEY = "erosia-cart";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Map();
    const entries = Object.entries(JSON.parse(raw)).map(([id, qty]) => [id, Number(qty)]);
    return new Map(entries);
  } catch {
    return new Map();
  }
}

function save(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(cart)));
}

const cart = load();

export function getCart() {
  return cart;
}

export function getCartLines() {
  const lines = [];
  for (const [id, qty] of cart) {
    const item = CATALOG[id];
    if (!item || !qty) continue;
    lines.push({ ...item, qty, lineTotal: item.price * qty });
  }
  return lines;
}

export function getCartTotal() {
  return getCartLines().reduce((sum, line) => sum + line.lineTotal, 0);
}

export function addToCart(id, qty = 1) {
  if (!CATALOG[id]) return;
  cart.set(id, (cart.get(id) || 0) + qty);
  save(cart);
}

export function removeFromCart(id) {
  cart.delete(id);
  save(cart);
}

export function clearCart() {
  cart.clear();
  save(cart);
}

export function renderCartUi({ cartRoot, cartList, cartCount, cartTotal, toast }) {
  function render() {
    let total = 0;
    let count = 0;
    const items = [];

    for (const [id, qty] of cart) {
      const item = CATALOG[id];
      if (!item) continue;
      total += item.price * qty;
      count += qty;
      items.push(`
        <li>
          <div>
            <strong>${item.name}</strong>
            <span>${money(item.price)} · Qté ${qty}</span>
          </div>
          <button type="button" data-remove="${id}" aria-label="Retirer ${item.name}">Retirer</button>
        </li>
      `);
    }

    if (cartCount) cartCount.textContent = String(count);
    if (cartTotal) cartTotal.textContent = money(total);
    if (cartList) {
      cartList.innerHTML = items.length
        ? items.join("")
        : `<li class="cart__empty">Ton panier est vide.</li>`;
    }

    const checkout = document.querySelector("[data-checkout]");
    if (checkout) {
      checkout.disabled = count === 0;
      checkout.setAttribute("aria-disabled", count === 0 ? "true" : "false");
    }
  }

  function showToast(message) {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = message;
    requestAnimationFrame(() => toast.classList.add("is-on"));
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      toast.classList.remove("is-on");
      window.setTimeout(() => {
        toast.hidden = true;
      }, 350);
    }, 1800);
  }

  function openCart() {
    if (!cartRoot) return;
    cartRoot.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    if (!cartRoot) return;
    cartRoot.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelector("[data-cart-open]")?.addEventListener("click", openCart);
  document.querySelector("[data-cart-close]")?.addEventListener("click", closeCart);

  cartRoot?.addEventListener("click", (e) => {
    if (e.target === cartRoot) closeCart();
    const remove = e.target.closest("[data-remove]");
    if (remove) {
      removeFromCart(remove.dataset.remove);
      render();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartRoot && !cartRoot.hidden) closeCart();
  });

  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.dataset.add;
      const qty = Number(btn.dataset.qty || 1);
      addToCart(id, qty);
      render();
      showToast(`${CATALOG[id].name} ajouté au panier`);
    });
  });

  document.querySelector("[data-checkout]")?.addEventListener("click", () => {
    if (cart.size === 0) return;
    window.location.href = "commande.html";
  });

  render();

  return { render, showToast, openCart, closeCart, addToCart };
}

export function initNav() {
  const nav = document.querySelector("[data-nav]");
  if (!nav) return;
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 24);
    if (y > 140 && y > lastY) nav.classList.add("is-hidden");
    else nav.classList.remove("is-hidden");
    lastY = y;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
