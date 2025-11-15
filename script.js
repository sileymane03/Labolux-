const products = [
    { name: "Montre Dorée", price: 8000, image: "https://i.imgur.com/3D5Q2I7.jpeg" },
    { name: "Lunettes Classiques", price: 5000, image: "https://i.imgur.com/1Q9YEtV.jpeg" },
    { name: "Casquette Noire", price: 3000, image: "https://i.imgur.com/0yHgd27.jpeg" },
    { name: "Chargeur Rapide", price: 2500, image: "https://i.imgur.com/rBM6vBQ.jpeg" }
];

const container = document.getElementById("product-list");

products.forEach(p => {
    container.innerHTML += `
        <div class="card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price} FCFA</p>
            <button>Ajouter au panier</button>
        </div>
    `;
});
