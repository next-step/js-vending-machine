import AbstractView from './abstractView';

class ProductContainerView extends AbstractView<HTMLElement, Array<Product>> {
  render(products: Array<Product>) {
    super.render(products);
  }

  subscribeAddProduct(addProductHandler: (product: Product) => void) {
    this.containerElement.addEventListener('submit', (event: Event | SubmitEvent) => {
      event.preventDefault();
      if (event.target.className === 'product-form') {
        const dataArray = [...new FormData(event.target)];
        const product = Object.fromEntries(dataArray);
        addProductHandler(product);
      }
    });
  }

  isProductsExist = (products: Array<Product>) => {
    return (products as Array<Product>) !== undefined;
  };

  generateMarkup(products: Array<Product>): string {
    const generateProductMarkup = (product: Product): string => /* html */ `
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
        ${this.isProductsExist(products) ? products.map(generateProductMarkup).join('') : ''}
        </tbody>
    </table>
`;
  }
}

export default new ProductContainerView();
