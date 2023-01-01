import { $ELEMENT } from '../../constants/element.js'
import { VENDING_MACHINE_INITIAL_STATE } from '../../constants/initialState.js'

export default class MenuView {
  $menus = document.querySelectorAll($ELEMENT.MENU);
  $appendingContainer = document.querySelector($ELEMENT.APPENDING_CONTAINER);
  $chargingContainer = document.querySelector($ELEMENT.CHARGING_CONTAINER);

  MENU_CONTAINER_MAP = new Map([
    ['product-manage-menu', this.$appendingContainer],
    ['vending-machine-manage-menu', this.$chargingContainer],
  ]);

  constructor() {
    this.renderTab({ tabId: VENDING_MACHINE_INITIAL_STATE.hashId });
  }

  renderTab = ({ tabId }) => {
    const { $menus, MENU_CONTAINER_MAP } = this;

    $menus.forEach((menu) => {
      if (menu.id === tabId) {
        menu.classList.add('active');
        MENU_CONTAINER_MAP.get(menu.id).classList.remove('invisible');
      } else {
        menu.classList.remove('active');
        MENU_CONTAINER_MAP.get(menu.id).classList.add('invisible');
      }
    });
  };

  bindMenuEvent = (handleMenuButton) => {
    this.$menus.forEach((menu) => {
      menu.addEventListener('click', (event) => {
        handleMenuButton(event);
      });
    });
  };
}
