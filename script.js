document.addEventListener("DOMContentLoaded", () => {
  console.log("Website Loaded: Borhan Auto Parts Centre");
});
document.querySelectorAll('.buy-button').forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    const productName = this.closest('.product-card').querySelector('h3').innerText;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart!`);
  });
});
