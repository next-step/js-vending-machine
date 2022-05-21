import { getItem, setItem } from '../utils/storage';

export default {
  loadInitialData(state: State) {
    state.products = getItem('products') ?? state.products;
    state.coins = getItem('coins') ?? state.coins;
    state.inputPrice = getItem('inputPrice') ?? state.inputPrice;
  },

  setInitialData(state: State) {
    setItem('products', state.products);
    setItem('coins', state.coins);
    setItem('inputPrice', state.inputPrice);
  },

  sortProduct(state: State) {
    state.products = Array.from(<Array<Product>>state.products).sort((a: Product, b: Product) => {
      return a.name.localeCompare(b.name) || a.price - b.price || b.quantity - a.quantity;
    });
  },

  addProduct(state: State, newProduct: Product) {
    const products = state.products.filter(product => product.name !== newProduct.name);
    state.products = [...products, newProduct];

    setItem('products', state.products);
  },

  saveProducts(state: State) {
    setItem('products', state.products);
  },

  addCoin(state: State, selectedCoinKey: CoinKey) {
    state.coins[selectedCoinKey].count += 1;
  },

  saveCoins(state: State) {
    setItem('coins', state.coins);
  },

  increaseInputPrice(state: State, inputPrice: number) {
    state.inputPrice += inputPrice;
  },

  saveInputPrice(state: State) {
    setItem('inputPrice', state.inputPrice);
  },

  decreaseProductQuantity(_state: State, product: Product) {
    product.quantity -= 1;
  },

  decreaseInputPrice(state: State, productPrice: number) {
    state.inputPrice -= productPrice;
  },
};
