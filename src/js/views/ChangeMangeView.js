import { $ } from '../utils/dom.js';
import SELECTOR from '../constants/selector.js';
import {
  changeAddFormTemplate,
  vendingMachineChargeAmount,
  vendingMachineTableTemplate,
} from '../templates/changeManageMenuTemplate.js';

class ChangeMangeView {
  render() {
    $(`#${SELECTOR.tabContentContainerId}`).innerHTML =
      changeAddFormTemplate +
      vendingMachineChargeAmount() +
      vendingMachineTableTemplate;
  }

  renderVendingMachineChargeAmount(amount) {
    $(`#${SELECTOR.vendingMachineChargeAmountId}`).innerText = `${amount}원`;
  }
}

export default ChangeMangeView;
