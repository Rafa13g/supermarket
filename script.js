const cart = [];

const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const recipeInput = document.getElementById("recipeInput");
const recipeBtn = document.getElementById("recipeBtn");
const recipeResult = document.getElementById("recipeResult");

function openCart() {
    cartSidebar.classList.add("active");
    overlay.classList.add("active");
}

function closeCartSidebar() {
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
}

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartSidebar);
overlay.addEventListener("click", closeCartSidebar);

function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((product) => {
        total += product.price;

        const item = document.createElement("div");
        item.classList.add("cart-item");

        item.innerHTML = `
            <p>${product.name}</p>
            <span>$${product.price}</span>
        `;

        cartItems.appendChild(item);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".product-card");

        const name = card.dataset.name;
        const price = Number(card.dataset.price);

        cart.push({
            name,
            price
        });

        updateCart();
    });
});

function searchProducts() {
    const search = searchInput.value.toLowerCase();

    document.querySelectorAll(".product-card").forEach(card => {
        const productName = card.dataset.name.toLowerCase();

        if (productName.includes(search)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

searchBtn.addEventListener("click", searchProducts);

searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        searchProducts();
    }
});

const recipes = {
    pizza: [
        { name: "Harina", price: 50 },
        { name: "Salsa de tomate", price: 40 },
        { name: "Queso", price: 120 },
        { name: "Jamón", price: 90 }
    ],

    lasaña: [
        { name: "Pasta para lasaña", price: 70 },
        { name: "Salsa de tomate", price: 40 },
        { name: "Carne picada", price: 180 },
        { name: "Mozzarella", price: 130 }
    ],

    chivito: [
        { name: "Carne", price: 180 },
        { name: "Pan", price: 50 },
        { name: "Jamón", price: 90 },
        { name: "Queso", price: 120 },
        { name: "Tomate", price: 30 }
    ]
};

recipeBtn.addEventListener("click", () => {

    const recipe = recipeInput.value.trim().toLowerCase();

    recipeResult.innerHTML = "";

    if (recipes[recipe]) {

        const title = document.createElement("h3");
        title.textContent = `Ingredientes para ${recipe}`;
        recipeResult.appendChild(title);

        recipes[recipe].forEach(item => {

            const ingredient = document.createElement("div");

            ingredient.innerHTML = `
                <p>${item.name} - $${item.price}</p>
                <button>Agregar al carrito</button>
            `;

            ingredient.querySelector("button").addEventListener("click", () => {
                cart.push(item);
                updateCart();
            });

            recipeResult.appendChild(ingredient);
        });

    } else {

        recipeResult.innerHTML = `
            <p>
                No encontré esa receta. Probá con:
                Pizza, Lasaña o Chivito.
            </p>
        `;
    }
});