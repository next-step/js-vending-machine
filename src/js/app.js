import { StockComponent } from './controllers/stock.component.js';
import { VendingMachineModel } from './models/vending-machine.model.js';
import { RechargeComponent } from './controllers/recharge.component.js';
import { Validator } from './common/validator.js';

import { $ } from './common/const.js';
import { RECHARGE_CONTAINER, STOCK_CONTAINER } from './common/template.js';
import { qs, setTemplate } from './utils/view.js';

export class App {
    #container = {
        view: null,
        vendingMachine: new VendingMachineModel(),
        validator: new Validator()
    };

    init() {
        this.#initStock();
        this.#initRecharge();
    }

    #initStock() {
        setTemplate(qs($.APP), STOCK_CONTAINER);
        this.#container.view = qs($.STOCK.CONTAINER);
        if (!this.#container.view) return;

        new StockComponent(this.#container);
    }

    #initRecharge() {
        setTemplate(qs($.APP), RECHARGE_CONTAINER);
        this.#container.view = qs($.RECHARGE.CONTAINER);
        if (!this.#container.view) return;

        new RechargeComponent(this.#container);
    }
}