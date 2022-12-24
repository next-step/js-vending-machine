import { getLocalStorageItem } from "../utils/localStorageUtils.js";
import { toNumber } from "../utils/utils.js";

export const VENDING_MACHINE_MANAGER_STATE_KEY = 'vending-machine-manager';

const vendingMachineInitState = {
  amount: 0,
};

export const vendingMachineState = getLocalStorageItem(VENDING_MACHINE_MANAGER_STATE_KEY, (item) => {
  if (!item) return;
  const parsedItem = JSON.parse(item);
  parsedItem.amount = toNumber(parsedItem.amount)
  return parsedItem;
}) || vendingMachineInitState;
