import ProductManageMenu from './views/ProductManageMenu.js';
import View from './common/View.js';
import { $ } from './utils/index.js';
import routerUtils from './utils/routerUtils.js';
import VendingMachineManageMenu from './views/VendingMachineManageMenu.js';

export default class VendingMachineApp extends View {
  render() {
    this.$el.innerHTML = `
      <button route-name="product-manage-menu">상품 관리</button>
      <button route-name="vending-machine-manage-menu">잔돈충전</button>
      <button route-name="product-purchase-menu">상품 구매</button>
      
      <div id="app" data-component="route-view"></div>
    `;

    const { hash } = routerUtils.resolve();
    this.renderRouteView(hash);
  }

  bindEvents() {
    this.$el.addEventListener('click', ({ target }) => {
      const routeName = target.getAttribute('route-name');
      if (!routeName) {
        return;
      }

      routerUtils.push(routeName);
      this.renderRouteView(routeName);
    });

    routerUtils.bindOnpopstate((routeName) => this.renderRouteView(routeName));
  }

  renderRouteView(routeName) {
    if (this.components[routeName]) {
      this.components[routeName].render();
      return;
    }

    switch (routeName) {
      case '':
      case 'product-manage-menu':
        this.components[routeName] = new ProductManageMenu({
          $el: $('[data-component="route-view"]'),
          name: 'ProductManageMenu',
        });
        return;

      case 'vending-machine-manage-menu':
        this.components[routeName] = new VendingMachineManageMenu({
          $el: $('[data-component="route-view"]'),
          name: 'VendingMachineManageMenu',
        });
        return;

      case 'product-purchase-menu':
    }
  }
}
