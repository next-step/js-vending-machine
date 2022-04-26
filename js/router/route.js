import Charge from "../views/Charge.js";
import Product from "../views/Product.js";
import Purchase from "../views/Purchase.js";


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
