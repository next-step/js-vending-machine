import { menuButtonContainerTemplate, tabContentsContainerTemplate, vendingMachineTitleTemplate } from '../templates/common.js';
import SELECTOR from '../constants/selector.js';
import {$} from '../utils/dom.js';

class VendingMachineView {
  constructor() {
    this.render();
  }

  render() {
    $(`#${SELECTOR.vendingMachineApp}`).innerHTML = 
      vendingMachineTitleTemplate +
      menuButtonContainerTemplate +
      tabContentsContainerTemplate;
  }
}

export default VendingMachineView;