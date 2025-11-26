/* -------------------------
      GLOBAL YEAR
-------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* -------------------------
      SEARCH FUNCTION
-------------------------- */
function onSearch() {
  const q = document.getElementById('q')?.value.trim();
  if (!q) return alert("Type a product to search");
  alert("Searching for: " + q);
}


/* -------------------------
 ADD TO CART FUNCTIONALITY
-------------------------- */

function addToCart(name, price, img) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if item exists
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name,
      price,
      qty: 1,
      img
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  alert(name + " added to cart!");
}


/* -------------------------
 UPDATE CART COUNT (TOP NAV)
-------------------------- */
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQty = 0;

  cart.forEach(item => totalQty += item.qty);

  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) cartCountEl.textContent = totalQty;
}


/* -------------------------
    CART PAGE RENDER LOGIC
-------------------------- */

function renderCart() {
  const container = document.getElementById("cartContainer");
  const totalSpan = document.getElementById("cartTotal");

  // If not on cart page, do nothing
  if (!container) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p style="font-size:18px; color:#777;">Your cart is empty.</p>`;
    totalSpan.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="meta">
          <h3 style="margin:0; font-size:18px;">${item.name}</h3>
          <p style="margin:4px 0 8px;">₹${item.price} × ${item.qty}</p>

          <div class="qty-controls">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  });

  totalSpan.textContent = total;
}


/* -------------------------
      CHANGE QUANTITY
-------------------------- */
function changeQty(index, amount) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].qty += amount;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1); // remove item
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}


/* -------------------------
     CLEAR CART BUTTON
-------------------------- */
if (document.getElementById("clearBtn")) {
  document.getElementById("clearBtn").onclick = () => {
    localStorage.removeItem("cart");
    renderCart();
    updateCartCount();
  };
}


/* -------------------------
     CHECKOUT BUTTON
-------------------------- */
if (document.getElementById("checkoutBtn")) {
  document.getElementById("checkoutBtn").onclick = () => {
    alert("Checkout feature coming soon!");
  };
}


/* -------------------------
 EXECUTE ON PAGE LOAD
-------------------------- */
window.onload = () => {
  updateCartCount();
  renderCart();
};
