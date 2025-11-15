import React, { useState, useEffect } from "react";

/*
  LABOLUX - Prototype e‑commerce (React + Tailwind)
  Personnalisation :
    - Nom du propriétaire : Sùleęïmãn Âdâm
    - Contact : 783521039
    - Produits : Montres, lunettes, chaussures, accessoires de luxe
*/

const PRODUITS_EXEMPLES = [
  { id: "p1", titre: "Montre LABOLUX Chrono", prix: 249.99, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80", tags: ["montre", "luxe"], desc: "Montre élégante en acier inoxydable, design moderne et chic." },
  { id: "p2", titre: "Lunettes LABOLUX Vision", prix: 129.5, img: "https://images.unsplash.com/photo-1542144582-1ba0047b5b4f?w=1200&q=80", tags: ["lunettes", "style"], desc: "Lunettes de soleil design avec protection UV optimale." },
  { id: "p3", titre: "Chaussures LABOLUX Elite", prix: 199.0, img: "https://images.unsplash.com/photo-1589820296150-3f3a6c0f01d8?w=1200&q=80", tags: ["chaussures", "luxe"], desc: "Chaussures en cuir de qualité supérieure pour un confort maximal." },
  { id: "p4", titre: "Sac LABOLUX Prestige", prix: 179.99, img: "https://images.unsplash.com/photo-1562158070-622bd2bb9112?w=1200&q=80", tags: ["accessoire", "luxe"], desc: "Sac en cuir élégant, parfait pour toutes les occasions." }
];

function formatMonnaie(montant) { return montant.toLocaleString("fr-FR", { style: "currency", currency: "EUR" }); }

export default function LABOLUXApp() {
  const [produits] = useState(PRODUITS_EXEMPLES);
  const [recherche, setRecherche] = useState("");
  const [selectionne, setSelectionne] = useState(null);
  const [panier, setPanier] = useState([]);
  const [panierOuvert, setPanierOuvert] = useState(false);
  const [theme, setTheme] = useState("clair");

  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'sombre'); }, [theme]);

  function ajouterAuPanier(produit, quantite = 1) {
    setPanier(prev => {
      const trouve = prev.find(p => p.id === produit.id);
      if (trouve) return prev.map(p => p.id === produit.id ? { ...p, qty: p.qty + quantite } : p);
      return [...prev, { ...produit, qty: quantite }];
    });
    setPanierOuvert(true);
  }

  function modifierQuantite(id, quantite) { setPanier(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, quantite) } : p)); }
  function supprimerDuPanier(id) { setPanier(prev => prev.filter(p => p.id !== id)); }
  function totalPanier() { return panier.reduce((s, p) => s + p.prix * p.qty, 0); }
  const filtres = produits.filter(p => p.titre.toLowerCase().includes(recherche.toLowerCase()) || p.tags.join(' ').includes(recherche.toLowerCase()));

  function paiementSimule() {
    if (panier.length === 0) return alert('Le panier est vide.');
    alert('Paiement simulé réussi — merci pour votre commande !');
    setPanier([]);
    setPanierOuvert(false);
  }

  function telechargerHTML() {
    const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>LABOLUX - Boutique</title></head><body style="font-family:Arial, sans-serif;margin:0;padding:20px;background:#f7f7fb"><header><h1 style="color:#4f46e5">LABOLUX</h1><p>Design • Confort • Luxe</p><p>Propriétaire: Sùleęïmãn Âdâm | Contact: 783521039</p></header><main>${produits.map(p => `<div style="border:1px solid #ccc;padding:16px;margin-bottom:12px"><img src='${p.img}' alt='${p.titre}' style='width:100%;border-radius:8px'/><h3>${p.titre}</h3><p>${p.desc}</p><strong>${formatMonnaie(p.prix)}</strong></div>`).join('')}</main><footer style="margin-top:24px;color:#666">© ${new Date().getFullYear()} LABOLUX</footer></body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'labolux-static.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-30 bg-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 text-white font-extrabold flex items-center justify-center">L</div><div><div className="text-lg font-bold">LABOLUX</div><div className="text-sm text-gray-500 dark:text-gray-300">Design • Confort • Luxe</div><div className="text-xs text-gray-400">Propriétaire: Sùleęïmãn Âdâm | Contact: 783521039</div></div></div>
          <div className="flex items-center gap-3">
            <input value={recherche} onChange={e => setRecherche(e.target.value)} className="px-3 py-2 rounded-md border bg-white/60 dark:bg-gray-800/60" placeholder="Rechercher..." />
            <button onClick={() => setTheme(t => t === 'clair' ? 'sombre' : 'clair')} className="px-3 py-2 border rounded-md">Thème</button>
            <button onClick={() => telechargerHTML()} className="px-3 py-2 border rounded-md">Télécharger HTML</button>
            <button onClick={() => setPanierOuvert(v => !v)} className="px-3 py-2 bg-indigo-600 text-white rounded-md">Panier ({panier.length})</button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div><h2 className="text-4xl font-extrabold leading-tight">LABOLUX — Montres, lunettes, chaussures et accessoires de luxe</h2><p className="mt-4 text-gray-600 dark:text-gray-300">Découvrez notre sélection exclusive pour un style unique et raffiné.</p></div>
        <div className="rounded-xl overflow-hidden shadow-lg"><img src={produits[0].img} alt="hero" className="w-full h-80 object-cover" /></div>
      </main>
    </div>
  );
}
