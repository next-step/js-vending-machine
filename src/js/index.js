import { STORAGE } from '../constants/storage.js';
import ChargeController from './controller/chargeController.js';
import MenuController from './controller/menuController.js';
import ProductController from './controller/productController.js';
import VendingMachineModel from './model/vendingMachineModel.js';
import storage from './utils/storage.js';
import ChargeView from './view/chargeView.js';
import MenuView from './view/menuView.js';
import ProductView from './view/productView.js';

const vendingMachineModel = new VendingMachineModel();
new MenuController({ model: vendingMachineModel, view: new MenuView() });
new ProductController({ model: vendingMachineModel, view: new ProductView() });
new ChargeController({ model: vendingMachineModel, view: new ChargeView() });

window.onbeforeunload = () => {
  storage.setStorage({ id: STORAGE.KEY, value: vendingMachineModel.state });
  return;
};
