import { CoinKeyValues, State } from '../../constants.js'
import Actions from '../../store/actions.js'
import el from '../../util/dom.js'
import lnKo from '../../util/lnKo.js'
import View from '../abstract.js'

export default class ChangeCoins extends View {
  static #template = /* html */ `
    <fragment>
      <h3>잔돈</h3>
      <button id="coin-return-button">반환하기</button>
      <table class="cashbox-change margin-auto">
        <thead><tr><th>동전</th><th>개수</th></tr></thead>
        <tbody>
          ${CoinKeyValues.map(
            ([, val]) => `
              <tr>
                <td>${val}원</td>
                <td><span id="coin-${val}-quantity"></span>개</td>
              </tr>`,
          ).join('')}
        </tbody>
      </table>
    </fragment>
  `

  watchState = ['changeCoins'] as const

  $button
  $coins

  constructor() {
    super()
    const $content = el(ChangeCoins.#template)
    this.$button = $content.querySelector('#coin-return-button')
    this.$coins = CoinKeyValues.map(([, val]) => $content.querySelector(`#coin-${val}-quantity`)) as HTMLSpanElement[]
    this.handlers = [['click', this.onClickReturn]]

    this.render($content)
  }

  onStoreUpdated({ changeCoins }: State) {
    CoinKeyValues.forEach(([key], i) => {
      this.$coins[i].textContent = lnKo(changeCoins[key])
    })
  }

  onClickReturn = (e: Event) => {
    const $tg = e.target as HTMLElement
    if ($tg?.id !== 'coin-return-button') return
    this.dispatch(Actions.user_returnCoins)
  }
}

customElements.define('change-coins', ChangeCoins)
