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
 UPDATE CART COUNT
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
    cart.splice(index, 1);
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
 EXECUTE ON PAGE LOAD
-------------------------- */
window.onload = () => {
  updateCartCount();
  renderCart();
};

/* -------------------------
      PAYMENT POPUP
-------------------------- */
function openPaymentPopup() {
  document.getElementById("paymentPopup").style.display = "flex";
}

function closePaymentPopup() {
  document.getElementById("paymentPopup").style.display = "none";
}

/* -------------------------
        PAYMENT LOGIC
-------------------------- */
function startPayment(method) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  closePaymentPopup();

  // SAVE ORDER HISTORY
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  const order = {
    id: Date.now(),
    items: cart,
    paymentMethod: method,
    time: new Date().toLocaleString(),
    total: cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  };

  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  // PAYMENT ANIMATION
  setTimeout(() => {
    document.getElementById("successPopup").style.display = "flex";
    localStorage.removeItem("cart");
    updateCartCount();
  }, 500);
}

function closeSuccessPopup() {
  document.getElementById("successPopup").style.display = "none";
  window.location.href = "orderhistory.html"; 
}

/* -------------------------
     CHECKOUT BUTTON FIXED
-------------------------- */
const checkoutButton = document.getElementById("checkoutBtn");

if (checkoutButton) {
  checkoutButton.onclick = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    openPaymentPopup();
  };
}
