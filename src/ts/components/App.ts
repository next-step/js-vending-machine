import Component from "../core/Component";

export default class App extends Component {
  constructor($target: HTMLElement) {
    super($target);
  }

  componentDidMount() {}

  protected htmlTemplate(): string {
    return /*html*/ `
      <button id="product-manage-menu">상품 관리</button>
      <button id="vending-machine-manage-menu">잔돈충전</button>
      <button id="product-purchase-menu">상품 구매</button>
    `;
  }
}
