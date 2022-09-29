class ProductManageMenu {
  constructor($app) {
    this.app = $app;
    this.initRenderer();
  }

  initRenderer() {
    this.app.innerHTML = `
    <h3>상품 추가 하가</h3>
    `;
  }
}
export default ProductManageMenu;
