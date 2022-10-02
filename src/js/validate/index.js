const generateError = message => {
  throw new Error(message);
};

const checkPriceUnit = price => parseInt(price, 10) % 10 === 0;

const checkValidation = (condition, message) => {
  if (!condition) {
    generateError(message);
  }
};

export { generateError, checkPriceUnit, checkValidation };
