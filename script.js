/* =========================================
   NOIRÉ PERFUME STORE
   JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       ELEMENTS
    =============================== */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    const searchBtn = document.getElementById("searchBtn");
    const searchBox = document.getElementById("searchBox");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");

    const cartBtn = document.getElementById("cartBtn");
    const cartPanel = document.getElementById("cartPanel");
    const closeCart = document.getElementById("closeCart");

    const overlay = document.getElementById("overlay");

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    const categoryButtons =
        document.querySelectorAll(".category");

    const products =
        document.querySelectorAll(".product-card");

    const addButtons =
        document.querySelectorAll(".quick-add");

    /* ===============================
       CART DATA
    =============================== */

    let cart = [];


    /* ===============================
       MOBILE MENU
    =============================== */

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });


    navbar.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

        });

    });


    /* ===============================
       SEARCH
    =============================== */

    searchBtn.addEventListener("click", () => {

        searchBox.classList.add("active");

        searchInput.focus();

    });


    closeSearch.addEventListener("click", () => {

        searchBox.classList.remove("active");

        searchInput.value = "";

        showAllProducts();

    });


    searchInput.addEventListener("input", () => {

        const searchValue =
            searchInput.value.toLowerCase().trim();

        products.forEach(product => {

            const name =
                product.dataset.name.toLowerCase();

            if (name.includes(searchValue)) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });


    function showAllProducts() {

        products.forEach(product => {

            product.style.display = "";

        });

    }


    /* ===============================
       CATEGORY FILTER
    =============================== */

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            const category =
                button.dataset.category;

            products.forEach(product => {

                if (
                    category === "all" ||
                    product.dataset.category === category
                ) {

                    product.style.display = "";

                } else {

                    product.style.display = "none";

                }

            });

        });

    });


    /* ===============================
       ADD TO CART
    =============================== */

    addButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            const productName =
                button.dataset.product;

            addToCart(productName);

            openCart();

        });

    });


    function addToCart(name) {

        const existingProduct =
            cart.find(item => item.name === name);

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                quantity: 1
            });

        }

        updateCart();

    }


    /* ===============================
       UPDATE CART
    =============================== */

    function updateCart() {

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <p class="empty-cart">
                    Your bag is empty.
                </p>
            `;

        } else {

            cart.forEach((item, index) => {

                const cartItem =
                    document.createElement("div");

                cartItem.className = "cart-item";

                cartItem.innerHTML = `
                    <div>
                        <strong>${item.name}</strong>
                        <small>
                            Quantity: ${item.quantity}
                        </small>
                    </div>

                    <button
                        class="remove-item"
                        data-index="${index}"
                    >
                        Remove
                    </button>
                `;

                cartItems.appendChild(cartItem);

            });

        }

        updateCartCount();

        updateTotal();

    }


    /* ===============================
       REMOVE FROM CART
    =============================== */

    cartItems.addEventListener("click", event => {

        if (
            event.target.classList.contains("remove-item")
        ) {

            const index =
                Number(event.target.dataset.index);

            cart.splice(index, 1);

            updateCart();

        }

    });


    /* ===============================
       CART COUNT
    =============================== */

    function updateCartCount() {

        const totalItems =
            cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            );

        cartCount.textContent = totalItems;

    }


    /* ===============================
       CART TOTAL
    =============================== */

    function updateTotal() {

        /*
            Demo prices.
            In a real ecommerce website,
            prices should come from your backend/database.
        */

        const prices = {

            "Noir Intense": 89,
            "Velvet Rose": 95,
            "Oud Royale": 120,
            "Midnight Blue": 79

        };

        const total =
            cart.reduce((sum, item) => {

                return sum +
                    prices[item.name] * item.quantity;

            }, 0);

        cartTotal.textContent =
            `$${total}`;

    }


    /* ===============================
       OPEN CART
    =============================== */

    cartBtn.addEventListener("click", openCart);

    function openCart() {

        cartPanel.classList.add("active");

        overlay.classList.add("active");

    }


    /* ===============================
       CLOSE CART
    =============================== */

    closeCart.addEventListener("click", closeCartPanel);

    overlay.addEventListener("click", closeCartPanel);

    function closeCartPanel() {

        cartPanel.classList.remove("active");

        overlay.classList.remove("active");

    }


    /* ===============================
       NEWSLETTER
    =============================== */

    const newsletterForm =
        document.getElementById("newsletterForm");

    const formMessage =
        document.getElementById("formMessage");

    newsletterForm.addEventListener("submit", event => {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        if (email) {

            formMessage.textContent =
                "Thank you for joining NOIRÉ.";

            newsletterForm.reset();

        }

    });


    /* ===============================
       CHECKOUT DEMO
    =============================== */

    const checkoutBtn =
        document.getElementById("checkoutBtn");

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your bag is empty.");

            return;

        }

        alert(
            "Checkout system is ready to connect with your backend."
        );

    });


    /* ===============================
       ESC KEY
    =============================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeCartPanel();

            searchBox.classList.remove("active");

        }

    });

});