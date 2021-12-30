import { ACTIONS, ERROR_MESSAGES } from '../constants.js'
import { $ } from '../utils/selector.js'
import View from './View.js'

export default class ProductPurchase extends View {
  constructor(app, props) {
    super(app, props)
    this.render()
    this.bindEvent()
  }
  bindEvent = () => {
    this.$app.addEventListener('submit', (e) => {
      e.preventDefault()
      if (e.target.id !== 'product-purchase-form') return
      const formData = new FormData($('#product-purchase-form'))
      const purchase = parseInt(formData.get('purchase-amount'))

      if (purchase % 10 !== 0) {
        alert(ERROR_MESSAGES.INVALID_PURCHASE)
        return
      }
      this.props.setState({ type: ACTIONS.CHARGE_PURCHASE, payload: { purchase } })
    })

    this.$app.addEventListener('click', ({ target: { className, dataset } }) => {
      if (className === 'purchase-product-button') {
        this.props.setState({
          type: ACTIONS.BUY_PRODUCT,
          payload: { productName: dataset.product },
        })
      }
    })
  }

  template = () => {
    const { products, purchase } = this.props.getState()
    return `<h3>금액 투입</h3>
    <div class="purchase-container">
	  <div class="purchase-wrapper">
        <form id="product-purchase-form">
	      <input type="number" name="purchase-amount" id="purchase-input" min="10"/>
	      <button id="purchase-button">투입하기</button>
        </form>
	  </div>
	  <p>투입한 금액: <span id="purchase-amount">${purchase}</span>원</p>
    </div>
      <h3>구매할 수 있는 상품 현황</h3>
      <table class="product-inventory">
          <colgroup>
              <col style="width: 140px"/>
              <col style="width: 100px"/>
              <col style="width: 100px"/>
              <col style="width: 100px"/>
          </colgroup>
          <thead>
              <tr>
                  <th>상품명</th>
                  <th>가격</th>
                  <th>수량</th>
                  <th>구매</th>
              </tr>
          </thead>
          <tbody id="product-inventory-container">
            ${
              products.length !== 0
                ? products
                    .map(({ name, price, quantity }) => {
                      return `<tr>
                              <td>${name}</td>
                              <td>${price}</td>
                              <td>${quantity}</td>
                              <td><button class="purchase-product-button" data-product="${name}">구매하기</button></td>
                          </tr>`
                    })
                    .join('')
                : ''
            }
          </tbody>
      </table>

        <h3>잔돈</h3>
        <button id="coin-return-button">반환하기</button>
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
      `
  }
}
