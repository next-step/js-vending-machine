class ProductPurchaseMenu {
  #app;

  constructor($app) {
    this.#app = $app;
    this.initRenderer();
  }

  initRenderer() {
    this.#app.innerHTML = `
    <h3>금액 충전</h3>
    `;
  }
}
export default ProductPurchaseMenu;
