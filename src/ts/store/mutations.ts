import { getItem, setItem } from '../utils/storage';

export default {
  loadInitialData(state: State) {
    state.products = getItem('products') ?? [];
    state.coins = getItem('coins');
  },
};
