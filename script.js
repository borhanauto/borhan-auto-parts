document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('sideMenu');
  const button = document.querySelector('.menu-toggle');
  const closeBtn = document.querySelector('.close-btn');
  const categoryFilter = document.getElementById('categoryFilter');

  // Cart state (just product names and counts)
  let cart = {};

  // Open menu with slide animation
  function openMenu() {
    menu.classList.add('open');
  }

  // Close menu with slide animation
  function closeMenu() {
    menu.classList.remove('open');
  }

  // Toggle menu
  function toggleMenu(event) {
    event.stopPropagation();
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  button.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !button.contains(event.target)) {
      closeMenu();
    }
  });

  // Filter products by category
  function filterProducts() {
    const category = categoryFilter.value;
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }
  categoryFilter.addEventListener('change', filterProducts);

  filterProducts(); // Initial filter on page load

  // Buy Now button enhancement - add to cart instead of direct WhatsApp
  // Then user can send cart message all at once via WhatsApp

  // Create cart container UI
  const cartContainer = document.createElement('section');
  cartContainer.id = 'cartContainer';
  cartContainer.style = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: #1db954;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 30px;
    box-shadow: 0 8px 16px rgba(29,185,84,0.6);
    max-width: 320px;
    font-family: 'Roboto', sans-serif;
    z-index: 10000;
    display: none;
    flex-direction: column;
    gap: 0.5rem;
  `;
  document.body.appendChild(cartContainer);

  // Add Send Cart Button
  const sendCartBtn = document.createElement('button');
  sendCartBtn.textContent = 'Send Cart via WhatsApp';
  sendCartBtn.style = `
    background: #128c3f;
    border-radius: 20px;
    padding: 0.6rem 1rem;
    font-weight: 700;
    cursor: pointer;
    border: none;
    margin-top: 0.5rem;
  `;

  sendCartBtn.addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // Create message
    let message = 'Hello Borhan Auto Parts Centre, I want to buy:\n';
    for (const [product, qty] of Object.entries(cart)) {
      message += `- ${product} x${qty}\n`;
    }
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/8801707659954?text=${encodedMessage}`, '_blank');
  });

  cartContainer.appendChild(sendCartBtn);

  // Add cart title
  const cartTitle = document.createElement('h4');
  cartTitle.textContent = 'Your Cart';
  cartTitle.style.margin = '0 0 0.5rem 0';
  cartContainer.prepend(cartTitle);

  // Update cart display
  function updateCartUI() {
    // Clear old product list except title and button
    cartContainer.querySelectorAll('.cart-item').forEach(el => el.remove());

    if (Object.keys(cart).length === 0) {
      cartContainer.style.display = 'none';
      return;
    }

    for (const [product, qty] of Object.entries(cart)) {
      const item = document.createElement('div');
      item.classList.add('cart-item');
      item.style = 'display:flex; justify-content:space-between; font-weight:700;';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = product;

      const qtySpan = document.createElement('span');
      qtySpan.textContent = `x${qty}`;

      // Add remove button
      const removeBtn = document.createElement('button');
      removeBtn.textContent = '✕';
      removeBtn.style = `
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        font-weight: 900;
        margin-left: 8px;
      `;
      removeBtn.title = 'Remove item';
      removeBtn.addEventListener('click', () => {
        delete cart[product];
        updateCartUI();
      });

      const rightSide = document.createElement('div');
      rightSide.style.display = 'flex';
      rightSide.style.alignItems = 'center';
      rightSide.appendChild(qtySpan);
      rightSide.appendChild(removeBtn);

      item.appendChild(nameSpan);
      item.appendChild(rightSide);
      cartContainer.appendChild(item);
    }
    cartContainer.style.display = 'flex';
  }

  // Override existing Buy Now buttons to add to cart instead of direct WhatsApp link
  document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Find product name from card
      const card = e.target.closest('.product-card');
      const productName = card.querySelector('h3').textContent.trim();

      if (cart[productName]) {
        cart[productName] += 1;
      } else {
        cart[productName] = 1;
      }
      updateCartUI();
    });
  });

  // Optional: Add product sorting
  const sortSelect = document.createElement('select');
  sortSelect.style = `
    display: block;
    margin: 1rem auto;
    padding: 10px 15px;
    border-radius: 30px;
    border: 2px solid #1db954;
    background: transparent;
    color: #eee;
    cursor: pointer;
    font-size: 1rem;
  `;
  sortSelect.innerHTML = `
    <option value="default">Sort By</option>
    <option value="price-asc">Price: Low to High</option>
    <option value="price-desc">Price: High to Low</option>
    <option value="name-asc">Name: A to Z</option>
    <option value="name-desc">Name: Z to A</option>
  `;

  // Insert sorting above product grid
  const productsSection = document.querySelector('.products');
  productsSection.insertBefore(sortSelect, productsSection.querySelector('.product-grid'));

  sortSelect.addEventListener('change', () => {
    const grid = document.querySelector('.product-grid');
    let cards = Array.from(grid.children);

    switch (sortSelect.value) {
      case 'price-asc':
        cards.sort((a, b) => {
          const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[৳, ]/g, '')) || 0;
          const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[৳, ]/g, '')) || 0;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        cards.sort((a, b) => {
          const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[৳, ]/g, '')) || 0;
          const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[৳, ]/g, '')) || 0;
          return priceB - priceA;
        });
        break;
      case 'name-asc':
        cards.sort((a, b) => {
          const nameA = a.querySelector('h3').textContent.toLowerCase();
          const nameB = b.querySelector('h3').textContent.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        break;
      case 'name-desc':
        cards.sort((a, b) => {
          const nameA = a.querySelector('h3').textContent.toLowerCase();
          const nameB = b.querySelector('h3').textContent.toLowerCase();
          return nameB.localeCompare(nameA);
        });
        break;
      default:
        // Default order, do nothing or reload original order if you saved it
        return;
    }

    // Append sorted cards back to grid
    cards.forEach(card => grid.appendChild(card));
  });
});
document.querySelectorAll('.product-card button').forEach(button => {
  button.addEventListener('click', () => {
    const href = button.getAttribute('data-href') || button.getAttribute('onclick').match(/'(.*?)'/)[1];
    if (href) window.location.href = href;
  });
});
function updateCartCount() {
  const cart = loadCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartCountElem = document.getElementById('cart-count');
  const cartBadgeElem = document.getElementById('cart-badge');

  if (cartCountElem) {
    cartCountElem.textContent = count;
  }

  if (cartBadgeElem) {
    if (count > 0) {
      cartBadgeElem.textContent = count;
      cartBadgeElem.style.display = 'inline-block'; // Show badge
    } else {
      cartBadgeElem.style.display = 'none'; // Hide badge
    }
  }
}
<script>
  function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
  }
</script>
<script>
  // Sample cart logic
  const cartBadge = document.getElementById('cart-badge');
  const toggleCart = document.getElementById('toggle-cart');

  let cartCount = 0;

  // Simulate adding items to cart
  function addToCart() {
    cartCount++;
    cartBadge.textContent = cartCount;
    cartBadge.style.display = 'inline-block';
  }

  toggleCart.addEventListener('click', () => {
    alert("Cart clicked! Items: " + cartCount);
  });

  // Example: simulate adding an item after 3 seconds
  setTimeout(addToCart, 3000);
</script>
ul#menu li a:hover {
  color: #ffcc00;
}
