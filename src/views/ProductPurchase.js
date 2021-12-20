import View from "./View.js"

export default class ProductPurchase extends View {
  render() {
    /* html */
    return `
    <h3>구매하기</h3>
    `;
  }
}

customElements.define("product-purchase", ProductPurchase);
