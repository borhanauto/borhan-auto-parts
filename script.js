function filterProducts() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;

  document.querySelectorAll(".product-card").forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const productCategory = card.getAttribute("data-category");

    const matchCategory = category === "all" || productCategory === category;
    const matchSearch = title.includes(search);

    card.style.display = (matchCategory && matchSearch) ? "flex" : "none";
  });
}
function filterProducts() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;

  document.querySelectorAll('.product-card').forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const productCategory = card.getAttribute('data-category');

    const matchesCategory = category === 'all' || productCategory === category;
    const matchesSearch = title.includes(search);

    card.style.display = (matchesCategory && matchesSearch) ? 'flex' : 'none';
  });
}
function filterProducts() {
  const category = document.getElementById('categoryFilter').value.toLowerCase();
  const searchText = document.getElementById('searchInput').value.toLowerCase();
  const products = document.querySelectorAll('.product-card');

  products.forEach(card => {
    const cardCategory = card.getAttribute('data-category').toLowerCase();
    const cardText = card.innerText.toLowerCase();

    const matchCategory = category === 'all' || cardCategory === category;
    const matchSearch = cardText.includes(searchText);

    if (matchCategory && matchSearch) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}
function toggleSearch() {
  document.getElementById('quickSearch').classList.toggle('hidden');
}
<div class="menu-dropdown">
  <button class="menu-toggle" onclick="toggleMenu()">☰ Brands</button>
  <div class="menu-content" id="brandMenu">
    <a href="bajaj.html">Bajaj</a>
    <a href="yamaha.html">Yamaha</a>
    <a href="hero.html">Hero</a>
    <a href="suzuki.html">Suzuki</a>
    <a href="honda.html">Honda</a>
  </div>
</div>
function toggleMenu() {
  const menu = document.getElementById("brandMenu");
  menu.classList.toggle("show");
}

// Optional: close if clicked outside
window.addEventListener("click", function (e) {
  const menu = document.getElementById("brandMenu");
  const button = document.querySelector(".menu-toggle");
  if (!button.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove("show");
  }
});
