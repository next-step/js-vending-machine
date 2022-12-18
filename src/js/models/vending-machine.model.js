export class VendingMachineModel {
    stocks = [];
    constructor() {
        this.stocks = this.setStock();
    }

    setStock() {
        return new Proxy(this.stocks, {
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