import { addProduct, setMenu } from './store/creator.js';

import store from './store/store.js';

const actionMap = {
  SET_MENU: (menu) => {
    store.dispatch(setMenu(menu));
  },
  ADD_PRODUCT: (product) => {
    store.dispatch(addProduct(product));
  },
};

export default actionMap;
