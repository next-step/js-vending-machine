<<<<<<< HEAD
import Product from "../domain/Product.js";

export const ProductException = {
    notExistProductName() {
        return new Error("상품명을 입력해주세요.");
    },

    outOfRangePrice() {
        return new Error(`상품 금액은 ${Product.PRICE_MIN}원이 최소 금액입니다.`);
    },

    notMatchPriceUnit() {
        return new Error(`상품 금액은 ${Product.PRICE_UNIT}원 단위로 입력해야 합니다.`);
    },

    outOfRangeQuantity() {
        return new Error(`상품 수량은 ${Product.QUANTITY_MIN}개 이상 입력해야 합니다.`);
    },
};
=======
import Product from "../domain/Product.js"

export default class ProductException {
    constructor() {}

    static notExistProductName() {
        return new Error("상품명을 입력해주세요.")
    }

    static outOfRangePrice() {
        return new Error(`상품 금액은 ${Product.PRICE_MIN}원이 최소 금액입니다.`);
    }

    static notMatchPriceUnit() {
        return new Error(`상품 금액은 ${Product.PRICE_UNIT}원 단위로 입력해야 합니다.`);
    }

    static outOfRangeAmount() {
        return new Error(`상품 수량은 ${Product.AMOUNT_MIN}개 이상 입력해야 합니다.`)
    }
}
>>>>>>> 2d93b03 (상품 등록 검증 로직 추가)
