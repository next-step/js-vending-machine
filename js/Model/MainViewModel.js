class MainViewModel {
	#currentTabNumber;

	constructor() {
		this.#currentTabNumber = -1;
	}

	setCurrentTab(tabNumber) {
		this.#currentTabNumber = tabNumber;
	}
}

export default new MainViewModel();
