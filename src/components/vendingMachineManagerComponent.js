import { render } from "../binders.js";
import { setLocalStorageItem } from "../utils/localStorageUtils.js";
import { divideNumberInCountOfDivideLevels } from "../utils/utils.js";
import { vendingMachineState, VENDING_MACHINE_MANAGER_STATE_KEY } from "../states/vendingMachineManagerState.js";

import { Ref } from "./common/Ref.js";

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
        setLocalStorageItem(VENDING_MACHINE_MANAGER_STATE_KEY, JSON.stringify(vendingMachineState));
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
