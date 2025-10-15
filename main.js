 document.getElementById("root").innerHTML = `
  <h1>Accueil Phoenix</h1>
  <button id="enter">Entrer</button>
  <div id="status"></div>
`;

document.getElementById("enter").addEventListener("click", async () => {
  const status = document.getElementById("status");
  try {
    const base = import.meta.env.VITE_API_URL;
    if (!base) {
      status.textContent = "Erreur: VITE_API_URL est vide ou non définie.";
      return;
    }
    const url = base + "/health";
    status.textContent = "Appel en cours: " + url;

    const res = await fetch(url);
    if (!res.ok) {
      status.textContent = `Erreur: HTTP ${res.status} sur ${url}`;
      return;
    }
    const json = await res.json();
    status.textContent = "API répond: " + JSON.stringify(json);
  } catch (e) {
    status.textContent = "Erreur réseau: " + e.message;
  }
});
