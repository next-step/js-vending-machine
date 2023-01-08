import { Validator } from "../common/Validator.js";

const MIN_PRICE = 10;

export class ProductPurchaseMenuState extends Validator {
  input = 0;
  totalAmount = 0;

  constructor({ input = 0, totalAmount = 0 }) {
    super();
    this.input = input;
    this.totalAmount = totalAmount;
  }

  validateAmountInput = (focusElement) => {
    const validateList = [
      { isValidate: !!this.input && this.input > 0, message: '상품 가격을 양수로 입력해주세요!' },
      { isValidate: this.input > MIN_PRICE, message: '상품 가격은 10원 이상 입력해주세요!' },
      { isValidate: this.input % 10 === 0, message: '가격은 10원 단위로 떨어져야 합니다.' },
    ];

    return this.validator(validateList, focusElement);
  }

  syncInput(input) {
    this.input = Number(input);
  }

  accumulateInput() {
    this.totalAmount += this.input;
    this.input = 0;
  }

  deductAmount(amount) {
    this.totalAmount -= amount;
  }
}
