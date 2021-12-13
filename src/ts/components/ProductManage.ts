import { ActionType, ClassName, Id } from "../common/constants";
import { IProduct, globalStore } from "../common/globalStore";
import Component from "../core/Component";
import { $, class2Query, id2Query } from "../core/dom";

export default class ProductManage extends Component {
  show() {
    this.$target.classList.remove(class2Query(ClassName.displayNone));
  }
  hide() {
    this.$target.classList.add(class2Query(ClassName.displayNone));
  }

  protected componentDidMount(): void {
    globalStore.subscribe(this.render, this);

    const onSubmit = (e: Event) => {
      e.preventDefault();
      const $formTarget = e.target as HTMLFormElement;

      const $nameInput = $(
        id2Query(Id.productNameInput),
        $formTarget
      ) as HTMLInputElement;
      const $priceInput = $(
        id2Query(Id.productPriceInput),
        $formTarget
      ) as HTMLInputElement;
      const $quantityInput = $(
        id2Query(Id.productQuantityInput),
        $formTarget
      ) as HTMLInputElement;

      const product: IProduct = {
        name: $nameInput.value,
        price: +$priceInput.value,
        quantity: +$quantityInput.value,
      };

      globalStore.dispatch({
        type: ActionType.addOrUpdateProduct,
        payload: product,
      });

      $formTarget.reset();
    };

    this.$target.addEventListener("submit", onSubmit);
  }

  protected htmlTemplate(): string {
    const products = globalStore.getState().products ?? [];

    const tableBodyHTML = products
      .map(
        ({ name, price, quantity }) => /*html*/ `
	      <tr class="${ClassName.productManageItem}">
          <td class="${ClassName.productManageName} ${ClassName.tableCell}">${name}</td>
          <td class="${ClassName.productManagePrice} ${ClassName.tableCell}">${price}</td>
          <td class="${ClassName.productManageQuantity} ${ClassName.tableCell}">${quantity}</td>
	      </tr>`
      )
      .join("");

    return /*html*/ `
	<h2>상품 추가하기</h2>
	<form class="${ClassName.productManageForm}">
	  <input type="text" id="${Id.productNameInput}" maxlength="20" placeholder="상품명" required/>
	  <input type="number" id="${Id.productPriceInput}" maxlength="20" placeholder="가격" min=100 required/>
	  <input type="number" id="${Id.productQuantityInput}" maxlength="20" placeholder="수량" min=1 required/>
	  <button id="${Id.productAddBtn}">추가하기</button>
	</form>
	<h2>상품 현황</h2>
	<table class="${ClassName.table}">
	  <thead>
	    <tr>
	      <th class="${ClassName.tableCell}">상품명</th>
	      <th class="${ClassName.tableCell}">가격</th>
	      <th class="${ClassName.tableCell}">수량</th>
	    </tr>
	  </thead>
	  <tbody>
	  ${tableBodyHTML}
	  </tbody>
	</table>
	  `;
  }
}
