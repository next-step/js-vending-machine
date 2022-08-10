import AbstractObserver from "../../util/observer/AbstractObserver.js";

import ProductManageController from "../../Controller/ProductManageController.js";

import { $ } from "../../util/dom.js";

class ProductManageView extends AbstractObserver {
	constructor(target) {
		super();
		this.$target = target;

		this.initObserver();
	}

	static getTemplate() {
		return /* html */ `
            <div class="product-manage-tab">
                <div class="product-container">
                    <h3>상품 추가하기</h3>
                    <input type="text" id="product-name-input" placeholder="상품명" />
                    <input type="number" id="product-price-input" placeholder="가격" />
                    <input type="number" id="product-quantity-input" placeholder="수량" />
                    <button id="product-add-button">추가하기</button>
                </div>
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
                    </tbody>
                </table>
            </div>
        `;
	}

	initObserver() {
		this.productManageController = ProductManageController;
		this.productManageController.registerObserver(this);
	}

	bindDom() {
		this.$productNameInput = $("#product-name-input");
		this.$productPriceInput = $("#product-price-input");
		this.$productQuantityInput = $("#product-quantity-input");
		this.$productAddBtn = $("#product-add-button");
		this.$productTableBody = $("#product-inventory-container");
	}

	bindEvent() {
		this.$productAddBtn.addEventListener("click", this.onAddProduct);
	}

	isProductInfoValid({ productName, productPrice, productQuantity }) {
		return productName && !isNaN(productPrice) && !isNaN(productQuantity);
	}

	onAddProduct = () => {
		const productName = this.$productNameInput.value;
		const productPrice = this.$productPriceInput.valueAsNumber;
		const productQuantity = this.$productQuantityInput.valueAsNumber;

		const productInfo = {
			productName,
			productPrice,
			productQuantity,
		};

		console.log(productInfo);

		if (!this.isProductInfoValid(productInfo)) {
			alert("모든 값은 필수 입니다");
			return;
		}

		try {
			this.productManageController.handleAddProduct(productInfo);
		} catch (error) {
			alert(error);
		}
	};

	render() {
		const $producrManageTab = $(".product-manage-tab");

		if ($producrManageTab) this.$target.removeChild($producrManageTab);

		this.$target.insertAdjacentHTML("beforeend", ProductManageView.getTemplate());

		this.bindDom();
		this.bindEvent();
	}
}

export default ProductManageView;
