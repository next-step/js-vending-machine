import Charge from '../charge/view/Charge.js';
import Product from '../product/view/Product.js';
import Purchase from '../purchase/view/Purchase.js';

const routes = [
  {
    path: 'product',
    view: Product,
  },
  {
    path: 'charge',
    view: Charge,
  },
  {
    path: 'purchase',
    view: Purchase,
  },
];

export default routes;
