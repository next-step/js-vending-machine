import {
  MINIMUM_QUANTITY,
  MINIMUM_PRICE,
  DIVISIBLE_PRICE,
  DIVISIBLE_CHARGING_MONEY,
} from './constants/vendingMachine.js';

export const isEmpty = input => input.trim().length === 0;
export const isTooSmallQuantity = quantity => Number(quantity) < MINIMUM_QUANTITY;
export const isTooSmallPrice = price => Number(price) < MINIMUM_PRICE;
export const priceNotDividedZero = price => Number(price) % DIVISIBLE_PRICE !== 0;
export const amountNotDividedZero = amount => Number(amount) % DIVISIBLE_CHARGING_MONEY !== 0;
