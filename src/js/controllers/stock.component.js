import {
    displayFlex,
    displayNone,
    qs,
    setEventListeners
} from '../common/util.js';
import { $, EVENT } from '../common/const.js';
import { Validator } from '../common/validator.js';
import { VendingMachineModel } from '../models/vending-machine.model.js';

export class StockComponent {
    #listeners;
    validator;
    vendingMachine;

    constructor() {
        this.#listeners = [
            {
                selector: qs($.STOCK.BUTTONS.MENU),
                event: EVENT.CLICK,
                callback: () => this.showStock()
            },
            {
                selector: qs($.STOCK.BUTTONS.ADD),
                event: EVENT.CLICK,
                callback: () => this.addStock()
            }
        ];
        this.init();
    }

    init() {
        this.validator = new Validator();
        this.vendingMachine = new VendingMachineModel();
        displayNone(qs($.STOCK.CONTAINER));
        setEventListeners(this.#listeners);
    }

    showStock() {
        displayFlex(qs($.STOCK.CONTAINER));
    }

    addStock() {
        const values = {
            name: qs($.STOCK.INPUTS.NAME).value,
            price: qs($.STOCK.INPUTS.PRICE).value,
            quantity: qs($.STOCK.INPUTS.QUANTITY).value
        };

        try {
            this.validator.setStockErrors(values);
        } catch (e) {
            return this.validator.catchErrors(e);
        }

        this.renderStock(values);
        this.setStock(values);
    }

    setStock({ name, price, quantity }) {
        this.vendingMachine.stocks[name] = [price, quantity];
    }

    renderStock({ name, price, quantity }) {
        if (!!this.vendingMachine.stocks.hasOwnProperty(name)) {
            qs(`.${name}`).remove();
        }

        qs($.STOCK.TABLE.TBODY)
            .insertAdjacentHTML('beforeend', `<tr class="${name}"></tr>`);

        qs(`.${name}`)
            .insertAdjacentHTML('beforeend',
                [name, price, quantity].map(value => `<td>${ value }</td>`).join(''));
    }
}
