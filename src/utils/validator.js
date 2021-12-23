import { ErrorMsgs } from "./constants.js";

export const isNameAvailable = (name) => {
  if (name === "") {
    alert(ErrorMsgs.EMPTY_NAME);
    return false;
  }

  return true;
};

export const isPriceAvailable = (price) => {
  if (price === "") {
    alert(ErrorMsgs.EMPTY_PRICE);
    return false;
  }

  if (Number(price) < 100) {
    alert(ErrorMsgs.OUT_OF_RANGE_PRICE);
    return false;
  }

  if (Number(price) % 10 !== 0) {
    alert(ErrorMsgs.NOT_DIVIDED_PRICE);
    return false;
  }

  return true;
};

export const isQuantityAvailable = (quantity) => {
  if (quantity === "") {
    alert(ErrorMsgs.EMPTY_QUANTITY);
    return false;
  }

  if (Number(quantity) < 1) {
    alert(ErrorMsgs.OUT_OF_RANGE_QUANTITY);
    return false;
  }

  return true;
};

export const findDuplicatedIdx = (products, name) => {
  return products.findIndex((i) => i.name === name);
};
