import View from "./View.js"

export default class ChargeAmountManage extends View {
  render() {
    /* html */
    return `
    <h3>자판기 돈통 충전하기</h3>
    `;
  }
}

customElements.define("charge-amount-manage", ChargeAmountManage);
