import store from '../store/index.js';
import { changeView } from '../store/actions.js';
import { $ } from "../util/index.js";
import View from "./View.js"

export default class Navigation extends View {
  activeClassName;
  init() {
    this.activeClassName = "on";
    this.on("click", this.setCurrentTab.bind(this))
  }
  setCurrentTab({ target }) {
    if (target.type === "button" && !target.classList.contains(this.activeClassName)) {
      store.dispatch(changeView({
        currentMachineView: target.dataset.page
      }))
    }
  }
  render() {
    /* html */
    return `
      <div class="nav">
        <button id="product-manage-menu" type="button" data-page="product-manage">상품 관리</button>
        <button id="vending-machine-manage-menu" type="button" data-page="charge-amount-manage">잔돈충전</button>
        <button id="product-purchase-menu" type="button" data-page="product-purchase">상품 구매</button>
      </div>
    `;
  }

  static get observedAttributes(){
    return ['data-tab'];
  }

  attributeChangedCallback(attName, oldValue, newValue){
    if (attName === "data-tab" && oldValue !== newValue) {
      const oldElem = $(`button[data-page="${oldValue}"]`);
      const newElem = $(`button[data-page="${newValue}"]`);

      if (!oldElem && !newElem) return;
      if(oldElem) oldElem.classList.remove(this.activeClassName);
      newElem.classList.add(this.activeClassName);
    }
  }
}  

customElements.define("nav-tab", Navigation);
