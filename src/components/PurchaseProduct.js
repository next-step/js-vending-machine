export default function PurchaseProduct({ $target }) {
  this.state = {};
  this.$target = $target;

  this.render = () => {
    this.$target.innerHTML = 'ManageProducts';
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.init = () => {
    this.$target.innerHTML = `
      <section>
        <div class="purchase-container">
          <h3>금액 투입</h3>
          <form class="input-money-form">
            <input type="number" name="charge-amount" id="charge-input" />
            <input type="submit" id="charge-button" class="btn" value="투입 하기"/>
					</form>
          <p>투입한 금액: <span id="charge-amount">0</span>원</p>
        </div>
      <hr />
			<h3>구매할 수 있는 상품 현황</h3>
      <table class="product-inventory not-pressed">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody id="product-inventory-container">
          <tr>
            <td>사탕</td>
            <td>1,000</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
      <hr />
        <h3>잔돈</h3>
				<form>
					<input type="submit" class="btn" id="coin-return-button" value="반환하기"/>
				</form>
        <table class="cashbox-change pressed">
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
      </div>	
		</section>`;
  };

  this.init();
}
