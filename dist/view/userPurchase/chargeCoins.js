import el from '../../util/dom.js';
import lnKo from '../../util/lnKo.js';
import View from '../abstract.js';
export default class ChargeCoins extends View {
    static #template = /* html */ `
    <fragment>
      <div class="purchase-container">
        <h3>금액 투입</h3>
        <form class="vending-machine-wrapper margin-auto">
          <input type="number" name="charge-amount" id="charge-input" required min="100" />
          <button type="submit" id="charge-button">투입하기</button>
        </form>
        <p>잔액: <span id="charge-amount">0</span>원</p>
      </div>
    </fragment>
  `;
    watchState = ['charge'];
    $form;
    $input;
    $remains;
    constructor() {
        super();
        const $content = el(ChargeCoins.#template);
        this.$form = $content.querySelector('form');
        this.$input = this.$form.querySelector('input');
        this.$remains = $content.querySelector('#charge-amount');
        this.handlers = [['submit', this.onSubmit]];
        this.render($content);
    }
    onStoreUpdated({ charge }) {
        this.$remains.textContent = lnKo(charge);
        this.$form.reset();
        this.$input.focus();
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.dispatch("user_chargeCoins" /* user_chargeCoins */, this.$input.valueAsNumber);
    };
}
customElements.define('charge-coins', ChargeCoins);
//# sourceMappingURL=chargeCoins.js.map