function getStorageProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

function setStorageProducts(value) {
  localStorage.setItem('products', JSON.stringify(value));
}

export { getStorageProducts, setStorageProducts }