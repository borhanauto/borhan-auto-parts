
function toggleDescription(card) {
  document.querySelectorAll('.product-card').forEach(c => {
    if (c !== card) c.classList.remove('active');
  });
  card.classList.toggle('active');
}
