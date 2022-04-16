import AbstractView from './abstractView';

class ProductContainerView extends AbstractView<HTMLElement, Array<Product>> {
  private formElement!: HTMLFormElement;

  render(products: Array<Product> = []) {
    const markup = this.generateMarkup(products);
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
    this.formElement = this.parentElement.querySelector('.product-container')! as HTMLFormElement;
  }

  addHandlerRender(handler: Function) {
    handler();
  }

  addHandlerProduct(handler: Function) {
    this.parentElement.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const dataArray = [...new FormData(this.formElement)];
      const product = Object.fromEntries(dataArray);
      handler(product);
    });
  }

  generateMarkup(products: Array<Product>): string {
    const productHtml = (product: Product) => /* html */ `
            <tr>
                <th>${product.name}</th>
                <th>${product.price}</th>
                <th>${product.quantity}</th>
            </tr>`;

    return /* html */ `
    <h3>상품 추가하기</h3>
    <form class="product-container">
        <input type="text" id="product-name-input" name="name" placeholder="상품명" required />
        <input type="number" id="product-price-input" name="price" placeholder="가격" required />
        <input type="number" id="product-quantity-input" name="quantity" placeholder="수량" required />
        <button id="product-add-button">추가하기</button>
    </form>
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
            ${products.map(productHtml).join('')}
        </thead>
        <tbody id="product-inventory-container"></tbody>
    </table>
`;
  }
}

export default new ProductContainerView();
