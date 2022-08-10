import AbstractObservable from "../util/observer/AbstractObservable.js";

import ProductManageModel from "../Model/ProductManageModel.js";

import { NOTIFY_KEY } from "../util/constants.js";

class ProductManageController extends AbstractObservable {
	constructor() {
		super();
		this.observers = [];

		this.productManageModel = ProductManageModel;
	}

	registerObserver(view) {
		this.observers.push(view);
	}

	notify(key, ...args) {
		this.observers.forEach((observer) => observer.update(key, ...args));
	}

	handleAddProduct(productInfo) {
		this.productManageModel.addProdcut(productInfo);
		this.notify(NOTIFY_KEY.ADD_PRODUCT, this.productManageModel.products);
	}
}

export default new ProductManageController();
