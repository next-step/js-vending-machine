export function createProductRow(product, onButtonClickCallback) {
  const $productRow = document.createElement('tr');
  const $productNameColumn = document.createElement('td');
  $productNameColumn.textContent = product.name;
  const $productPriceColumn = document.createElement('td');
  $productPriceColumn.textContent = product.price;
  const $productQuantityColumn = document.createElement('td');
  $productQuantityColumn.textContent = product.quantity;
  const $productPurchaseButtonColumn = document.createElement('td');
  const $productPurchaseButton = document.createElement('button');
  $productPurchaseButton.textContent = '구매하기';
  $productPurchaseButton.addEventListener('click', onButtonClickCallback);
  $productPurchaseButtonColumn.appendChild($productPurchaseButton);

  $productRow.appendChild($productNameColumn);
  $productRow.appendChild($productPriceColumn);
  $productRow.appendChild($productQuantityColumn);
  $productRow.appendChild($productPurchaseButtonColumn);

  return $productRow;
}
