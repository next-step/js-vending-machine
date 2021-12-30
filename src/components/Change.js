import { ACTIONS } from '../constants.js'
import { $ } from '../utils/selector.js'
import View from './View.js'

export default class Change extends View {
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
      if (e.target.id !== 'change-charge-form') return

      const formData = new FormData($('#change-charge-form'))
      const change = parseInt(formData.get('change'))

      if (change % 10 !== 0) {
        alert(ERROR_MESSAGES.INVALID_CHANGE)
        return
      }
      this.props.setState({ type: ACTIONS.UPDATE_CHANGE, payload: { change } })

    })
  }

  template = () => {
    const { coins, money } = this.props.getState()
    return `<div class="purchase-container">
      <h3>충전하기</h3>
      <div class="vending-machine-wrapper">
        <form id="change-charge-form">
          <input type="number" name="change" id="charge-input" min="100" required/>
          <button id="charge-button">충전하기</button>
        </form>
      </div>
      <p>충전 금액: <span id="charge-amount">${money}</span>원</p>
  </div>
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
	<tbody>
		<tr>
			<td>500원</td>
			<td id="vending-machine-coin-500-quantity">${coins[500]}</td>
		</tr>
		<tr>
			<td>100원</td>
			<td id="vending-machine-coin-100-quantity">${coins[100]}</td>
		</tr>
		<tr>
			<td>50원</td>
			<td id="vending-machine-coin-50-quantity">${coins[50]}</td>
		</tr>
		<tr>
			<td>10원</td>
			<td id="vending-machine-coin-10-quantity">${coins[10]}</td>
		</tr>
	</tbody>
</table>
  `
  }
}
