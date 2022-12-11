export default TEMPLATE = {
  CHARGING_MACHINE: /* html */ `
  <h3>자판기 돈통 충전하기</h3>
  <div class="vending-machine-wrapper">
    <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" autofocus />
    <button id="vending-machine-charge-button">충전하기</button>
  </div>
  <p>보유 금액: <span id="vending-machine-charge-amount">0</span>원</p>
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
  `,
  APPENDING_PRODUCT: /* html */ `
    <h3>상품 추가하기</h3>
    <div class="product-container">
      <input type="text" id="product-name-input" placeholder="상품명" />
      <input type="number" id="product-price-input" placeholder="가격" />
      <input type="number" id="product-quantity-input" placeholder="수량" />
      <button id="product-add-button">추가하기</button>
    </div>
    <table class="product-inventory">
      <colgroup>
        <col style="width: 140px" />
        <col style="width: 100px" />
        <col style="width: 100px" />
      </colgroup>
      <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
        </tr>
      </thead>
      <tbody id="product-inventory-container"></tbody>
    </table>
  `,
  CHARGING_MONEY: /* html */ `
  <div class="purchase-container">
    <h3>충전하기</h3>
    <div class="vending-machine-wrapper">
      <input type="number" name="charge-amount" id="charge-input" />
      <button id="charge-button">충전하기</button>
    </div>
    <p>충전 금액: <span id="charge-amount">0</span>원</p>
  </div>
  `,
  RETURN_CHANGES: /* html */ `
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
  `,
};
