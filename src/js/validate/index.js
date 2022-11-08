const checkPriceUnit = price => price % 10 === 0;

const checkEmptyPrice = price => price >= 10;

const checkValidation = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

export { checkPriceUnit, checkEmptyPrice, checkValidation };
