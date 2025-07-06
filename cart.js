const cartKey = 'borhanAutoCart';

function loadCart() {
  return JSON.parse(localStorage.getItem(cartKey) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function updateCartCount() {
  const cart = loadCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').textContent = count;

  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline' : 'none';
  }
}

function renderCart() {
  const cart = loadCart();
  const container = document.getElementById('cart-items');
  if (!cart.length) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  container.innerHTML = '<ul>' + cart.map(item =>
    `<li>${item.name} x ${item.qty} = ৳${item.qty * item.price} <button class="remove-item" onclick="removeFromCart('${item.id}')">Remove</button></li>`
  ).join('') + '</ul>';
}

function addToCart(id, name, price) {
  let cart = loadCart();
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, name, price, qty: 1 });

  saveCart(cart);
  updateCartCount();
  renderCart();
}

function removeFromCart(id) {
  let cart = loadCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  updateCartCount();
  renderCart();
}

function orderViaWhatsApp() {
  const cart = loadCart();
  if (!cart.length) return alert('Your cart is empty.');

  const phone = '8801707659954';
  let message = 'Hello, I want to order:\n\n';

  cart.forEach(item => {
    message += `- ${item.name} x ${item.qty} = ৳${item.qty * item.price}\n`;
  });

  message += '\nPlease contact me.';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});