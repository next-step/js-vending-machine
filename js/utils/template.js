import { $, SELECTOR } from './selector.js';

export const renderProductManage = () => {
  const template = `
    <h2>상품 추가하기</h2>
    <form id="product-form">
      <input type="text" name="product-name" id="product-name-input" placeholder="상품명" />
      <input type="number" name="product-price" id="product-price-input" placeholder="가격" />
      <input type="number" name="product-quantity" id="product-quantity-input" placeholder="수량" />
      <button type="submit" id="product-add-button">추가하기</button>
    </form>
    <h2>상품 현황</h2>
    <section class="product-list">
      <table>
        <thead>
          <tr>
            <td>상품명</td>
            <td>가격</td>
            <td>수량</td>
          </tr>
        </thead>
      </table>
    </section>  
  `;
  $(SELECTOR.APP).insertAdjacentHTML('afterbegin', template);
};

export const renderVendingMachineManage = () => {
  const template = `
    <h2>자판기 동전 충전하기</h2>
    <form>
      <input type="text" id="vending-machine-charge-input" placeholder="자판기가 보유할 금액" />
      <button type="submit" id="vending-machine-charge-button">충전하기</button>
    </form>
    <p id="vending-machine-charge-amount">보유 금액:</p>
    <h2>자판기가 보유한 동전</h2>
    <section class="table-container">
      <table>
        <thead>
          <tr>
            <td>동전</td>
            <td>개수</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td><td id="vending-machine-coin-500-quantity"></td>
          </tr>
          <tr>
            <td>100원</td><td id="vending-machine-coin-100-quantity"></td>
            </tr>
          <tr>
            <td>50원</td><td id="vending-machine-coin-50-quantity"></td>
          </tr>
          <tr>
            <td>10원</td><td id="vending-machine-coin-10-quantity"></td>
          </tr>
        </tbody>
      </table>
    </section>  
  `;
  $(SELECTOR.APP).insertAdjacentHTML('afterbegin', template);
};
