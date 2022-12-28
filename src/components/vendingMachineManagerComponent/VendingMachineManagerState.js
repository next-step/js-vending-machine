import { Validator } from "../common/Validator.js";

export class VendingMachineManagerState extends Validator {
  amount = 0;

  constructor({ amount }) {
    super();
    this.amount = amount || 0;
  }

  validateAmount = (focusElement) => {
    const validateList = [
      { isValidate: !!this.amount && this.amount >= 10, message: '충전 금액을 10원 이상 입력해주세요!' },
      { isValidate: this.amount % 10 === 0, message: '충전 금액을 10원 단위로 입력해주세요!' },
    ];

    return this.validator(validateList, focusElement);
  }
}
