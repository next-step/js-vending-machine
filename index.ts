import DataList from "./components/dataList";

customElements.define("data-list", DataList, { extends: "tbody" });

const $productInventoryContainer = document.querySelector("#product-inventory-container");
const $productAddButton = document.querySelector("#product-add-button");

$productAddButton.addEventListener("click", () => {
  const $name = document.querySelector("#product-name-input");
  const $price = document.querySelector("#product-price-input");
  const $quantity = document.querySelector("#product-quantity-input");

  const inputs = [$name, $price, $quantity];
  const isValid = inputs.every(el => el.checkValidity());

  if (isValid) {
    $productInventoryContainer.setData($name.value, { price: $price.value, quantity: $quantity.value, name: $name.value });
  }
});
