import { render, CASH_BOX_BINDER } from "../../binders.js";
import { setLocalStorageItem } from "../../utils/localStorageUtils.js";
import { vendingMachineState, VENDING_MACHINE_MANAGER_STATE_KEY } from "../../states/vendingMachineState.js";

import { Ref } from "../common/Ref.js";
import { VendingMachineManagerState } from "./VendingMachineManagerState.js";

const vendingMachineManagerInitState = new VendingMachineManagerState({
  amount: 0,
});

const chargeAmountInputRef = new Ref();

export function vendingMachineControllerComponent() {
  let vendingMachineManagerState = vendingMachineManagerInitState;

  return {
    chargeAmountInput: {
      ref: chargeAmountInputRef,
      events: {change: (e) => {
        vendingMachineManagerState.amount = Number(e.target.value);
      }},
    },
    chargeButton: {
      events: {click: () => {
        if (!vendingMachineManagerState.validateAmount()) return;

        vendingMachineState.addAmount(vendingMachineManagerState.amount);
        chargeAmountInputRef.element.value = null;
        vendingMachineManagerState = new VendingMachineManagerState({});
        setLocalStorageItem(VENDING_MACHINE_MANAGER_STATE_KEY, JSON.stringify(vendingMachineState));
        render(CASH_BOX_BINDER);
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
  totalAmountRef.addOnRenderCallback((totalAmountElement) => totalAmountElement.textContent = vendingMachineState.amount);
  coin500Ref.addOnRenderCallback((coin500Element) => coin500Element.textContent = vendingMachineState.coin500);
  coin100Ref.addOnRenderCallback((coin100Element) => coin100Element.textContent = vendingMachineState.coin100);
  coin50Ref.addOnRenderCallback((coin50Element) => coin50Element.textContent = vendingMachineState.coin50);
  coin10Ref.addOnRenderCallback((coin10Element) => coin10Element.textContent = vendingMachineState.coin10);

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
