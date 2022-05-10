import AbstractView from './abstractView';
import { addProduct } from '../controller';

class ProductContainerView extends AbstractView<HTMLElement, Array<Product>> {
  render(products: Array<Product>) {
    super.render(products);
    this.subscribeAddProduct();
  }

  get productFormElement() {
    return document.querySelector('.product-form');
  }

  isFormElement(target: any): target is HTMLFormElement {
    return (target as HTMLFormElement) !== null;
  }

  subscribeAddProduct() {
    if (!this.isFormElement(this.productFormElement)) return;

    this.productFormElement.addEventListener('submit', (event: Event | SubmitEvent) => {
      event.preventDefault();
      const dataArray = [...new FormData(event.target)];
      const product = Object.fromEntries(dataArray);
      addProduct(product);
    });
  }

  isExistProducts = (products: Array<Product>): products is Array<Product> => {
    return (products as Array<Product>) !== undefined;
  };

  getMarkup(products: Array<Product>) {
    const generateProductMarkup = (product: Product) => /* html */ `
            <tr>
                <th>${product.name}</th>
                <th>${product.price}</th>
                <th>${product.quantity}</th>
            </tr>`;

    return /* html */ `
    <h3>상품 추가하기</h3>
    <form class="product-form">
        <input type="text" id="product-name-input" name="name" placeholder="상품명" required />
        <input type="number" id="product-price-input" name="price" placeholder="가격" required />
        <input type="number" id="product-quantity-input" name="quantity" placeholder="수량" required />
        <button type="submit" id="product-add-button">추가하기</button>
    </form>
    <table class="product-inventory">
        <caption> 상품은 이름, 가격, 수량 순으로 정렬됩니다. </caption>
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
        <tbody id="product-inventory-container">
        ${this.isExistProducts(products) ?? products.map(generateProductMarkup).join('')}
        </tbody>
    </table>
`;
  }
}

export default new ProductContainerView();
