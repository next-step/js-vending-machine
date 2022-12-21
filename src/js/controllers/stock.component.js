import { Component } from './component.js';

import {
    displayFlex,
    displayNone,
    qs, removeAll,
    setTemplate
} from '../utils/view.js';
import { $, EVENT, STORAGE_KEY } from '../common/const.js';
import { getLocalStorage, setLocalStorage } from '../utils/util.js';

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
                selector: qs($.STOCK.BUTTONS.ADD, this._$parent),
                event: EVENT.CLICK,
                callback: () => this.#addStock()
            },
        ];

        this._listeners.push(...[qs($.TAB.RECHARGE), qs($.TAB.PURCHASE)].map(selector => {
            return {
                selector,
                event: EVENT.CLICK,
                callback: () => displayNone(this._$parent)
            }
        }));

        this._listeners.push(...[qs($.STOCK.INPUTS.NAME), qs($.STOCK.INPUTS.PRICE), qs($.STOCK.INPUTS.QUANTITY)]
            .map(selector => {
            return {
                selector,
                event: EVENT.KEYUP,
                callback: (e) => this.#rechargeByEnterKey(e)
            }
        }));

        this._init();
    }

    _init() {
        super._init();
    }

    _initState() {
        this._vendingMachine.stocks = getLocalStorage(STORAGE_KEY.STOCK) ?? {};
        if (this._validator.hasObjectLength(this._vendingMachine.stocks)) this.#renderTable();
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
    }

    #rechargeByEnterKey(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        this.#addStock();
    }

    #setStock({ name, price, quantity }) {
        this._vendingMachine.stocks[name] = [price, quantity];
        setLocalStorage(STORAGE_KEY.STOCK, this._vendingMachine.stocks);
    }

    #renderStock(values) {
        if (!!this._vendingMachine.stocks?.hasOwnProperty(values.name)) {
            removeAll(qs(`.${values.name}`));
        }

        this.#setStock(values);
        this.#renderTable();
    }

    #renderTable() {
        if (!this._vendingMachine.stocks) return;
        const stocks = Object.entries(this._vendingMachine.stocks);

        stocks.forEach(([name, [price, quantity]]) => {
            if (!!qs(`.${name}`)) return;
            setTemplate(qs($.STOCK.TABLE.TBODY, this._$parent), `<tr class="${name}"></tr>`);
            setTemplate(qs(`.${name}`, this._$parent),
                [name, price, quantity].map(value => `<td>${ value }</td>`).join(''));
        });
    }
}
