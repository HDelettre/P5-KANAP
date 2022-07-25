let params = new URLSearchParams(window.location.search);
const orderId = params.get("id");
document.getElementById('orderId').innerText = orderId;
localStorage.clear('Panier');