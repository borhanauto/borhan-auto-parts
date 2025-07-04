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
<script>
function toggleMenu() {
  const menu = document.querySelector('.menu-dropdown');
  menu.classList.toggle('show');
}

// Close dropdown when clicking outside
window.addEventListener('click', function(e) {
  const menu = document.querySelector('.menu-dropdown');
  if (!menu.contains(e.target)) {
    menu.classList.remove('show');
  }
});
</script>
function toggleMenu(event) {
  event.stopPropagation();
  menu.classList.toggle('show');
}