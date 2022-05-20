import AbstractView from './abstractView';
import { isPredicatedElement } from '../utils/predicator';

//TODO: STEP4 - 잔돈 반환 구현 필요
class ReturnContainerView extends AbstractView<HTMLElement> {
  render() {
    const products = this.store.dispatch('loadData', 'products');
    const inputPrice = this.store.dispatch('loadData', 'inputPrice');
    super.render({ products, inputPrice });
    this.subscribeInputPrice();
  }

  get priceInputFormElement() {
    return document.querySelector('.inputPrice-form')! as HTMLInputElement;
  }

  get purchaseContainerElement() {
    return document.getElementById('purchase-available-container')! as HTMLTableElement;
  }

  subscribeInputPrice() {
    if (!isPredicatedElement<HTMLFormElement>(this.priceInputFormElement)) return;

    this.priceInputFormElement.addEventListener('submit', event => {
      event.preventDefault();
      const inputPrice = event.target.elements['input-price'].valueAsNumber;
      this.store.dispatch('increaseInputPrice', inputPrice);
      this.render();
    });

    this.purchaseContainerElement.addEventListener('click', event => {
      event.preventDefault();
      const productName = event.target.closest('tr').dataset['name'];
      this.store.dispatch('buyProduct', productName);
      this.render();
    });
  }

  isExistProducts = (products: Array<Product>): products is Array<Product> => {
    return (products as Array<Product>) !== undefined;
  };

  getMarkup({ products, inputPrice }) {
    const getProductMarkup = (product: Product) => /* html */ `
            <tr data-name="${product.name}">
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td><button class="purchase-btn">구매하기</button></td>
            </tr>`;

    return /* html */ `
    <div class="grid grid--2-rows">

      <div>      
        <h3>금액 투입</h3>
        <form class="inputPrice-form">
          <input type="number" id="input-price" name="input-price" placeholder="금액을 입력해주세요." required autofocus/>
          <button type="submit" id="input-price-button">투입하기</button>
          <div class="purchase-input-price">
            <label>투입한 금액 : <span>${inputPrice}</span>원 </label>
          </div>
      </form>
      <table class="purchase-available fixed_header">
          <thead>
              <tr>
                  <th>상품명</th>
                  <th>가격</th>
                  <th>수량</th>
                  <th>구매</th>
              </tr>            
          </thead>
          <tbody id="purchase-available-container">
          ${this.isExistProducts(products) ? products.map(getProductMarkup).join('') : ''}
          </tbody>
      </table>
      </div>

      <div>
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
                      <td id="coin-500-quantity">0개</td>
                  </tr>
                  <tr>
                      <td>100원</td>
                      <td id="coin-100-quantity">0개</td>
                  </tr>
                  <tr>
                      <td>50원</td>
                      <td id="coin-50-quantity">0개</td>
                  </tr>
                  <tr>
                      <td>10원</td>
                      <td id="coin-10-quantity">0개</td>
                  </tr>
              </tbody>
          </table>
      <div>

    </div>
`;
  }
}

export default new ReturnContainerView();
