import { render } from "../binders.js";

const vendingMachineInitState = {
  amount: 0
};

let vendingMachineState = vendingMachineInitState;

export function vendingMachineControllerComponent() {
  const chargeAmountInputRef = { element: null };

  return {
    chargeAmountInput: {
      ref: chargeAmountInputRef,
    },
    chargeButton: {
      events: {click: (e) => {
        const inputAmount = chargeAmountInputRef.element.value;
        if (!inputAmount && inputAmount > 10) {
          alert('충전 금액을 10원 이상 입력해주세요!');
          chargeAmountInput.element.focus();
          return;
        }

        // TODO: 10원 단위 확인하는 것 util로 빼기
        if (inputAmount % 10 !== 0) {
          alert('충전 금액을 10원 단위로 입력해주세요!');
          chargeAmountInput.element.focus();
          return;
        }

        vendingMachineState.amount = inputAmount;
        render('cashBoxBinder');
      }},
    },
  };
}

const totalAmountRef = { element: null };
const coin500Ref = { element: null };
const coin100Ref = { element: null };
const coin50Ref = { element: null };
const coin10Ref = { element: null };

export function cashBoxComponent() {
  if (totalAmountRef.element) totalAmountRef.element.textContent = vendingMachineState.amount;
  // TODO: Business Logic : 계산 돈 쪼개기 계산 함수 만들기
  if (coin500Ref.element) coin500Ref.element.textContent = vendingMachineState.amount;
  if (coin100Ref.element) coin100Ref.element.textContent = vendingMachineState.amount;
  if (coin50Ref.element) coin50Ref.element.textContent = vendingMachineState.amount;
  if (coin10Ref.element) coin10Ref.element.textContent = vendingMachineState.amount;

  return {
    totalAmount: {
      ref: totalAmountRef,
    },
    coin500: {
      ref: coin500Ref,
    },
    coin100: {
      ref: coin100Ref,
    },
    coin50: {
      ref: coin50Ref,
    },
    coin10: {
      ref: coin10Ref,
    },
  };
}
