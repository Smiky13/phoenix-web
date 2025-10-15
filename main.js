document.getElementById("root").innerHTML = `
  <h1>Accueil Phoenix</h1>
  <button id="enter">Entrer</button>
  <div id="status"></div>
`;

document.getElementById("enter").addEventListener("click", async () => {
  try {
    const base = import.meta?.env?.VITE_API_URL || ""; // sécurité si variable absente
    const res = await fetch(base + "/health");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    document.getElementById("status").textContent = "API répond: " + JSON.stringify(json);
  } catch (e) {
    document.getElementById("status").textContent = "Erreur: " + e.message;
  }
});
