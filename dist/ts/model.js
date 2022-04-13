import { PRODUCT_CONFIG } from './utils/config.js';
import { ERROR } from './utils/message.js';
import ValidationError from './utils/errorValidation.js';
export var Page;
(function (Page) {
    Page["ProductManagement"] = "productContainerView";
})(Page || (Page = {}));
export const state = {
    currentView: Page.ProductManagement,
    products: []
};
export const loadProduct = function () {
    const storage = localStorage.getItem('products');
    if (storage)
        state.products = JSON.parse(storage);
    return state.products;
};
export const addProduct = function (newProduct) {
    if (newProduct.price < PRODUCT_CONFIG.MIN_PRICE)
        throw new ValidationError(ERROR.LESS_THAN_MIN_PRICE);
    if (newProduct.quantity < PRODUCT_CONFIG.MIN_QUANTITY)
        throw new ValidationError(ERROR.LESS_THAN_MIN_QUANTITY);
    if (newProduct.price % PRODUCT_CONFIG.SHOULD_BE_DIVIDED !== 0)
        throw new ValidationError(ERROR.NOT_DIVIDED_PRICE);
    const products = state.products.filter(product => product.name !== newProduct.name);
    state.products = [...products, newProduct];
    state.products.sort(function (a, b) {
        if (a.name < b.name)
            return 1;
        if (a.name > b.name)
            return -1;
        if (a.name === b.name) {
            if (a.price < b.price)
                return 1;
            if (a.price > b.price)
                return 1;
            if (a.price === b.price) {
                if (a.quantity < b.quantity)
                    return -1;
                if (a.quantity > b.quantity)
                    return 1;
                return 0;
            }
        }
        throw new Error('정렬 할 수 없습니다.');
    });
    localStorage.setItem('products', JSON.stringify(state.products));
    return state.products;
};
const init = function () {
    loadProduct();
};
init();
//# sourceMappingURL=model.js.map