import View from './abstract.js';
import el from '../util/dom.js';
export default class Main extends View {
    static #template = /* html */ `
    <fragment>
      <h1>🥤 자판기 미션</h1>
      <div id="gnb" class="margin-auto">
        <button data-route-target="${"productInventory" /* productInventory */}">상품 관리</button>
        <button data-route-target="${"machineCharge" /* machineCharge */}">잔돈 충전</button>
        <button data-route-target="${"userPurchase" /* userPurchase */}">상품 구매</button>
      </div>
      <div id="page"></div>
    </fragment>
  `;
    static #components = {
        ["productInventory" /* productInventory */]: '<product-inventory></product-inventory>',
        ["machineCharge" /* machineCharge */]: '<machine-charge></machine-charge>',
        ["userPurchase" /* userPurchase */]: '<user-purchase></user-purchase>',
    };
    watchState = ['route'];
    $gnb;
    $buttons;
    $page;
    constructor() {
        super();
        const $content = el(Main.#template);
        this.$gnb = $content.querySelector('#gnb');
        this.$page = $content.querySelector('#page');
        this.$buttons = Array.from(this.$gnb.querySelectorAll('button'));
        this.$gnb.addEventListener('click', this.routeChange);
        this.render($content);
    }
    onStoreUpdated({ route }) {
        el(this.$page, [Main.#components[route]]);
        this.$buttons.forEach($btn => {
            $btn.classList.toggle('current', $btn.dataset.routeTarget === route);
        });
    }
    routeChange = (e) => {
        const $tg = e.target;
        if ($tg?.localName !== 'button')
            return;
        this.dispatch('route_change', $tg.dataset.routeTarget || '');
    };
}
customElements.define('vending-machine-app', Main);
//# sourceMappingURL=main.js.map