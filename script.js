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
