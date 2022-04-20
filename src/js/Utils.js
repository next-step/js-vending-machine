import InputValidation from './InputValidation.js';

export function clearProductInputs() {
  document.querySelector('#product-name-input').value = '';
  document.querySelector('#product-price-input').value = '';
  document.querySelector('#product-quantity-input').value = '';
}

export function validateProductInputs(name, price, quantity) {
  if (!InputValidation.isEmptyProductInput(name, price, quantity)) {
    alert('상품명, 금액, 수량에는 공백을 입력할 수 없습니다.');
    return false;
  }

  if (!InputValidation.isUnder100Price(price)) {
    alert('상품의 최소 가격은 100원입니다.');
    return false;
  }

  if (!InputValidation.isPriceInUnitsOf10Won(price)) {
    alert('상품의 가격은 10원 단위어야 합니다.');
    return false;
  }

  if (!InputValidation.isUnderMinQuantity(quantity)) {
    alert('상품의 최소 수량은 1개입니다.');
    return false;
  }
}

export function findDuplicatedProductNameIndex(products, inputName) {
  return products.findIndex(product => product.name === inputName);
}
