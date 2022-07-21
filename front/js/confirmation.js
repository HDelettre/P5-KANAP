let params = new URLSearchParams(window.location.search);
const orderId = params.get("id");
console.log(localStorage.getItem('orderId'));
document.getElementById('orderId').innerText = orderId;
localStorage.clear('Panier');