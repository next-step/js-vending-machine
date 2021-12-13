import { InitialState, CoinKeys, ErrorMsgs, ErrorBoundaries, } from '../constants.js';
import errorHandler from '../util/errorHandler.js';
import localStorageReducer from './localStorageReducer.js';
import { chargeCalculator } from '../service/coinCalculator.js';
const saveCoinsToMachine = (store, { money }) => {
    const coins = { ...store.get('coins') };
    const res = chargeCalculator(money);
    CoinKeys.forEach((key, i) => {
        coins[key] += res[i];
    });
    return coins;
};
const actionWorker = {
    ["init" /* init */]: store => {
        const storedState = (localStorageReducer.getAll() || {});
        store.setValue({ ...InitialState, ...storedState }, false);
    },
    ["route_change" /* route_change */]: (store, { route }) => {
        store.setValue({ route });
    },
    ["inventory_setProduct" /* inventory_setProduct */]: (store, newProduct) => {
        if (!validator["inventory_setProduct" /* inventory_setProduct */](newProduct))
            return;
        const inventoryMap = new Map((store.get('inventory') || []).map(inventory => [inventory.name, inventory]));
        inventoryMap.set(newProduct.name, newProduct);
        const inventory = [...inventoryMap.values()];
        store.setValue({ inventory });
    },
    ["machine_saveCoins" /* machine_saveCoins */]: (store, data) => {
        if (!validator["machine_saveCoins" /* machine_saveCoins */](data.money))
            return;
        const coins = saveCoinsToMachine(store, data);
        store.setValue({ coins });
    },
    ["purchase_chargeCoins" /* purchase_chargeCoins */]: (store, data) => {
        const charge = (store.get('charge') || 0) + data.money;
        const coins = saveCoinsToMachine(store, data);
        store.setValue({ charge, coins });
    },
    ["purchase_buyItem" /* purchase_buyItem */]: (store, { itemIndex }) => {
        const inventory = [...store.get('inventory')];
        const remains = (store.get('charge') || 0);
        const target = inventory[itemIndex];
        if (target.amount > 0 && target.price <= remains) {
            const charge = remains - target.price;
            inventory[itemIndex] = { ...target, amount: target.amount - 1 };
            store.setValue({ charge, inventory });
        }
    },
};
const validator = {
    ["inventory_setProduct" /* inventory_setProduct */]: ({ name, amount, price }) => {
        let errorMsg = null;
        if (name.match(/\s/))
            errorMsg = ErrorMsgs.inventory_SpaceBetween;
        if (price < ErrorBoundaries.inventory_PriceMinimum)
            errorMsg = ErrorMsgs.inventory_PriceMinimum;
        if (price % ErrorBoundaries.inventory_PriceLimit > 0)
            errorMsg = ErrorMsgs.inventory_PriceLimit;
        if (amount < ErrorBoundaries.inventory_AmountMinimum)
            errorMsg = ErrorMsgs.inventory_AmountMinimum;
        if (errorMsg)
            throw Error(errorMsg);
        return true;
    },
    ["machine_saveCoins" /* machine_saveCoins */]: (money) => {
        let errorMsg = null;
        if (money < ErrorBoundaries.machine_PriceMinimum)
            errorMsg = ErrorMsgs.machine_PriceMinimum;
        if (money % ErrorBoundaries.machine_PriceLimit > 0)
            errorMsg = ErrorMsgs.machine_PriceLimit;
        if (errorMsg)
            throw Error(errorMsg);
        return true;
    },
};
const actionWorkerWithValidation = (dispatcher, actionType) => (store, data) => {
    try {
        dispatcher(store, data);
    }
    catch (err) {
        errorHandler(`actionWorker@${actionType}`, err);
    }
};
export default (actionType) => {
    const workerItem = actionWorker[actionType];
    if (!workerItem)
        return () => { };
    return actionWorkerWithValidation(workerItem, actionType);
};
//# sourceMappingURL=actionWorker.js.map