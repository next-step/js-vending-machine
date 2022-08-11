import AbstractObservable from "../util/observer/AbstractObservable.js";

import ProductManageModel from "../Model/ProductManageModel.js";

import Validator from "../util/validator.js";
import { NOTIFY_KEY, MIN_PRODUCT_PRICE, MIN_PRODUCT_NUMBER, PRODUCT_STANDARD_PRICE } from "../util/constants.js";

class ProductManageController extends AbstractObservable {
	constructor() {
		super();
		this.observers = [];

		this.productManageModel = ProductManageModel;
	}

	registerObserver(view) {
		this.observers.push(view);
	}

	notify(key, ...args) {
		this.observers.forEach((observer) => observer.update(key, ...args));
	}

	#isProductValid({ productName, productPrice, productQuantity }) {
		try {
			Validator.set(productName).isRequired("상품명을 입력해 주세요");

			Validator.set(productPrice)
				.isRequired("상품 가격을 입력해 주세요")
				.isNumber("상품 가격은 숫자여야 합니다")
				.min(MIN_PRODUCT_PRICE, `상품의 최소가격은 ${MIN_PRODUCT_PRICE}원 입니다`)
				.condition(
					(value) => value % PRODUCT_STANDARD_PRICE === 0,
					`상품의 가격은 ${PRODUCT_STANDARD_PRICE}원으로 나누어 떨어져야 합니다`
				);

			Validator.set(productQuantity)
				.isRequired("상품 갯수를 입력해 주세요")
				.isNumber("상품 갯수는 숫자여야 합니다")
				.min(MIN_PRODUCT_NUMBER, `상품의 최소 수량은 ${MIN_PRODUCT_NUMBER}개 입니다`);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	handleAddProduct(productInfo) {
		this.#isProductValid(productInfo);

		this.productManageModel.addProduct(productInfo);
		this.notify(NOTIFY_KEY.ADD_PRODUCT, this.productManageModel.products);
	}
}

export default new ProductManageController();
