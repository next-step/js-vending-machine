import { ADD_PRODUCT, SET_MENU } from './actions.js';

import CreateAction from './createAction.js';

const setMenu = (menu) => CreateAction(SET_MENU, { menu });
const addProduct = (product) => CreateAction(ADD_PRODUCT, { product });

export { setMenu, addProduct };
