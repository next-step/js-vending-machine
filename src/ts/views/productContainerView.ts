import AbstractView from './abstractView';
import { isPredicatedElement } from '../utils/predicator';

class ProductContainerView extends AbstractView<HTMLElement> {
  render() {
    const products = this.store.dispatch('loadData', 'products');
    super.render(products);
    this.setEvent();
  }

  get productFormElement() {
    return document.querySelector('.product-form');
  }

  setEvent() {
    if (!isPredicatedElement(this.productFormElement)) return;
    this.productFormElement.addEventListener('submit', (event: Event | SubmitEvent) => {
      event.preventDefault();
      const dataArray = [...new FormData(event.target)];
      const product = Object.fromEntries(dataArray);
      this.store.dispatch('addProduct', product);
      this.render();
    });
  }

  getMarkup(products: Array<Product>) {
    const getProductMarkup = (product: Product) => /* html */ `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
            </tr>`;

    return /* html */ `
    <div class="grid grid--2-rows">

      <div class="product-container">
        <h3>상품 추가하기</h3>
        <form class="product-form">
            <input type="text" id="product-name-input" name="name" placeholder="상품명" required autofocus/>
            <input type="number" id="product-price-input" name="price" placeholder="가격" required />
            <input type="number" id="product-quantity-input" name="quantity" placeholder="수량" required />
            <button type="submit" id="product-add-button">추가하기</button>
        </form>
      </div>

      <div>
        <table class="product-inventory fixed_header">
            <caption> 상품은 이름, 가격, 수량 순으로 정렬됩니다. </caption>
            <thead>
                <tr>
                    <th>상품명</th>
                    <th>가격</th>
                    <th>수량</th>
                </tr>            
            </thead>
            <tbody id="product-inventory-container" class="height-l">
             ${products.map(getProductMarkup).join('')}
            </tbody>
        </table>
      </div>

    </div>
`;
  }
}

export default new ProductContainerView();
