export const CATALOG = {
  curve: {
    id: "curve",
    page: "forma-curve.html",
    name: "Forma Curve",
    price: 129,
    tag: "Vedette",
    blurb: "Contour point G ergonomique · 8 modes",
    description:
      "Curve épouse ta forme sans forcer. Silicone platine, 8 modes, et un moteur assez discret pour que la pièce reste à toi. Pensé pour un usage quotidien, pas pour l’étagère.",
    image: "assets/products/rabbit-a.png",
    gallery: [
      "assets/products/rabbit-a.png",
      "assets/products/rabbit-b.png",
    ],
    modes: ["Vague", "Pulse", "Escalade", "Libre"],
    specs: [
      ["Matériau", "Silicone platine, sans phtalates"],
      ["Modes", "8 programmes + intensité variable"],
      ["Autonomie", "Jusqu’à 90 minutes"],
      ["Charge", "USB-C magnétique, ~90 min"],
      ["Étanchéité", "IPX7 (bain et douche)"],
      ["Bruit", "Sous 45 dB"],
      ["Garantie", "2 ans"],
    ],
  },
  pulse: {
    id: "pulse",
    page: "forma-pulse.html",
    name: "Forma Pulse",
    price: 149,
    tag: "Nouveau",
    blurb: "Aspiration par ondes d’air · rechargeable",
    description:
      "Pulse travaille par ondes d’air, sans friction inutile. Intensité précise, recharge rapide, et un design assez sobre pour vivre sur ta table de chevet.",
    image: "assets/products/rabbit-b.png",
    gallery: [
      "assets/products/rabbit-b.png",
      "assets/products/rabbit-a.png",
    ],
    modes: ["Souffle", "Rythme", "Focus", "Libre"],
    specs: [
      ["Matériau", "Silicone platine, sans phtalates"],
      ["Techno", "Ondes d’air (sans contact direct)"],
      ["Autonomie", "Jusqu’à 75 minutes"],
      ["Charge", "USB-C, ~80 min"],
      ["Étanchéité", "IPX6"],
      ["Bruit", "Sous 45 dB"],
      ["Garantie", "2 ans"],
    ],
  },
  soft: {
    id: "soft",
    page: "forma-soft.html",
    name: "Forma Soft",
    price: 89,
    tag: null,
    blurb: "Silicone ultra doux · intensité douce",
    description:
      "Soft, c’est l’entrée en matière. Texture plus souple, intensités plus basses, même exigence de sécurité. Idéal pour explorer sans pression.",
    image: "assets/products/rabbit-b.png",
    gallery: [
      "assets/products/rabbit-b.png",
      "assets/products/rabbit-a.png",
    ],
    modes: ["Doux", "Lent", "Vague", "Libre"],
    specs: [
      ["Matériau", "Silicone platine ultra souple"],
      ["Modes", "6 programmes"],
      ["Autonomie", "Jusqu’à 100 minutes"],
      ["Charge", "USB-C, ~70 min"],
      ["Étanchéité", "IPX7"],
      ["Bruit", "Sous 40 dB"],
      ["Garantie", "2 ans"],
    ],
  },
  duo: {
    id: "duo",
    page: "forma-duo.html",
    name: "Forma Duo",
    price: 179,
    tag: null,
    blurb: "Contrôle partagé · prêt pour l’appli",
    description:
      "Duo se partage. Contrôle local ou via l’appli, pour deux personnes ou pour toi seule. Même silicone, même discrétion, un cran plus connecté.",
    image: "assets/products/rabbit-a.png",
    gallery: [
      "assets/products/rabbit-a.png",
      "assets/products/rabbit-b.png",
    ],
    modes: ["Sync", "Echo", "Solo", "Libre"],
    specs: [
      ["Matériau", "Silicone platine, sans phtalates"],
      ["Connexion", "Bluetooth + appli"],
      ["Autonomie", "Jusqu’à 80 minutes"],
      ["Charge", "USB-C magnétique, ~95 min"],
      ["Étanchéité", "IPX7"],
      ["Bruit", "Sous 45 dB"],
      ["Garantie", "2 ans"],
    ],
  },
};

export function money(n) {
  return `${n}\u00a0$`;
}

export function getProduct(id) {
  return CATALOG[id] || CATALOG.curve;
}

export function relatedProducts(id, limit = 3) {
  return Object.values(CATALOG)
    .filter((p) => p.id !== id)
    .slice(0, limit);
}
