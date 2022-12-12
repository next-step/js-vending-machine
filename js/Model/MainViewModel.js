class MainViewModel {
	#currentTabNumber;

	constructor() {
		this.#currentTabNumber = -1;
	}

	get currentTabNumber() {
		return this.#currentTabNumber;
	}

	setCurrentTab(tabNumber) {
		this.#currentTabNumber = tabNumber;
	}
}

export default new MainViewModel();
