export function getLocalStorageProducts() {
  if (!window.localStorage.getItem('products')) {
    return [];
  }

  return JSON.parse(window.localStorage.getItem('products'));
}

export function setLocalStorageProducts(products) {
  window.localStorage.setItem('products', JSON.stringify(products));
}
