const products = [
  { name: "Brake Pad", category: "brake", price: "৳350" },
  { name: "Engine Oil", category: "engine", price: "৳800" },
  { name: "Spark Plug", category: "electrical", price: "৳120" },
  { name: "Chain Sprocket", category: "transmission", price: "৳450" },
  { name: "Clutch Plate", category: "transmission", price: "৳600" },
  { name: "Air Filter", category: "air", price: "৳200" }
];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get('q')?.toLowerCase();

const container = document.getElementById('search-results');
container.innerHTML = `<h2>Results for: "${query}"</h2>`;

const matched = products.filter(p => p.name.toLowerCase().includes(query));

if (matched.length > 0) {
  matched.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="https://raw.githubusercontent.com/borhanauto/borhan-auto-parts/main/Photoroom-20250620_125134674.png" alt="${p.name}" width="150" height="150">
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p class="price">${p.price}</p>
        <a class="buy-button" href="https://wa.me/8801707659954?text=I want to buy ${p.name}" target="_blank">Buy Now</a>
      </div>`;
  });
} else {
  container.innerHTML += `<p>No matching products found.</p>`;
}
