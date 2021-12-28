import Model from './model/index.js';
import { Controller } from './controllers/index.js';
import { ChargeForm } from './views/ChargeForm.js';
import { NewProductForm } from './views/NewProductForm.js';
import { ViewStateTabs } from './views/ViewStateTabs.js';

window.onerror = function (msg) {
  alert(msg.replace('Uncaught Error: ', ''));
  return true;
};

export const model = new Model();

export const chargeFormView = new ChargeForm();
export const newProductFormView = new NewProductForm();
export const viewStateTabsView = new ViewStateTabs();

new Controller();
