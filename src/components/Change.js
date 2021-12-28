import { $ } from '../utils/selector.js'
import View from './View.js'

export default class Change extends View{
  constructor(app, props) {
    super(app, props)
    this.render()
    this.bindEvent()
  }
  render = () => {
    this.$app.innerHTML = this.template()
  }
  bindEvent = () => {
    this.$app.addEventListener('submit', (e) => {
      e.preventDefault()
    })
  }

  template = () => {
    return `<div class="purchase-container">
      <h3>충전하기</h3>
      <div class="vending-machine-wrapper">
        <form id="change-charge-form">
          <input type="number" name="charge-amount" id="charge-input" />
          <button id="charge-button">충전하기</button>
        </form>
      </div>
      <p>충전 금액: <span id="charge-amount">0</span>원</p>
  </div>`
  }
}
