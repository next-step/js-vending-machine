const InputValidation = {
  isEmptyProductInput(name, price, quantity) {
    if (name === '' || price === '' || quantity === '') {
      return false;
    }

    return true;
  },

  isUnder100Price(price) {
    if (price < 100) {
      return false;
    }

    return true;
  },

  isUnderMinQuantity(quantity) {
    if (quantity < 1) {
      return false;
    }

    return true;
  },
};

export default InputValidation;
