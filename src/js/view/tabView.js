import { $ELEMENT } from '../../constants/element.js';
import { VENDING_MACHINE_INITIAL_STATE } from '../../constants/index.js';

export default class MenuView {
  menus = document.querySelectorAll($ELEMENT.MENU);
  appendingContainer = document.querySelector($ELEMENT.APPENDING_CONTAINER);
  chargingContainer = document.querySelector($ELEMENT.CHARGING_CONTAINER);

  MENU_CONTAINER_MAP = new Map([
    ['product-manage-menu', this.appendingContainer],
    ['vending-machine-manage-menu', this.chargingContainer],
  ]);

  constructor() {
    this.renderTab({ tabId: VENDING_MACHINE_INITIAL_STATE.hashId });
  }

  //*TODO: 확장성 생각해서 개선 필요함.
  renderTab = ({ tabId }) => {
    this.menus.forEach((menu) => {
      if (menu.id === tabId) {
        menu.classList.add('active');
        // this.MENU_CONTAINER_MAP.get(menu.id).classList.add('visible');
        this.MENU_CONTAINER_MAP.get(menu.id).classList.remove('invisible');
      } else {
        menu.classList.remove('active');
        this.MENU_CONTAINER_MAP.get(menu.id).classList.add('invisible');
        // this.MENU_CONTAINER_MAP.get(menu.id).classList.remove('visible');
      }
    });
  };

  bindMenuEvent = (handleMenuButton) => {
    this.menus.forEach((menu) => {
      menu.addEventListener('click', (event) => {
        handleMenuButton(event);
      });
    });
  };
}
