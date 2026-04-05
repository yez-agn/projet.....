// ======= DEBUG GLOBAL =======
console.log("JS chargé !");


// ======= AFFICHAGE DES PRODUITS =======
fetch("data/products.json")
  .then(res => res.json())
  .then(products => {
    console.log("Produits chargés :", products);

    const productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";

    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" width="150">
        <h3>${product.name}</h3>
        <p>${product.price} FCFA</p>
        <button class="add-to-cart">Ajouter au panier</button>
      `;

      const btn = card.querySelector(".add-to-cart");

      btn.addEventListener("click", () => {
        console.log("CLICK OK sur :", product.name);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        console.log("PANIER MAJ :", cart);

        alert(product.name + " ajouté !");
      });

      productList.appendChild(card);
    });
  })
  .catch(err => console.error("Erreur JSON :", err));


// ======= AFFICHAGE PANIER =======
const cartContainer = document.getElementById("cart-container");

if (cartContainer) {
  console.log("Page panier détectée");

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  console.log("Contenu panier :", cartItems);

  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Panier vide</p>";
  } else {
    cartItems.forEach(item => {
      const div = document.createElement("div");

      div.innerHTML = `
        <p>${item.name} - ${item.price} FCFA</p>
      `;

      cartContainer.appendChild(div);
    });
  }
}


// ======= WHATSAPP =======
const orderBtn = document.getElementById("order-btn");

if (orderBtn) {
  orderBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    console.log("Commande envoyée :", cart);

    if (cart.length === 0) {
      alert("Panier vide !");
      return;
    }

    let message = "Commande :%0A";
    let total = 0;

    cart.forEach(item => {
      message += `- ${item.name} ${item.price} FCFA%0A`;
      total += item.price;
    });

    message += `%0ATotal: ${total} FCFA`;

    const phone = "229XXXXXXXX";
    window.open(`https://wa.me/${phone}?text=${message}`);
  });
}