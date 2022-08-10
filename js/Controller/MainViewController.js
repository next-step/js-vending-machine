import AbstractObservable from "../util/observer/AbstractObservable.js";

import MainViewModel from "../Model/MainViewModel.js";

import { NOTIFY_KEY } from "../util/constants.js";

class MainViewController extends AbstractObservable {
	constructor() {
		super();
		this.mainViewModel = MainViewModel;

		this.observers = [];
	}

	registerObserver(view) {
		this.observers.push(view);
	}

	notify(key, ...args) {
		this.observers.forEach((observer) => observer.update(key, ...args));
	}

	handleChangeTab(tabNumber) {
		this.mainViewModel.setCurrentTab(tabNumber);
		this.notify(NOTIFY_KEY.CHANGE_TAB, tabNumber, 2);
	}
}

export default new MainViewController();
