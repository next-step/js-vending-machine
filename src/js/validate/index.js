const generateError = message => {
  throw new Error(message);
};

const checkPriceUnit = price => price % 10 === 0;

const checkValidation = (condition, message) => {
  if (!condition) {
    generateError(message);
  }
};

export { generateError, checkPriceUnit, checkValidation };
