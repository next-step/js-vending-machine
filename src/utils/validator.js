const MIN_PRODUCT_PRICE = 100;
const UNIT_PRODUCT_PRICE = 10;
const MIN_PRODUCT_QUANTITY = 1;

const MIN_AMOUNT_CHARGE = 100;
const UNIT_AMOUNT_CHARGE = 10;

function validateProductName(name) {
  if (!name) {
    alert('상품명은 공백이 불가능합니다.');
    return false;
  }

  return true;
}

function validateProductPrice(price) {
  if (!price) {
    alert('상품의 가격은 공백이 불가능합니다.');
    return false;
  }

  if (price < MIN_PRODUCT_PRICE) {
    alert(`상품의 최소 가격은 ${MIN_PRODUCT_PRICE}원입니다.`);
    return false;
  }

  if (price % UNIT_PRODUCT_PRICE > 0) {
    alert(`상품의 가격 단위는 ${UNIT_PRODUCT_PRICE}원입니다.`);
    return false;
  }

  return true;
}

function validateProductQuantity(quantity) {
  if (!quantity) {
    alert('상품의 수량은 공백이 불가능합니다.');
    return false;
  }

  if (quantity < MIN_PRODUCT_QUANTITY) {
    alert(`상품의 최소 수량은 ${MIN_PRODUCT_QUANTITY}개 입니다.`);
    return false;
  }

  return true;
}

function validateVendingMachineAmount(amount) {
  if (amount < MIN_AMOUNT_CHARGE) {
    alert(`최소 충전 금액은 ${MIN_AMOUNT_CHARGE}원입니다.`);
    return false;
  }

  if (amount % UNIT_AMOUNT_CHARGE > 0) {
    alert(`충전 금액 단위는 ${UNIT_AMOUNT_CHARGE}원입니다.`);
    return false;
  }

  return true;
}

export default {
  validateProductName,
  validateProductPrice,
  validateProductQuantity,
  validateVendingMachineAmount,
};
