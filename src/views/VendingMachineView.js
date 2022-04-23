import { vendingMachineTemplate } from '../templates/index.js';

import { $ } from '../utils/dom.js';

const VendingMachineView = {
  render: () => {
    $('body').innerHTML = vendingMachineTemplate();
  },
};

export default VendingMachineView;
