import { State } from '../../constants.js'
import Actions from '../../store/actions.js'
import el from '../../util/dom.js'
import lnKo from '../../util/lnKo.js'
import View from '../abstract.js'

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
  `

  watchState = ['charge'] as const

  $form
  $input
  $remains

  constructor() {
    super()
    const $content = el(ChargeCoins.#template)
    this.$form = $content.querySelector('form') as HTMLFormElement
    this.$input = this.$form.querySelector('input') as HTMLInputElement
    this.$remains = $content.querySelector('#charge-amount') as HTMLParagraphElement
    this.handlers = [['submit', this.onSubmit]]
    this.render($content)
  }

  onStoreUpdated({ charge }: State) {
    this.$remains.textContent = lnKo(charge)
    this.$form.reset()
    this.$input.focus()
  }

  onSubmit = (e: Event) => {
    e.preventDefault()
    this.dispatch(Actions.user_chargeCoins, this.$input.valueAsNumber)
  }
}

customElements.define('charge-coins', ChargeCoins)
