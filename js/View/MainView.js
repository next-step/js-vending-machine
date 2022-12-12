import AbstractObserver from "../util/observer/AbstractObserver.js";

import MainViewController from "../Controller/MainViewController.js";
import ProductManageView from "./Tabs/ProductManageView.js";

import { $ } from "../util/dom.js";
import { NOTIFY_KEY } from "../util/constants.js";

class MainView extends AbstractObserver {
	constructor($target) {
		super();
		this.tabView = { 1: new ProductManageView($target) };
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

	render(tabNumber) {
		this.tabView[tabNumber].render();
	}

	update(key, ...args) {
		switch (key) {
			case NOTIFY_KEY.CHANGE_TAB: {
				this.render(...args);
			}
		}
	}
}

export default MainView;
