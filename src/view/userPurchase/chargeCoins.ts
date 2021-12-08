import View from '../abstract.js'

export default class ChargeCoins extends View {
  static #template = /* html */ `
    <fragment>
      <div class="purchase-container">
        <h3>투입하기</h3>
        <div class="vending-machine-wrapper margin-auto">
          <input type="number" name="charge-amount" id="charge-input" />
          <button id="charge-button">투입하기</button>
        </div>
        <p>투입 금액: <span id="charge-amount">0</span>원</p>
      </div>
    </fragment>
  `

  constructor() {
    super()
    this.render(ChargeCoins.#template)
  }
}

customElements.define('charge-coins', ChargeCoins)
