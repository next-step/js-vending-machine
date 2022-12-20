import { deepCopy, displayFlex, displayNone, getRandom, qs, setTemplate } from '../common/util.js';
import { $, COINS, EVENT } from '../common/const.js';
import { Component } from './component.js';

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
                selector: qs($.TAB.STOCK),
                event: EVENT.CLICK,
                callback: () => displayNone(this._$parent)
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
        this._init();
    }

    _init() {
        super._init();
        qs($.RECHARGE.AMOUNT).innerText = 0;
    }

    #rechargeCoins() {
        const amount = +qs($.RECHARGE.INPUTS.AMOUNT, this._$parent).value;

        try {
            this._validator.setRechargeErrors(amount);
        } catch (e) {
            return this._validator.catchErrors(e);
        }

        this._vendingMachine.recharge.totalCoins += +amount;
        this._vendingMachine.recharge.coins = this.#setCoinChanges();
        this.#renderAmount();
        this.#renderCoins();
    }

    #rechargeByEnterKey(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        this.#rechargeCoins();
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
        qs($.RECHARGE.AMOUNT).innerText = this._vendingMachine.recharge.totalCoins;
    }

    #renderCoins() {
        this._vendingMachine.recharge.coins.forEach(({ coin, quantity }) => {
            const tr = qs(`.recharge-${coin}`, this._$parent);
            if (!!tr) tr.parentNode.removeChild(tr);
            this.#renderCoin(coin, quantity);
        })
    }

    #renderCoin(coin, quantity) {
        setTemplate(qs($.RECHARGE.TABLE.TBODY, this._$parent), `<tr class="recharge-${coin}"></tr>`);
        setTemplate(qs(`.recharge-${coin}`, this._$parent),
            [`<td>${ coin }원</td>`, `<td>${ quantity }개</td>`].join(''));
    }

}