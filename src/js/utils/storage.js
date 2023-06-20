function getStorageProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

function setStorageProducts(value) {
  localStorage.setItem('products', JSON.stringify(value));
}

function getStorageCoins() {
  return JSON.parse(localStorage.getItem('vendingMachineCoin')) || {};
}

function setStorageCoins(value) {
  localStorage.setItem('vendingMachineCoin', JSON.stringify(value));
}

function getStorageCurrentMenu() {
  return JSON.parse(localStorage.getItem('currentMenu'));
}

function setStorageCurrentMenu(value) {
  localStorage.setItem('currentMenu', JSON.stringify(value));
}

function getStorageInsertCoin() {
  return JSON.parse(localStorage.getItem('insertedCoin')) || 0;
}

function setStorageInsertCoin(value) {
  localStorage.setItem('insertedCoin', JSON.stringify(value));
}

function getStorageChanges() {
  return JSON.parse(localStorage.getItem('changes')) || {};
}

function setStorageChanges(value) {
  localStorage.setItem('changes', JSON.stringify(value));
}

export {
  getStorageProducts,
  setStorageProducts,
  getStorageCoins,
  setStorageCoins,
  getStorageCurrentMenu,
  setStorageCurrentMenu,
  getStorageInsertCoin,
  setStorageInsertCoin,
  getStorageChanges,
  setStorageChanges
};
