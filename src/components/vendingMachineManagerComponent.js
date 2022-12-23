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

  function divideNumberInCountOfDivideLevels(totalAmount, divideLevels) {
    if (divideLevels.some((divideLevel) => typeof divideLevel !== 'number')) {
      throw new Error('divideLevels should be consisted in numbers');
    }

    if (divideLevels.some((divideLevel, i) => {
      if (i > 0) {
        const prevDivideLevel = divideLevels[i - 1];
        return prevDivideLevel <= divideLevel;
      }
      return false;
    })) {
      throw new Error('divideLevels should be sorted in descending order');
    }

    let currentTotalAmount = totalAmount;
    return divideLevels.map((divideLevel, i) => {
      const count = Math.floor(currentTotalAmount / divideLevel);
      currentTotalAmount -= count * divideLevel;

      return count;
    });
  }
  const [
    coin500Count,
    coin100Count,
    coin50Count,
    coin10Count,
  ] = vendingMachineState.amount
    // TODO: util에 넣어놓기
    ? divideNumberInCountOfDivideLevels(vendingMachineState.amount, [500, 100, 50, 10])
    : [];

  // TODO: ref 객체 만들면서 callback 넣어줄 수 있는 interface 뚫어주기
  if (coin500Ref.element) coin500Ref.element.textContent = coin500Count;
  if (coin100Ref.element) coin100Ref.element.textContent = coin100Count;
  if (coin50Ref.element) coin50Ref.element.textContent = coin50Count;
  if (coin10Ref.element) coin10Ref.element.textContent = coin10Count;

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
