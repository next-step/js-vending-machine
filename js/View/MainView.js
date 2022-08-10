import AbstractObserver from "../util/observer/AbstractObserver.js";

import MainViewController from "../Controller/MainViewController.js";

import { $ } from "../util/dom.js";

class MainView extends AbstractObserver {
	constructor(tabView) {
		super();
		this.tabView = tabView;
		this.$tabBtnWrapper = $("#tab-btn-wrapper");

		this.initObserver();
		this.initBindEvent();
	}

	initObserver() {
		this.mainViewController = MainViewController;
		this.mainViewController.registerObserver(this);
	}

	initBindEvent() {
		this.$tabBtnWrapper.addEventListener("click", this.onChangeTab);
	}

	onChangeTab = ({ target }) => {
		const tabBtn = target.closest("button");

		if (!tabBtn) return;

		if (!this.$tabBtnWrapper.contains(tabBtn)) return;

		const { dataset } = tabBtn;
		this.mainViewController.handleChangeTab(Number(dataset.tabNumber));
	};

	update(key, ...args) {}
}

export default MainView;
