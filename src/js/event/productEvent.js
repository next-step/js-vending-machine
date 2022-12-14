export default class ProductEvent {
  constructor(controller) {
    this.controller = controller;
    this.bindEvent();
  }

  addInputEventListeners() {
    const { nameInput, priceInput, quantityInput } = this.controller.view;
    const { typeProductName, typeProductPrice, typeProductQuantity } = this.controller;
    nameInput.addEventListener('keyup', (event) => {
      typeProductName({ name: event.target.value });
    });

    priceInput.addEventListener('keyup', (event) => {
      typeProductPrice({ price: event.target.value });
    });

    quantityInput.addEventListener('keyup', (event) => {
      typeProductQuantity({ quantity: event.target.value });
    });
  }

  addClickEventListeners() {
    const { addButton } = this.controller.view;
    const { addProduct } = this.controller;

    addButton.addEventListener('click', () => {
      addProduct();
    });
  }

  bindEvent() {
    this.addInputEventListeners();
    this.addClickEventListeners();
  }
}
