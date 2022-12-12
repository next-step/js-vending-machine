import { LOCAL_STORAGE_PRODUCT_KEY } from "../util/constants.js";

import { addItem } from "../../js/util/localstorage.js";

class ProductManageModel {
	#products;

	constructor() {
		this.#products = new Map();
	}

	get products() {
		return this.#products;
	}

	set products(products) {
		this.#products = products;
	}

	addProduct({ productName, productPrice, productQuantity }) {
		this.products.set(productName, { productPrice, productQuantity });
		addItem(LOCAL_STORAGE_PRODUCT_KEY, Array.from(this.#products));
	}
}

export default new ProductManageModel();
