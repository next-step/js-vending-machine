function getStorageProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

function setStorageProducts(value) {
  localStorage.setItem('products', JSON.stringify(value));
}

function getStorageCoins() {
  return JSON.parse(localStorage.getItem('coins')) || {};
}

function setStorageCoins(value) {
  localStorage.setItem('coins', JSON.stringify(value));
}

function getStorageCurrentMenu() {
  return JSON.parse(localStorage.getItem('currentMenu'));
}

function setStorageCurrentMenu(value) {
  localStorage.setItem('currentMenu', JSON.stringify(value));
}

export { getStorageProducts, setStorageProducts, getStorageCoins, setStorageCoins, getStorageCurrentMenu, setStorageCurrentMenu };
