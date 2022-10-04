const checkPriceUnit = price => price % 10 === 0;

const checkValidation = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

export { checkPriceUnit, checkValidation };
