const MIN_PRODUCT_PRICE = 100;
const MIN_UNIT_PRODUCT_PRICE = 10;

const MIN_PRODUCT_QUANTITY = 1;

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

  if (price % MIN_UNIT_PRODUCT_PRICE > 0) {
    alert(`상품의 가격 단위는 ${MIN_UNIT_PRODUCT_PRICE}원입니다.`);
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

export default {
  validateProductName,
  validateProductPrice,
  validateProductQuantity,
};
