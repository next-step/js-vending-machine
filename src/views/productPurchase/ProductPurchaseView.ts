import ProductPurchaseController from '../../controller/productPurchase/ProductPurchaseController'
import { $Root } from '../../routes/router'
import MoneyStore from '../../store/MoneyStore'
import ProductStore from '../../store/ProductStore'
import {
  PRODUCT_PURCHASE_RETURN_COIN_INVENTORY,
  PRODUCT_PURCHASE_PRODUCT_INPUT_CONTAINER,
  PRODUCT_PURCHASE_CHARGE_INPUT,
  PRODUCT_PURCHASE_CHARGE_BUTTON,
  PRODUCT_PURCHASE_CHARGE_AMOUNT,
  PRODUCT_PURCHASE_COIN_RETURN_BUTTON,
} from '../../utils/constants/element'
import {
  PURCHASE_PRODUCT_CHARGE_MONEY_INPUT_EMPTY,
  PURCHASE_PRODUCT_CHARGE_MONEY_INPUT_SPLIT_INVALID,
  PURCHASE_PRODUCT_CHARGE_MONEY_MINIMUM_INPUT_INVALID,
  PURCHASE_PRODUCT_PURCHASE_NO_MONEY,
  PURCHASE_PRODUCT_PURCHASE_PRODUCT_SOLD_OUT,
} from '../../utils/constants/errorMessage'
import { $ } from '../../utils/dom/selector'

const ProductPurchaseTemplate = `
  <div class="purchase-container">
    <h3>충전하기</h3>
    <div class="vending-machine-wrapper">
      <input type="number" name="charge-amount" id="charge-input" data-cy="charge-input" />
      <button id="charge-button" data-cy="charge-button">충전하기</button>
    </div>
    <p>충전 금액: <span id="charge-amount" data-cy="charge-amount">0</span>원</p>
    </div>

    <h3>구매할 수 있는 상품 현황</h3>
    <table class="product-inventory margin-auto">
      <colgroup>
        <col style="width: 140px" />
        <col style="width: 100px" />
        <col style="width: 100px" />
        <col style="width: 100px" />
      </colgroup>
      <thead><tr><th>상품명</th><th>가격</th><th>수량</th><th>구매</th></tr></thead>
      <tbody id="product-items-container" data-cy="product-items-container"></tbody>
    </table>
    
  <h3>잔돈</h3>
  <button id="coin-return-button" data-cy"coin-return-button">반환하기</button>
  <table class="cashbox-change">
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
    <tbody id="return-coin-inventory" data-cy="return-coin-inventory">
      <tr>
        <td>500원</td>
        <td></td>
      </tr>
      <tr>
        <td>100원</td>
        <td></td>
      </tr>
      <tr>
        <td>50원</td>
        <td></td>
      </tr>
      <tr>
        <td>10원</td>
        <td></td>
      </tr>
    </tbody>
  </table>
`

export default class ProductPurchaseView {
  controller: ProductPurchaseController
  $template: DocumentFragment

  $chargeInput: HTMLInputElement
  $chargeButton: HTMLButtonElement
  $chargeAmount: HTMLSpanElement
  $productInputContainer: HTMLTableSectionElement
  $returnCoinButton: HTMLButtonElement
  $coinInventory: HTMLTableSectionElement

  #productStore: ProductStore
  #moneyStore: MoneyStore

  constructor(productStore: ProductStore, moneyStore: MoneyStore) {
    this.controller = new ProductPurchaseController(productStore, moneyStore)
    this.#productStore = productStore
    this.#moneyStore = moneyStore
  }

  renderProductList() {
    const products = this.#productStore.getProducts()

    console.log(products)
    if (!this.$productInputContainer || !products.length) {
      return
    }

    this.$productInputContainer.innerHTML = ''

    products.forEach(({ name, price, quantity }) => {
      const row = this.$productInputContainer.insertRow(0)
      const nameCell = row.insertCell(0)
      const priceCell = row.insertCell(1)
      const quantityCell = row.insertCell(2)
      const purchaseCell = row.insertCell(3)

      nameCell.textContent = name
      priceCell.textContent = price.toLocaleString()
      quantityCell.textContent = quantity.toLocaleString()
      purchaseCell.innerHTML = `<button data-product="${name}">구매하기</button>`
    })
  }

  renderMoneyData() {
    this.$chargeAmount.textContent = this.#moneyStore
      .getUserMoney()
      .toLocaleString()
  }

  renderStoreData() {
    this.renderProductList()
    this.renderMoneyData()
  }

  render() {
    const $template = this.createTemplate()
    $Root.replaceChildren($template)
    this.selectDomElement()
    this.bindEvent()
    this.renderStoreData()
  }

  getMoney(): { money?: number; errorMessage?: string } {
    const money = Number(this.$chargeInput.value)

    if (this.$chargeInput.value === '') {
      return { errorMessage: PURCHASE_PRODUCT_CHARGE_MONEY_INPUT_EMPTY }
    }

    if (money < 10) {
      return {
        errorMessage: PURCHASE_PRODUCT_CHARGE_MONEY_MINIMUM_INPUT_INVALID,
      }
    }

    if (money % 10 !== 0) {
      return { errorMessage: PURCHASE_PRODUCT_CHARGE_MONEY_INPUT_SPLIT_INVALID }
    }

    return { money }
  }

  bindEvent() {
    this.$chargeButton.addEventListener('click', () => {
      const moenyOutput = this.getMoney()

      if (moenyOutput.errorMessage) {
        alert(moenyOutput.errorMessage)
        return
      }

      this.controller.dispatch({
        type: 'ADD_USER_MONEY',
        payload: { money: moenyOutput.money ?? 0 },
      })

      this.$chargeInput.value = ''
      this.renderMoneyData()
    })

    this.$productInputContainer.addEventListener('click', (event) => {
      const target = event.target

      if (!target) {
        return
      }
      if (target instanceof HTMLButtonElement) {
        const productName = target.dataset.product ?? ''
        const product = this.#productStore.getProduct({ name: productName })
        const money = this.#moneyStore.getUserMoney()

        if (!product) {
          return
        }

        if (product.quantity <= 0) {
          alert(PURCHASE_PRODUCT_PURCHASE_PRODUCT_SOLD_OUT)
          return
        }

        if (product.price > money) {
          alert(PURCHASE_PRODUCT_PURCHASE_NO_MONEY)
          return
        }

        this.controller.dispatch({
          type: 'PURCHASE_PRODUCT',
          payload: { name: productName },
        })

        this.renderMoneyData()
        this.renderProductList()
      }
    })

    this.$returnCoinButton.addEventListener('click', () => {
      const coin = this.#moneyStore.returnUserCoin()
      const coinArray = [
        coin['500원'],
        coin['100원'],
        coin['50원'],
        coin['10원'],
      ]

      this.renderStoreData()
      console.log(coin)
      console.log(this.$coinInventory)

      this.$coinInventory.querySelectorAll('td').forEach((element, index) => {
        if (index % 2 === 1) {
          element.textContent =
            coinArray[Math.floor(index / 2)].toLocaleString() + '개'
        }
      })
    })
  }

  createTemplate() {
    const $template = document
      .createRange()
      .createContextualFragment(ProductPurchaseTemplate)

    return $template
  }

  selectDomElement() {
    this.$chargeInput = $({
      selector: PRODUCT_PURCHASE_CHARGE_INPUT,
      target: this.$template,
    }) as HTMLInputElement

    this.$chargeButton = $({
      selector: PRODUCT_PURCHASE_CHARGE_BUTTON,
      target: this.$template,
    }) as HTMLButtonElement

    this.$chargeAmount = $({
      selector: PRODUCT_PURCHASE_CHARGE_AMOUNT,
      target: this.$template,
    }) as HTMLSpanElement

    this.$productInputContainer = $({
      selector: PRODUCT_PURCHASE_PRODUCT_INPUT_CONTAINER,
      target: this.$template,
    }) as HTMLTableSectionElement

    this.$returnCoinButton = $({
      selector: PRODUCT_PURCHASE_COIN_RETURN_BUTTON,
      target: this.$template,
    }) as HTMLButtonElement

    this.$coinInventory = $({
      selector: PRODUCT_PURCHASE_RETURN_COIN_INVENTORY,
      target: this.$template,
    }) as HTMLTableSectionElement
  }
}
