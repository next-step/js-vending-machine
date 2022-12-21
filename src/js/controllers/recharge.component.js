import { Component } from './component.js';

import { $, COINS, EVENT, STORAGE_KEY } from '../common/const.js';
import { deepCopy, getLocalStorage, setLocalStorage } from '../utils/util.js';
import { getRandom } from '../utils/number.js';
import { displayFlex, displayNone, qs, removeAll, setTemplate } from '../utils/view.js';

export class RechargeComponent extends Component {
    constructor(container) {
        super(container);
        this._listeners = [
            {
                selector: qs($.TAB.RECHARGE),
                event: EVENT.CLICK,
                callback: () => displayFlex(this._$parent),
            },
            {
                selector: qs($.RECHARGE.BUTTONS.RECHARGE, this._$parent),
                event: EVENT.CLICK,
                callback: () => this.#rechargeCoins()
            },
            {
                selector: qs($.RECHARGE.INPUTS.AMOUNT),
                event: EVENT.KEYUP,
                callback: (e) => this.#rechargeByEnterKey(e)
            },
        ];

        this._listeners.push(...[qs($.TAB.STOCK), qs($.TAB.PURCHASE)].map(selector => {
            return {
                selector,
                event: EVENT.CLICK,
                callback: () => displayNone(this._$parent)
            }
        }));

        this._init();
    }

    _init() {
        super._init();
    }

    _initState() {
        this._vendingMachine.recharge = getLocalStorage(STORAGE_KEY.RECHARGE) ?? this._vendingMachine.recharge;
        this.#renderAmount();

        if (this._validator.hasObjectLength(this._vendingMachine.recharge)) this.#renderCoins();
    }

    #rechargeCoins() {
        const amount = +qs($.RECHARGE.INPUTS.AMOUNT, this._$parent).value;

        try {
            this._validator.setRechargeErrors(amount);
        } catch (e) {
            return this._validator.catchErrors(e);
        }

        this.#setRechargeState(amount);
        this.#renderAmount();
        this.#renderCoins();
    }

    #rechargeByEnterKey(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        this.#rechargeCoins();
    }

    #setRechargeState(amount) {
        this._vendingMachine.recharge.totalCoins += amount;
        this._vendingMachine.recharge.coins = this.#setCoinChanges();
        setLocalStorage(STORAGE_KEY.RECHARGE, this._vendingMachine.recharge);
    }

    #setCoinChanges() {
        let coins = deepCopy(COINS);
        let amount = this._vendingMachine.recharge.totalCoins;
        while (amount > 0) {
            coins = coins.map(({ coin, quantity }) => {
                if (amount === 0) return { coin, quantity };
                const max = Math.floor(amount / coin);
                const unit = getRandom(0, max);
                quantity += unit;
                amount -= coin * unit;
                return { coin, quantity };
            })
        }
        return coins;
    }

    #renderAmount() {
        qs($.RECHARGE.AMOUNT).innerText = this._vendingMachine.recharge.totalCoins ?? 0;
    }

    #renderCoins() {
        this._vendingMachine.recharge.coins.forEach(({ coin, quantity }) => {
            const tr = qs(`.recharge-${coin}`, this._$parent);
            if (!!tr) removeAll(tr);
            this.#renderCoin(coin, quantity);
        })
    }

    #renderCoin(coin, quantity) {
        setTemplate(qs($.RECHARGE.TABLE.TBODY, this._$parent), `<tr class="recharge-${coin}"></tr>`);
        setTemplate(qs(`.recharge-${coin}`, this._$parent),
            [`<td>${ coin }원</td>`, `<td>${ quantity }개</td>`].join(''));
    }

}