import { CoinKeyValues, State } from '../../constants.js'
import Actions from '../../store/actions.js'
import el from '../../util/dom.js'
import View from '../abstract.js'

export default class ChangeCoins extends View {
  static #template = /* html */ `
    <fragment>
      <h3>잔돈</h3>
      <button id="coin-return-button">반환하기</button>
      <table class="cashbox-change margin-auto">
        <colgroup>
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td id="coin-500-quantity"></td>
          </tr>
          <tr>
            <td>100원</td>
            <td id="coin-100-quantity"></td>
          </tr>
          <tr>
            <td>50원</td>
            <td id="coin-50-quantity"></td>
          </tr>
          <tr>
            <td>10원</td>
            <td id="coin-10-quantity"></td>
          </tr>
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
    this.$coins = {
      q500: $content.querySelector('#coin-500-quantity'),
      q100: $content.querySelector('#coin-100-quantity'),
      q50: $content.querySelector('#coin-50-quantity'),
      q10: $content.querySelector('#coin-10-quantity'),
    }
    this.handlers = [['click', this.onClickReturn]]

    this.render($content)
  }

  onStoreUpdated({ changeCoins }: State) {
    CoinKeyValues.forEach(([key]) => {
      const $el = this.$coins[key] as HTMLElement
      if ($el) {
        console.log(key, $el, changeCoins[key], changeCoins)
        $el.textContent = changeCoins[key].toLocaleString('ko-KR')
      }
    })
  }

  onClickReturn = (e: Event) => {
    const $tg = e.target as HTMLElement
    if ($tg?.id !== 'coin-return-button') return
    this.dispatch(Actions.user_returnCoins)
  }
}

customElements.define('change-coins', ChangeCoins)
