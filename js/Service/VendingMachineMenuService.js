import store from "../util/store/store.js";

export default class VendingMachineMenuService {
  constructor() {
    this.state = store.getCurrentTabState();
  }

  addPrice($price) {
    const state = store.getTabState();
    state[store.getCurrentTab()]["amount"] = $price;
    store.setTabState(state);
  }

  setState() {}

  calculateInput($price) {
    let 오백원갯수 = 0,
      백원갯수 = 0,
      오십원갯수 = 0,
      십원갯수 = 0;

    오백원갯수 = Math.floor($price / 500);
    if ($price % 500) {
      백원갯수 = Math.floor(($price % 500) / 100);
      if (($price % 500) % 100) {
        오십원갯수 = Math.floor((($price % 500) % 100) / 50);
        if ((($price % 500) % 100) % 50) {
          십원갯수 = Math.floor(((($price % 500) % 100) % 50) / 10);
        }
      }
    }

    return { 오백원갯수, 백원갯수, 오십원갯수, 십원갯수 };
  }

  addResult(result) {
    const state = store.getTabState();
    state[store.getCurrentTab()]["result"] = result;
    store.setTabState(state);
  }

  getCurrentTabState() {
    const currentTabState = store.getCurrentTabState();
    const price = currentTabState["amount"] || 0;
    const result = currentTabState["result"] || null;
  }
}
