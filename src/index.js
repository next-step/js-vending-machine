import './components/index.js';
import { $element } from './helpers/index.js';
import clickableMethods from './helpers/mixins/Button.js';

document.querySelector('nav').addEventListener('click', ({ target }) => {
  const $main = document.querySelector('main');
  if (target.matches('#product-manage-menu'))
    $main.replaceChildren($element('<machine-product></machine-product>'));
  if (target.matches('#vending-machine-manage-menu'))
    $main.replaceChildren($element('<machine-charge></machine-charge>'));
  if (target.matches('#product-purchase-menu'))
    $main.replaceChildren($element('<machine-purchase></machine-purchase>'));
});

function Button(id) {
  this.$el = document.getElementById(id);
}

Object.assign(Button.prototype, clickableMethods);

const button = new Button('product-manage-menu');
button.init(button.hover);
