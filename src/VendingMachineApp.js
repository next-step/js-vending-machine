export default class VendingMachineApp {
  constructor($el) {
    this.$el = $el;
    this.render();
  }

  render() {
    this.$el.innerHTML = `
      <button id="product-manage-menu">상품 관리</button>
      <button id="vending-machine-manage-menu">잔돈충전</button>
      <button id="product-purchase-menu">상품 구매</button>
      <div id="app"></div>
    `;
  }
}
