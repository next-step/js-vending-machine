import AbstractObservable from "../util/observer/AbstractObservable.js";

import MainViewModel from "../Model/MainViewModel.js";
import ProductManageModel from "../Model/ProductManageModel.js";

import { getItem } from "../util/localstorage.js";
import { NOTIFY_KEY, LOCAL_STORAGE_PRODUCT_KEY } from "../util/constants.js";

class MainViewController extends AbstractObservable {
	constructor() {
		super();
		this.mainViewModel = MainViewModel;
		this.productManageModel = ProductManageModel;

		this.observers = [];
	}

	registerObserver(view) {
		this.observers.push(view);
	}

	notify(key, ...args) {
		this.observers.forEach((observer) => observer.update(key, ...args));
	}

	fetchProducts() {
		const existedProducts = new Map(getItem(LOCAL_STORAGE_PRODUCT_KEY));
		this.productManageModel.products = existedProducts;

		this.notify(NOTIFY_KEY.FETCH_PRODUCT, existedProducts);
	}

	handleChangeTab(tabNumber) {
		if (tabNumber === this.mainViewModel.currentTabNumber) return;

		this.mainViewModel.setCurrentTab(tabNumber);
		this.notify(NOTIFY_KEY.CHANGE_TAB, tabNumber);

		if (tabNumber === 1) {
			this.fetchProducts();
		}
	}
}

export default new MainViewController();
