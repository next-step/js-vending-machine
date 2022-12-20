import { Component } from './component.js';

import {
    displayFlex,
    displayNone,
    qs,
    setTemplate
} from '../common/util.js';
import { $, EVENT } from '../common/const.js';

export class StockComponent extends Component {
    constructor(container) {
        super(container);
        this._listeners = [
            {
                selector: qs($.TAB.STOCK),
                event: EVENT.CLICK,
                callback: () => displayFlex(this._$parent)
            },
            {
                selector: qs($.TAB.RECHARGE),
                event: EVENT.CLICK,
                callback: () => displayNone(this._$parent)
            },
            {
                selector: qs($.TAB.PURCHASE),
                event: EVENT.CLICK,
                callback: () => displayNone(this._$parent)
            },
            {
                selector: qs($.STOCK.BUTTONS.ADD, this._$parent),
                event: EVENT.CLICK,
                callback: () => this.#addStock()
            },
        ];
        this._init();
    }

    _init() {
        super._init();
    }

    #addStock() {
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

        this.#renderStock(values);
        this.#setStock(values);
    }

    #setStock({ name, price, quantity }) {
        this._vendingMachine.stocks[name] = [price, quantity];
    }

    #renderStock({ name, price, quantity }) {
        if (!!this._vendingMachine.stocks.hasOwnProperty(name)) {
            qs(`.${name}`).remove();
        }

        setTemplate(qs($.STOCK.TABLE.TBODY, this._$parent), `<tr class="${name}"></tr>`);
        setTemplate(qs(`.${name}`, this._$parent),
            [name, price, quantity].map(value => `<td>${ value }</td>`).join(''));
    }
}
