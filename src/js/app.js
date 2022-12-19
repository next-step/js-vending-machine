import { StockComponent } from './controllers/stock.component.js';
import { VendingMachineModel } from './models/vending-machine.model.js';
import { RechargeComponent } from './controllers/recharge.component.js';
import { Validator } from './common/validator.js';
import { qs } from './common/util.js';
import { $ } from './common/const.js';

export class App {
    vendingMachine;
    validator;

    constructor() {
        this.vendingMachine = new VendingMachineModel();
        this.validator = new Validator();
    }

    init() {
        const stockComponent = new StockComponent({
            $parent: qs($.STOCK.CONTAINER),
            vendingMachine: this.vendingMachine,
            validator: this.validator
        });
        const rechargeComponent = new RechargeComponent(this.vendingMachine);
    }
}