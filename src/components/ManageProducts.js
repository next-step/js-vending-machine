export default function ManageProducts({ $target }) {
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
			<div class="container not-pressed">
      <h3>상품 추가하기</h3>
      <div class="product-container">
        <input type="text" id="product-name-input" placeholder="상품명" />
        <input type="number" id="product-price-input" placeholder="가격" />
        <input type="number" id="product-quantity-input" placeholder="수량" />
        <button class="btn" id="product-add-button">추가하기</button>
      </div>
      <hr />
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
    </div>`;
  };

  this.init();
}
