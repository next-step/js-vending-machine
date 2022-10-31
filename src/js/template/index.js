import { COINS, MIN_PRODUCT } from '../constants/index.js';

const productManagerMenuTemplate = `
    <h3>상품 추가하기</h3>
    <form class="product-container" id="product-container-form">
      <input name="product-input" type="text" id="product-name-input" placeholder="상품명" autofocus required/>
      <input name="product-input" type="number" id="product-price-input" placeholder="가격" min=${MIN_PRODUCT.PRICE} required/>
      <input name="product-input" type="number" id="product-quantity-input" placeholder="수량" min=${MIN_PRODUCT.COUNT} required/>
      <button type="submit" id="product-add-button">추가하기</button>
    </form>
    <table class="product-inventory">
    <h3>상품 현황</h3>
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
    `;

const vendingMachineManageMenuTemplate = `
    <h3>자판기 돈통 충전하기</h3>
    <div class="vending-machine-wrapper">
      <form id="vending-machine-form">
        <input name="vending-machine-charge-amount" type="number" id="vending-machine-charge-input" min=${MIN_PRODUCT.PRICE} autofocus placeholder="자판기가 보유할 금액"/>
        <button type="submit" id="vending-machine-charge-button">충전하기</button>
      </form>
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
          <td id="vending-machine-coin-500-quantity" data-price="500">0</td>
        </tr>
        <tr>
          <td>100원</td>
          <td id="vending-machine-coin-100-quantity" data-price="100">0</td>
        </tr>
        <tr>
          <td>50원</td>
          <td id="vending-machine-coin-50-quantity" data-price="50">0</td>
        </tr>
        <tr>
          <td>10원</td>
          <td id="vending-machine-coin-10-quantity" data-price="10">0</td>
        </tr>
      </tbody>
    </table>
    `;

const generateProductInventoryTemplate = (name, value) => `
    <tr>
      <td>${name}</td>
      <td>${value.price}</td>
      <td>${value.count}</td>
    </tr>
    `;

const generateProductPurchaseTemplate = (name, value) => {
  const isDisabledButton = value.count === 0;
  return `
    <tr>
      <td>${name}</td>
      <td>${value.price}</td>
      <td>${value.count}</td>
      <td><button name=${name} class="purchase-product-button" ${isDisabledButton && 'disabled'}>구매하기</button></td>
    </tr>
    `;
};

const generateCashBoxChangeTemplate = remains => `
    <tr>
        <td>500원</td>
        <td id="coin-500-remains">${remains[COINS.FIVE_HUNDRED]}</td>
    </tr>
    <tr>
        <td>100원</td>
        <td id="coin-100-remains">${remains[COINS.ONE_HUNDRED]}</td>
    </tr>
    <tr>
        <td>50원</td>
        <td id="coin-50-remains">${remains[COINS.FIFTY]}</td>
    </tr>
    <tr>
        <td>10원</td>
        <td id="coin-10-remains">${remains[COINS.TEN]}</td>
    </tr>
    `;

const productPurchaseMenuTemplate = (productMenuTemplate, remains) => `<h3>금액 투입</h3>
    <div class="purchase-container">
	  <div class="purchase-wrapper">
        <form id="product-purchase-form">
	      <input type="number" name="purchase-amount" id="purchase-input" min="10" autofocus/>
	      <button id="purchase-button">투입하기</button>
        </form>
	  </div>
	  <p>투입한 금액: <span id="purchase-amount">0</span>원</p>
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
             ${productMenuTemplate}
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
        	<tbody id="cashbox-table">
        	  ${remains}
        	</tbody>
        </table>
      `;

export {
  productManagerMenuTemplate,
  vendingMachineManageMenuTemplate,
  generateProductInventoryTemplate,
  generateProductPurchaseTemplate,
  generateCashBoxChangeTemplate,
  productPurchaseMenuTemplate,
};
