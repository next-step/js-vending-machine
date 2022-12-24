import { getLocalStorageItem } from "../utils/localStorageUtils.js";

export const VENDING_MACHINE_MANAGER_STATE_KEY = 'vending-machine-manager';

const vendingMachineInitState = {
  amount: 0,
};

export const vendingMachineState = getLocalStorageItem(VENDING_MACHINE_MANAGER_STATE_KEY, (item) => {
  if (!item) return;
  return JSON.parse(item);
}) || vendingMachineInitState;
