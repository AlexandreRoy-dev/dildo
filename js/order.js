import { money } from "./catalog.js";
import {
  getCartLines,
  getCartTotal,
  clearCart,
  renderCartUi,
  initNav,
} from "./cart.js";
import { initAgeGate } from "./age.js";

const summary = document.querySelector("[data-order-summary]");
const empty = document.querySelector("[data-order-empty]");
const form = document.querySelector("[data-order-form]");
const subtotalEl = document.querySelector("[data-order-subtotal]");
const shippingEl = document.querySelector("[data-order-shipping]");
const totalEl = document.querySelector("[data-order-total]");

function shippingCost(subtotal, method) {
  if (method === "standard") return 5;
  return subtotal >= 75 ? 0 : 9;
}

function selectedShipping() {
  return form?.querySelector('input[name="shipping"]:checked')?.value || "express";
}

function renderSummary() {
  const lines = getCartLines();
  if (!summary || !empty || !form) return;

  if (!lines.length) {
    empty.hidden = false;
    form.hidden = true;
    return;
  }

  empty.hidden = true;
  form.hidden = false;

  const subtotal = getCartTotal();
  const ship = shippingCost(subtotal, selectedShipping());

  summary.innerHTML = lines
    .map(
      (line) => `
      <li>
        <div>
          <strong>${line.name}</strong>
          <span>Qté ${line.qty}</span>
        </div>
        <span>${money(line.lineTotal)}</span>
      </li>
    `
    )
    .join("");

  if (subtotalEl) subtotalEl.textContent = money(subtotal);
  if (shippingEl) shippingEl.textContent = ship === 0 ? "Gratuite" : money(ship);
  if (totalEl) totalEl.textContent = money(subtotal + ship);
}

form?.querySelector("[data-shipping]")?.addEventListener("change", (e) => {
  const label = e.target.closest(".order__radio");
  if (!label) return;
  form.querySelectorAll(".order__radio").forEach((el) => el.classList.remove("is-active"));
  label.classList.add("is-active");
  renderSummary();
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const lines = getCartLines();
  if (!lines.length) return;

  const data = Object.fromEntries(new FormData(form).entries());
  if (!data.name?.trim() || !data.email?.trim() || !data.address?.trim()) return;

  const subtotal = getCartTotal();
  const ship = shippingCost(subtotal, selectedShipping());

  localStorage.setItem(
    "forma-last-order",
    JSON.stringify({
      at: new Date().toISOString(),
      name: data.name,
      email: data.email,
      city: data.city,
      total: subtotal + ship,
      lines: lines.map((l) => ({ id: l.id, name: l.name, qty: l.qty })),
    })
  );

  clearCart();
  window.location.href = "merci.html";
});

initAgeGate();
initNav();
renderCartUi({
  cartRoot: document.querySelector("[data-cart]"),
  cartList: document.querySelector("[data-cart-list]"),
  cartCount: document.querySelector("[data-cart-count]"),
  cartTotal: document.querySelector("[data-cart-total]"),
  toast: document.querySelector("[data-toast]"),
});
renderSummary();
