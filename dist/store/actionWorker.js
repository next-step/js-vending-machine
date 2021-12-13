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
    ["purchase_chargeCoins" /* purchase_chargeCoins */]: (money) => {
        const charge = (store.get('charge') || 0) + money;
        const coins = saveCoinsCalculator(store, money);
        store.setValue({ charge, coins });
    },
    ["purchase_buyItem" /* purchase_buyItem */]: (itemIndex) => {
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
const actionWorkersWithValidator = (store) => {
    const worker = actionWorkers(store);
    return (actionType) => {
        const validChecker = validator[actionType];
        const dispatcher = worker[actionType];
        return (data) => {
            try {
                if (validChecker)
                    validChecker(data);
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