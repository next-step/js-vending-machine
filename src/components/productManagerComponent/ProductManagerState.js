import { Validator } from "../common/Validator.js";

const MIN_PRICE = 100;

export class ProductManagerState extends Validator {
  name = '';
  price = 0;
  quantity = 0;

  constructor({ name, price, quantity }) {
    super();
    this.name = name || '';
    this.price = price || 0;
    this.quantity = quantity || 0;
  }

  validateName = (focusElement) => {
    const validateList = [
      { isValidate: !!this.name, message: '상품 이름을 입력해주세요!' },
    ];

    return this.validator(validateList, focusElement);
  }

  validatePrice = (focusElement) => {
    const validateList = [
      { isValidate: !!this.price && this.price > 0, message: '상품 가격을 양수로 입력해주세요!' },
      { isValidate: this.price > MIN_PRICE, message: '상품 가격은 100원 이상 입력해주세요!' },
      { isValidate: this.price % 10 === 0, message: '가격은 10원 단위로 떨어져야 합니다.' },
    ];

    return this.validator(validateList, focusElement);
  }

  validateQuantity = (focusElement) => {
    const validateList = [
      { isValidate: !!this.quantity && this.quantity > 0, message: '상품 수량을 양수로 입력해주세요!' },
    ];

    return this.validator(validateList, focusElement);
  }
}
