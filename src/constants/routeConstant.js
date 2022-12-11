import Buy from '../js/pages/buy/index.js';
import Charge from '../js/pages/charge/index.js';
import Manage from '../js/pages/manage/index.js';

export const ROUTES = [
  {
    path: '#product-manage-menu',
    name: 'Manage',
    components: Manage,
  },
  {
    path: '#vending-machine-manage-menu',
    name: 'Charge',
    components: Charge,
  },
  {
    path: '#product-purchase-menu',
    name: 'Buy',
    components: Buy,
  },
];
