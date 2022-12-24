import { render } from "../binders.js";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localStorageUtils.js";
import { divideNumberInCountOfDivideLevels } from "../utils/utils.js";

import { Ref } from "./common/Ref.js";

const vendingMachineInitState = {
  amount: 0,
};

let vendingMachineState = getLocalStorageItem('vending-machine-manager', (item) => {
  if (!item) return;
  return JSON.parse(item);
}) || vendingMachineInitState;

const chargeAmountInputRef = new Ref();

export function vendingMachineControllerComponent() {
  return {
    chargeAmountInput: {
      ref: chargeAmountInputRef,
    },
    chargeButton: {
      events: {click: (e) => {
        const inputAmount = chargeAmountInputRef.element.value;
        if (!inputAmount && inputAmount > 10) {
          alert('충전 금액을 10원 이상 입력해주세요!');
          chargeAmountInputRef.element.focus();
          return;
        }

        if (inputAmount % 10 !== 0) {
          alert('충전 금액을 10원 단위로 입력해주세요!');
          chargeAmountInputRef.element.focus();
          return;
        }

        vendingMachineState.amount = inputAmount;
        setLocalStorageItem('vending-machine-manager', JSON.stringify(vendingMachineState));
        render('cashBoxBinder');
      }},
    },
  };
}

const totalAmountRef = new Ref();
const coin500Ref = new Ref();
const coin100Ref = new Ref();
const coin50Ref = new Ref();
const coin10Ref = new Ref();

export function cashBoxComponent() {
  totalAmountRef.addOnRenderCallback((totalAmountElement) => {
    console.log(totalAmountElement, vendingMachineState)
    totalAmountElement.textContent = vendingMachineState.amount
  });

  const [
    coin500Count,
    coin100Count,
    coin50Count,
    coin10Count,
  ] = vendingMachineState.amount
    ? divideNumberInCountOfDivideLevels(vendingMachineState.amount, [500, 100, 50, 10])
    : [];

  coin500Ref.addOnRenderCallback((coin500Element) => coin500Element.textContent = coin500Count);
  coin100Ref.addOnRenderCallback((coin100Element) => coin100Element.textContent = coin100Count);
  coin50Ref.addOnRenderCallback((coin50Element) => coin50Element.textContent = coin50Count);
  coin10Ref.addOnRenderCallback((coin10Element) => coin10Element.textContent = coin10Count);

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
