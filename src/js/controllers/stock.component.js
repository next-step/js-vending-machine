import { Component } from './component.js';

import {
    displayFlex,
    displayNone,
    qs,
    setEventListeners
} from '../common/util.js';
import { $, EVENT } from '../common/const.js';

export class StockComponent extends Component {
    #listeners;

    constructor(container) {
        super(container);
        this.#listeners = [
            {
                selector: qs($.TAB.STOCK),
                event: EVENT.CLICK,
                callback: () => this.showStock()
            },
            {
                selector: qs($.STOCK.BUTTONS.ADD, this._$parent),
                event: EVENT.CLICK,
                callback: () => this.addStock()
            }
        ];
        this._init();
    }

    _init() {
        displayNone(qs($.STOCK.CONTAINER));
        setEventListeners(this.#listeners);
    }

    showStock() {
        displayFlex(qs($.STOCK.CONTAINER));
    }

    addStock() {
        const values = {
            name: qs($.STOCK.INPUTS.NAME, this._$parent).value,
            price: qs($.STOCK.INPUTS.PRICE, this._$parent).value,
            quantity: qs($.STOCK.INPUTS.QUANTITY, this._$parent).value
        };

        try {
            this._validator.setStockErrors(values);
        } catch (e) {
            return this._validator.catchErrors(e);
        }

        this.renderStock(values);
        this.setStock(values);
    }

    setStock({ name, price, quantity }) {
        this._vendingMachine.stocks[name] = [price, quantity];
    }

    renderStock({ name, price, quantity }) {
        if (!!this._vendingMachine.stocks.hasOwnProperty(name)) {
            qs(`.${name}`).remove();
        }

        qs($.STOCK.TABLE.TBODY, this._$parent)
            .insertAdjacentHTML('beforeend', `<tr class="${name}"></tr>`);

        qs(`.${name}`, this._$parent)
            .insertAdjacentHTML('beforeend',
                [name, price, quantity].map(value => `<td>${ value }</td>`).join(''));
    }
}
