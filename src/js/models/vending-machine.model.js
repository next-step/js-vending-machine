export class VendingMachineModel {
    stocks = {};
    recharge = {
        totalCoins: 0,
        coins: []
    }
    constructor() {
        this.stocks = this.setState(this.stocks);
        this.recharge = this.setState(this.recharge);
        console.log(this.recharge);
    }

    setState(state) {
        return new Proxy(state, {
            get(target, prop) {
                return target[prop];
            },
            set(target, prop, value) {
                Reflect.set(target, prop, value);

                return true;
            }
        });
    }
}