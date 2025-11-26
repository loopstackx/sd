document.getElementById('year').textContent = new Date().getFullYear();

function onSearch() {
  const q = document.getElementById('q').value.trim();
  if (!q) {
    alert('Type a product to search');
    return;
  }
  alert('Searching for: ' + q);
}

window.onload = function () {
  document.getElementById("featuredBtn").onclick = () => {
    console.log("Featured clicked");
  };

  document.getElementById("bestBtn").onclick = () => {
    console.log("Best Sellers clicked");
  };

  document.getElementById("brandBtn").onclick = () => {
    console.log("Brand Partners clicked");
  };
};
