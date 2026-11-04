const tools = [
  { name: "Chat Public IA", description: "Échanger avec une IA pensée pour les usages publics.", category: "Dialoguer", url: "https://chat.public-ia.fr/", color: "blue", featured: true },
  { name: "Concours photo IA", description: "Déposer une image générée par IA et voter pour sa préférée.", category: "Se former", url: "https://concours-photos.public-ia.fr/", color: "orange" },
  { name: "Mandat 360", description: "Découvrir Mandat 360, un outil Public IA actuellement en phase de test.", category: "Dialoguer", url: "https://staging.mandat-360.public-ia.fr/", color: "orange" },
  { name: "Anonymiseur", description: "Retirer les données personnelles avant de partager un document.", category: "Protéger", url: "https://anonymiseur.public-ia.fr/", color: "teal", featured: true },
  { name: "Conclave", description: "Faire confronter plusieurs IA pour éclairer une décision.", category: "Décider", url: "https://conclave.public-ia.fr/", color: "violet", featured: true },
  { name: "Graphe", description: "Transformer des documents en graphe de connaissances navigable.", category: "Comprendre", url: "https://graphe.public-ia.fr/", color: "lime", featured: true },
  { name: "INSEE Dossiers complets", description: "Produire des dossiers complets à partir des données de l’INSEE.", category: "Analyser", url: "https://insee-dossier-complet.streamlit.app/", color: "blue" },
  { name: "Observatoire IA", description: "Explorer les données sur l’IA dans les collectivités.", category: "Comprendre", url: "https://observatoire.public-ia.fr/", color: "lime" },
  { name: "Charte IA", description: "Créer une charte IA adaptée à sa collectivité.", category: "Concevoir", url: "https://charte-ia.public-ia.fr/", color: "violet" },
  { name: "Formation", description: "Accéder aux contenus et parcours de formation.", category: "Se former", url: "https://colter.public-ia.fr/", color: "orange" },
  { name: "Questionnaire", description: "Construire des questionnaires pondérés de mise en situation.", category: "Évaluer", url: "https://questionnaire.public-ia.fr/", color: "orange" },
  { name: "Quiz", description: "Animer un quiz interactif pour les apprenants.", category: "Se former", url: "https://quiz.public-ia.fr/", color: "orange" },
  { name: "Glossaire IA", description: "Consulter les termes essentiels de l’intelligence artificielle.", category: "Comprendre", url: "https://glossaire.public-ia.fr/", color: "lime" },
  { name: "GPT Hub", description: "Accéder à différents modèles conversationnels et assistants.", category: "Dialoguer", url: "https://gpthub.public-ia.fr/", color: "blue" },
  { name: "Fiche IA", description: "Cadrer la mise en place d’un projet IA dans une collectivité.", category: "Concevoir", url: "https://fiche-ia.public-ia.fr/", color: "violet" },
  { name: "Matrice IA", description: "Visualiser la faisabilité des projets IA sous forme matricielle.", category: "Décider", url: "https://matrice-ia.public-ia.fr/", color: "violet" },
  { name: "Quelle IA pour ma collectivité ?", description: "Choisir une IA par arbre de décision.", category: "Décider", url: "https://claude.ai/public/artifacts/c2d7b5c2-c896-4fa8-b1a6-826cedd89a8f", color: "violet" },
  { name: "LLM Pédago", description: "Comprendre et expérimenter avec les modèles de langage.", category: "Se former", url: "https://llmpedago.public-ia.fr/", color: "orange" },
  { name: "Guide du prompting", description: "Apprendre à formuler de meilleurs prompts.", category: "Se former", url: "https://guide-llm.public-ia.fr/", color: "orange" },
  { name: "Nuage de mots", description: "Visualiser et analyser un texte sous forme de nuage de mots.", category: "Analyser", url: "https://nuagedemots.public-ia.fr/", color: "blue" },
  { name: "Prompt avancé", description: "Composer des prompts structurés et réutilisables.", category: "Concevoir", url: "https://prompt-avance.public-ia.fr/", color: "violet" },
  { name: "Cloud Public IA", description: "Accéder à un espace de partage de fichiers basé sur Nextcloud.", category: "Partager", url: "https://cloud.public-ia.fr/", color: "teal" },
  { name: "Liste des fichiers", description: "Consulter les fichiers proposés au téléchargement.", category: "Partager", url: "https://fichiers.public-ia.fr/liste_fichiers_7d39f9ab.php", color: "teal" },
  { name: "Upload de fichiers", description: "Partager des présentations avec génération de QR codes.", category: "Partager", url: "https://fichiers.public-ia.fr/upload_qrcode_8f3c2a1b7e.html", color: "teal" },
  { name: "Formulaire IA Collectivités", description: "Exprimer les besoins IA d’une administration territoriale.", category: "Concevoir", url: "https://tally.so/r/w4O1ed", color: "violet" },
  { name: "n8n Workflow Automation", description: "Créer et piloter des automatisations de processus.", category: "Automatiser", url: "https://n8n.public-ia.fr/home/workflows", color: "teal" },
  { name: "Public IA", description: "Découvrir la mission, les projets et les ressources Public IA.", category: "Découvrir", url: "https://public-ia.fr/", color: "blue" }
];

const colorThemes = {
  blue: { feature: "#174a75", accent: "#a8d8f0", symbolBg: "#e6f0f7", symbolInk: "#174a75" },
  teal: { feature: "#0d6f73", accent: "#b3eddf", symbolBg: "#e0f2ef", symbolInk: "#0d6f73" },
  violet: { feature: "#553b78", accent: "#f1c2d8", symbolBg: "#eee8f4", symbolInk: "#553b78" },
  lime: { feature: "#477a4b", accent: "#d6edb0", symbolBg: "#e9f2df", symbolInk: "#477a4b" },
  orange: { feature: "#cf3f12", accent: "#ffe0ae", symbolBg: "#fff0e7", symbolInk: "#cf3f12" }
};

const icons = {
  Dialoguer: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 18.5 3.5 21l4.1-1.2A8.5 8.5 0 1 0 3.5 12"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>',
  Protéger: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 19 6v5c0 4.7-2.9 8.2-7 10-4.1-1.8-7-5.3-7-10V6l7-3Z"/><path d="m8.5 12 2.1 2.1 4.9-4.9"/></svg>',
  Décider: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v18M17 3v18M4 7h6M14 12h6M4 17h6M14 7h3"/><circle cx="17" cy="7" r="2"/><circle cx="7" cy="17" r="2"/></svg>',
  Comprendre: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="7" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="m8.1 7.2 7.7-.9M7.6 8l3.2 7.8m6-6.8-3.4 6.8"/></svg>',
  Analyser: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10m5 10V4m5 16v-7m5 7V7"/></svg>',
  Concevoir: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 19 2.2-5.5L16.6 4l3.4 3.4-9.4 9.4L5 19Z"/><path d="m14.7 5.9 3.4 3.4"/></svg>',
  "Se former": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 6 9-3 9 3-9 3-9-3Z"/><path d="M7 9.3V15c3 2 7 2 10 0V9.3M21 7v6"/></svg>',
  "Évaluer": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v18H7z"/><path d="m10 8 1.5 1.5L14 7m-4 6h4m-4 4h4"/></svg>',
  Partager: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V3m0 0-4 4m4-4 4 4M5 14v5h14v-5"/></svg>',
  Automatiser: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10H7z"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5.5 5.5l2 2m9 9 2 2m0-13-2 2m-9 9-2 2"/></svg>',
  Découvrir: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="8.5"/></svg>'
};

const filterGroups = {
  "Tous": null,
  "Dialoguer": ["Dialoguer"],
  "Protéger": ["Protéger"],
  "Décider": ["Décider"],
  "Comprendre": ["Comprendre", "Analyser"],
  "Concevoir": ["Concevoir", "Évaluer"],
  "Se former": ["Se former"],
  "Automatiser": ["Automatiser", "Partager"]
};
let activeCategory = "Tous";

const bentoSizes = ["tile--lead", "tile--tall", "tile--tall", "tile--wide", "tile--wide", "", "tile--wide", "", "", "tile--tall", "", "", "", "tile--wide", "tile--tall", "", "", "tile--wide", "", "", "", "tile--tall", "tile--wide", "", "tile--wide", "tile--wide", "tile--wide"];

function tileMarkup(tool) {
  const theme = colorThemes[tool.color];
  const tileSize = bentoSizes[tools.indexOf(tool)] || "";
  return `<li class="tool-tile ${tileSize}" style="--tile:${theme.feature};--tile-soft:${theme.symbolBg}"><a href="${tool.url}" target="_blank" rel="noreferrer" aria-label="${tool.name} : ${tool.description} S’ouvre dans un nouvel onglet.">
    <span class="tile-symbol">${icons[tool.category] || icons.Découvrir}</span><span class="tile-category">${tool.category}</span><span class="tile-name">${tool.name}</span><span class="tile-description">${tool.description}</span><span class="tile-cta">Accéder</span>
  </a></li>`;
}

function renderFilters() {
  const filters = document.querySelector("#filters");
  filters.innerHTML = Object.keys(filterGroups).map((category) => `<button class="filter" type="button" data-category="${category}" aria-pressed="${category === activeCategory}">${category}</button>`).join("");
}

function renderTools() {
  const query = document.querySelector("#tool-search").value.trim().toLocaleLowerCase("fr");
  const visibleTools = tools.filter((tool) => {
    const matchesCategory = activeCategory === "Tous" || filterGroups[activeCategory].includes(tool.category);
    const searchable = `${tool.name} ${tool.description} ${tool.category}`.toLocaleLowerCase("fr");
    return matchesCategory && searchable.includes(query);
  });
  document.querySelector("#tool-list").innerHTML = visibleTools.map(tileMarkup).join("");
  document.querySelector("#tool-count").textContent = `${visibleTools.length} outil${visibleTools.length > 1 ? "s" : ""} disponible${visibleTools.length > 1 ? "s" : ""}`;
  document.querySelector("#filter-summary").textContent = activeCategory === "Tous" ? `Tous les outils sont affichés : ${visibleTools.length} résultats.` : `Filtre ${activeCategory} sélectionné : ${visibleTools.length} résultats.`;
  document.querySelector("#empty-state").hidden = visibleTools.length !== 0;
  document.querySelector("#clear-search").hidden = query.length === 0;
}

renderFilters();
renderTools();

document.querySelector("#filters").addEventListener("click", (event) => {
  const filter = event.target.closest("[data-category]");
  if (!filter) return;
  activeCategory = filter.dataset.category;
  renderFilters();
  renderTools();
  [...document.querySelectorAll("[data-category]")].find((button) => button.dataset.category === activeCategory)?.focus();
});

document.querySelector("#tool-search").addEventListener("input", renderTools);
document.querySelector("#clear-search").addEventListener("click", () => {
  document.querySelector("#tool-search").value = "";
  document.querySelector("#tool-search").focus();
  renderTools();
});
document.querySelector("#reset-filters").addEventListener("click", () => {
  activeCategory = "Tous";
  document.querySelector("#tool-search").value = "";
  renderFilters();
  renderTools();
});

const briceLauncher = document.querySelector("#brice-launcher");
const bricePanel = document.querySelector("#brice-panel");
const briceClose = document.querySelector("#brice-close");
const briceForm = document.querySelector("#brice-form");
const briceInput = document.querySelector("#brice-input");
const briceMessages = document.querySelector("#brice-messages");
const briceStatus = document.querySelector("#brice-status");
const briceSuggestions = document.querySelector(".brice-suggestions");
const briceSubmit = briceForm.querySelector("button[type=submit]");

function setBriceOpen(isOpen, shouldFocus = false) {
  bricePanel.hidden = !isOpen;
  briceLauncher.setAttribute("aria-expanded", String(isOpen));
  if (isOpen && shouldFocus) briceInput.focus();
  if (!isOpen && shouldFocus) briceLauncher.focus();
}

function isPublicIaToolUrl(url) {
  try {
    const candidate = new URL(url).href;
    return tools.some((tool) => new URL(tool.url).href === candidate);
  } catch {
    return false;
  }
}

function appendBriceMessage(text, role) {
  if (role !== "assistant") {
    const message = document.createElement("p");
    message.className = "brice-message brice-message--user";
    message.textContent = text;
    briceMessages.append(message);
    briceMessages.scrollTop = briceMessages.scrollHeight;
    return;
  }

  const recommendationPattern = /^\s*-\s+\[([^\]]{1,100})\]\((https:\/\/[^\s)]+)\)\s*(?:[—–-]\s*)?(.+)$/;
  const recommendations = text.split(/\r?\n/).map((line) => line.match(recommendationPattern)).filter(Boolean);
  if (recommendations.length) {
    const list = document.createElement("ul");
    list.className = "brice-recommendations";
    recommendations.forEach((match) => {
      const [, name, url, reason] = match;
      const item = document.createElement("li");
      item.className = "brice-recommendation";
      const description = document.createElement("span");
      description.textContent = reason;
      const link = document.createElement("a");
      link.className = "brice-tool-link";
      link.textContent = `Ouvrir ${name}`;
      if (isPublicIaToolUrl(url)) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noreferrer";
      } else {
        link.removeAttribute("href");
      }
      item.append(description, link);
      list.append(item);
    });
    briceMessages.append(list);
  } else {
    const message = document.createElement("p");
    message.className = "brice-message brice-message--assistant";
    message.textContent = text;
    briceMessages.append(message);
  }
  briceMessages.scrollTop = briceMessages.scrollHeight;
}

function setBricePending(isPending) {
  briceInput.disabled = isPending;
  briceSubmit.disabled = isPending;
  briceSubmit.textContent = isPending ? "…" : "Envoyer";
  briceSuggestions.querySelectorAll("button").forEach((button) => { button.disabled = isPending; });
}

async function askBrice(question) {
  const message = question.trim();
  if (!message) return;

  appendBriceMessage(message, "user");
  briceInput.value = "";
  briceStatus.textContent = "Brice réfléchit…";
  setBricePending(true);

  try {
    const response = await fetch("./api/brice.php", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ message })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || typeof data.reply !== "string") throw new Error(data.error || "Réponse indisponible");
    appendBriceMessage(data.reply, "assistant");
    briceStatus.textContent = "";
  } catch (error) {
    briceStatus.textContent = error instanceof Error && error.message !== "Réponse indisponible"
      ? error.message
      : "Brice est momentanément indisponible. Réessayez dans un instant.";
  } finally {
    setBricePending(false);
    briceInput.focus();
  }
}

briceLauncher.addEventListener("click", () => setBriceOpen(bricePanel.hidden, true));
briceClose.addEventListener("click", () => setBriceOpen(false, true));
briceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  askBrice(briceInput.value);
});
briceSuggestions.addEventListener("click", (event) => {
  const suggestion = event.target.closest("[data-brice-question]");
  if (suggestion) askBrice(suggestion.dataset.briceQuestion);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !bricePanel.hidden) setBriceOpen(false, true);
});
