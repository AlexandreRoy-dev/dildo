const KEY = "forma-age-ok";

export function initAgeGate() {
  if (sessionStorage.getItem(KEY) === "1") return;

  const root = document.createElement("div");
  root.className = "age";
  root.setAttribute("data-age", "");
  root.innerHTML = `
    <div class="age__panel" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <p class="hero__brand">FORMA</p>
      <h2 id="age-title">18 ans et plus</h2>
      <p>Ce site présente des produits de bien-être sexuel pour adultes. En entrant, tu confirmes avoir 18 ans ou plus.</p>
      <div class="age__actions">
        <button type="button" class="btn btn--pink" data-age-yes>J’ai 18 ans ou plus</button>
        <a class="btn btn--ghost" href="https://www.google.com">Quitter</a>
      </div>
    </div>
  `;
  document.body.appendChild(root);
  document.body.style.overflow = "hidden";

  root.querySelector("[data-age-yes]")?.addEventListener("click", () => {
    sessionStorage.setItem(KEY, "1");
    root.remove();
    document.body.style.overflow = "";
  });
}
