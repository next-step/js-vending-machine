import ChargeMoneyController from '../../controller/chargeMoney/chargeMoneyController'
import ProductManageController from '../../controller/productManage/productManageController'
import { $Root } from '../../routes/router'
import MoneyStore from '../../store/MoneyStore'
import {
  VENDING_MACHINE_CHARGE_BUTTON,
  VENDING_MACHINE_CHARGE_INPUT,
  VENDING_MACHINE_COIN_INVENTORY,
} from '../../utils/constants/element'
import {
  PRODUCT_ADD_INPUT_INVALID,
  PRODUCT_ADD_PRICE_INVALID,
  PRODUCT_ADD_QUANTITY_INVALID,
} from '../../utils/constants/errorMessage'
import { $ } from '../../utils/dom/selector'

const ChargeMoneyTemplate = `
  <h3>자판기 돈통 충전하기</h3>
  <div class="vending-machine-wrapper">
    <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" data-cy="vending-machine-charge-input" autofocus />
    <button id="vending-machine-charge-button"  data-cy="vending-machine-charge-button">충전하기</button>
  </div>
  <p>보유 금액: <span id="vending-machine-charge-amount" data-cy="vending-money-inventory">0</span>원</p>
  <h3>동전 보유 현황</h3>
  <table class="cashbox-remaining">
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
    <tbody data-cy="vending-coin-inventory" id="vending-coin-inventory">
      <tr>
        <td>500원</td>
        <td id="vending-machine-coin-500-quantity"></td>
      </tr>
      <tr>
        <td>100원</td>
        <td id="vending-machine-coin-100-quantity"></td>
      </tr>
      <tr>
        <td>50원</td>
        <td id="vending-machine-coin-50-quantity"></td>
      </tr>
      <tr>
        <td>10원</td>
        <td id="vending-machine-coin-10-quantity"></td>
      </tr>
    </tbody>
  </table>
`

export default class ChargeMoneyView {
  controller: ChargeMoneyController
  $template: DocumentFragment
  $addButton: HTMLElement
  $vendingMoneyAddInput: HTMLInputElement

  #store: MoneyStore

  constructor(moneyStore: MoneyStore) {
    this.controller = new ChargeMoneyController(moneyStore)
    this.#store = moneyStore
  }

  onMoneyAddButtonClick() {
    this.$addButton.addEventListener('click', () => {
      const money = Number(this.$vendingMoneyAddInput.value ?? 0)

      if (this.$vendingMoneyAddInput.value === '') {
        alert('금액을 입력해주세요.')
        this.resetVendingMoneyInput()
      }

      if (money < 100) {
        alert('금액을 100원 이상 입력해주세요.')
        this.resetVendingMoneyInput()
        return
      }

      if (money % 10 !== 0) {
        alert('금액을 10원 단위로 나누어 떨어져야 합니다.')
        this.resetVendingMoneyInput()
        return
      }

      this.controller.dispatch({
        type: 'CHARGE_MONEY',
        payload: { money },
      })

      this.resetVendingMoneyInput()
      this.renderCoin()
    })
  }

  resetVendingMoneyInput() {
    this.$vendingMoneyAddInput.value = ''
    this.$vendingMoneyAddInput.focus()
  }

  renderCoin() {
    const coin = this.#store.getVendingMoneyCoin()

    const $inventory = $({
      selector: VENDING_MACHINE_COIN_INVENTORY,
    }) as HTMLTableSectionElement

    $inventory.innerHTML = ''

    console.log(coin)
    Object.keys(coin).forEach((coinKey, index) => {
      const key = coinKey as keyof typeof coin
      const row = $inventory.insertRow(index)
      const coinUnit = row.insertCell(0)
      const count = row.insertCell(1)

      coinUnit.textContent = key

      count.textContent = (coin[key] ?? 0).toLocaleString()
    })
  }

  render() {
    const $template = this.createTemplate()
    $Root.replaceChildren($template)
    this.selectDomElement()
    this.bindEvent()
    this.renderCoin()
  }

  bindEvent() {
    this.onMoneyAddButtonClick()
  }

  createTemplate() {
    const $template = document
      .createRange()
      .createContextualFragment(ChargeMoneyTemplate)

    return $template
  }

  selectDomElement() {
    this.$addButton = $({
      selector: VENDING_MACHINE_CHARGE_BUTTON,
      target: this.$template,
    }) as HTMLInputElement
    this.$vendingMoneyAddInput = $({
      selector: VENDING_MACHINE_CHARGE_INPUT,
      target: this.$template,
    }) as HTMLInputElement
  }
}
