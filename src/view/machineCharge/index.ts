import View from '../abstract.js'
import Actions from '../../store/actions.js'
import { CoinKeyValues, State } from '../../constants.js'
import el from '../../util/dom.js'
import { getTotalFromCoins } from '../../service/coinCalculator.js'
import lnKo from '../../util/lnKo.js'

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
        <thead><tr><th>동전</th><th>개수</th></tr></thead>
        <tbody>
          ${CoinKeyValues.map(
            ([, val]) => `<tr>
              <td>${val}원</td>
              <td><span id="vending-machine-coin-${val}-quantity"></span>개</td>
            </tr>`,
          ).join('')}
        </tbody>
      </table>
    </fragment>
  `

  watchState = ['ownedCoins'] as const

  $form
  $input
  $total
  $coins

  constructor() {
    super()
    const $content = el(MachineCharge.#template)
    this.$form = $content.querySelector('form') as HTMLFormElement
    this.$input = this.$form.querySelector('input') as HTMLInputElement
    this.$total = $content.querySelector('#vending-machine-charge-amount') as HTMLParagraphElement
    this.$coins = CoinKeyValues.map(([, val]) =>
      $content.querySelector(`#vending-machine-coin-${val}-quantity`),
    ) as HTMLSpanElement[]
    this.handlers = [['submit', this.onSubmit]]
    this.render($content)
  }

  onStoreUpdated({ ownedCoins }: State) {
    if (ownedCoins) this.$total.textContent = lnKo(getTotalFromCoins(ownedCoins))
    CoinKeyValues.forEach(([key], i) => {
      this.$coins[i].textContent = lnKo(ownedCoins[key])
    })
    this.$form.reset()
    this.$input.focus()
  }

  onSubmit = (e: Event) => {
    e.preventDefault()
    this.dispatch(Actions.machine_saveCoins, this.$input.valueAsNumber)
  }
}

customElements.define('machine-charge', MachineCharge)
