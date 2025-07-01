let selectedProduct = '';
let amount = 0;
let transactions = [];

function selectProduct(name, price) {
  selectedProduct = name;
  amount = price;
  document.getElementById('selected-product').innerText = name;
  document.getElementById('amount').innerText = price;
  document.getElementById('confirmation-message').innerText = '';
}

function confirmPayment() {
  const trxid = document.getElementById('trxid').value.trim();
  const confirmation = document.getElementById('confirmation-message');
  const button = document.querySelector("button[onclick='confirmPayment()']");

  if (trxid.length < 6) {
    alert("Please enter a valid transaction ID");
    return;
  }

  button.disabled = true;
  confirmation.innerHTML = "<em>Processing...</em>";

  setTimeout(() => {
    transactions.push({ product: selectedProduct, amount, trxid });
    confirmation.innerText = "✅ Payment received. We will confirm shortly.";
    document.getElementById('trxid').value = '';
    button.disabled = false;
    console.log("Transactions:", transactions);
  }, 1000);
}

// 3D Mouse Tilt Effect
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});