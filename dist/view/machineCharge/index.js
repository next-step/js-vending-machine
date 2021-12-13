import View from '../abstract.js';
import el from '../../util/dom.js';
export default class MachineCharge extends View {
    static #template = /* html */ `
    <fragment>
      <h3>자판기 동전 보충</h3>
      <form class="vending-machine-wrapper margin-auto">
        <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" min="10" step="10" required autofocus />
        <button type="submit" id="vending-machine-charge-button">보충하기</button>
      </form>
      <p>보유 금액: <span id="vending-machine-charge-amount">0</span>원</p>
      <h3>동전 보유 현황</h3>
      <table class="cashbox-remaining margin-auto">
        <thead>
          <tr><th>동전</th><th>개수</th></tr>
        </thead>
        <tbody>
          <tr><td>500원</td><td id="vending-machine-coin-500-quantity"></td></tr>
          <tr><td>100원</td><td id="vending-machine-coin-100-quantity"></td></tr>
          <tr><td>50원</td><td id="vending-machine-coin-50-quantity"></td></tr>
          <tr><td>10원</td><td id="vending-machine-coin-10-quantity"></td></tr>
        </tbody>
      </table>
    </fragment>
  `;
    $form;
    $input;
    $total;
    $q500;
    $q100;
    $q50;
    $q10;
    constructor() {
        super();
        const $content = el(MachineCharge.#template);
        this.$form = $content.querySelector('form');
        this.$input = this.$form.querySelector('input');
        this.$total = $content.querySelector('#vending-machine-charge-amount');
        this.$q500 = $content.querySelector('#vending-machine-coin-500-quantity');
        this.$q100 = $content.querySelector('#vending-machine-coin-100-quantity');
        this.$q50 = $content.querySelector('#vending-machine-coin-50-quantity');
        this.$q10 = $content.querySelector('#vending-machine-coin-10-quantity');
        this.$form.addEventListener('submit', this.onSubmit);
        this.render($content);
    }
    watch({ coins }) {
        return { coins };
    }
    onStoreUpdated({ coins }) {
        this.$total.textContent = coins.total + '';
        this.$q500.textContent = coins.q500 + '';
        this.$q100.textContent = coins.q100 + '';
        this.$q50.textContent = coins.q50 + '';
        this.$q10.textContent = coins.q10 + '';
        this.$form.reset();
        this.$input.focus();
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.dispatch("machine_saveCoins" /* machine_saveCoins */, {
            money: this.$input.valueAsNumber,
        });
    };
}
customElements.define('machine-charge', MachineCharge);
//# sourceMappingURL=index.js.map