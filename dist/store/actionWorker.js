import { InitialState, ErrorMsgs, ErrorBoundaries, } from '../constants.js';
import errorHandler from '../util/errorHandler.js';
import localStorageReducer from './localStorageReducer.js';
import { saveCoinsCalculator } from '../service/coinCalculator.js';
const actionWorkers = (store) => ({
    ["init" /* init */]: () => {
        const storedState = (localStorageReducer.getAll() || {});
        store.setValue({ ...InitialState, ...storedState }, false);
    },
    ["route_change" /* route_change */]: (route) => {
        store.setValue({ route });
    },
    ["inventory_setProduct" /* inventory_setProduct */]: (newProduct) => {
        const inventoryMap = new Map((store.get('inventory') || []).map(inventory => [inventory.name, inventory]));
        inventoryMap.set(newProduct.name, newProduct);
        const inventory = [...inventoryMap.values()];
        store.setValue({ inventory });
    },
    ["machine_saveCoins" /* machine_saveCoins */]: (money) => {
        const coins = saveCoinsCalculator(store, money);
        store.setValue({ coins });
    },
    ["user_chargeCoins" /* user_chargeCoins */]: (money) => {
        const charge = (store.get('charge') || 0) + money;
        const coins = saveCoinsCalculator(store, money);
        store.setValue({ charge, coins });
    },
    ["user_buyItem" /* user_buyItem */]: (itemIndex) => {
        const inventory = [...store.get('inventory')];
        const remains = (store.get('charge') || 0);
        const target = inventory[itemIndex];
        if (target.amount > 0 && target.price <= remains) {
            const charge = remains - target.price;
            inventory[itemIndex] = { ...target, amount: target.amount - 1 };
            store.setValue({ charge, inventory });
        }
    },
});
const validator = {
    ["inventory_setProduct" /* inventory_setProduct */]: ({ name, amount, price }) => {
        if (name.match(/\s/))
            return ErrorMsgs.inventory_SpaceBetween;
        if (price < ErrorBoundaries.inventory_PriceMinimum)
            return ErrorMsgs.inventory_PriceMinimum;
        if (price % ErrorBoundaries.inventory_PriceLimit > 0)
            return ErrorMsgs.inventory_PriceLimit;
        if (amount < ErrorBoundaries.inventory_AmountMinimum)
            return ErrorMsgs.inventory_AmountMinimum;
        return null;
    },
    ["machine_saveCoins" /* machine_saveCoins */]: (money) => {
        if (money < ErrorBoundaries.machine_PriceMinimum)
            return ErrorMsgs.machine_PriceMinimum;
        if (money % ErrorBoundaries.machine_PriceLimit > 0)
            return ErrorMsgs.machine_PriceLimit;
        return null;
    },
    ["user_chargeCoins" /* user_chargeCoins */]: (money) => {
        if (money < ErrorBoundaries.user_PriceMinimum)
            return ErrorMsgs.user_PriceMinimum;
        return null;
    },
};
const actionWorkersWithValidator = (store) => {
    const worker = actionWorkers(store);
    return (actionType) => {
        const validChecker = validator[actionType] || (() => null);
        const dispatcher = worker[actionType];
        return (data) => {
            try {
                const errorMsg = validChecker(data);
                if (errorMsg)
                    throw new Error(errorMsg);
                dispatcher(data);
            }
            catch (err) {
                errorHandler(`actionWorkers@${actionType}`, err);
            }
        };
    };
};
export default actionWorkersWithValidator;
//# sourceMappingURL=actionWorker.js.map