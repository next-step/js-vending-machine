import { vendingMachineManageTabTemplate } from '../templates/index.js';

import { $ } from '../utils/dom.js';

const VendingMachineManageView = {
  render: () => {
    $('main').innerHTML = vendingMachineManageTabTemplate();
  },
};

export default VendingMachineManageView;
