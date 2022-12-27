import { VendingMachine } from "../models/VendingMachine.js";
import { getLocalStorageItem } from "../utils/localStorageUtils.js";
import { toNumber } from "../utils/utils.js";

export const VENDING_MACHINE_MANAGER_STATE_KEY = 'vending-machine-manager';

const initVendingMachineState = () => new VendingMachine({
  amount: 0,
  coin500: 0,
  coin100: 0,
  coin50: 0,
  coin10: 0,
});

export const vendingMachineState = getLocalStorageItem(VENDING_MACHINE_MANAGER_STATE_KEY, (item) => {
  if (!item) return;
  const parsedItem = JSON.parse(item);
  changePropertyToNumber(parsedItem, 'amount');
  changePropertyToNumber(parsedItem, 'coin500');
  changePropertyToNumber(parsedItem, 'coin100');
  changePropertyToNumber(parsedItem, 'coin50');
  changePropertyToNumber(parsedItem, 'coin10');
  return new VendingMachine(parsedItem);
}) || initVendingMachineState();

function changePropertyToNumber(obj, key) {
  obj[key] = toNumber(obj[key]);
}
