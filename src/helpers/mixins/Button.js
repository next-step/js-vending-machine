import { $element } from '../dom.js';

const routerPage = {
  'product-manage-menu': '<machine-product></machine-product>',
  'vending-machine-manage-menu': '<machine-charge></machine-charge>',
  'product-purchase-menu': '<machine-purchase></machine-purchase>',
};

const clickableMethods = {
  init() {
    this.$el.addEventListener('click', this.click.bind(this));
  },
  click({ target }) {
    this.$target.replaceChildren($element(routerPage[target.id]));
  },
};

export default clickableMethods;
