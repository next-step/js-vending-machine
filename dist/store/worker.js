import { StateKey, InitialState } from '../constants.js';
import errorHandler from '../util/errorHandler.js';
import storage from './storage.js';
import { Actions } from './actions.js';
export const ErrorMsgs = {
    inventory_spaceBetween: '공백 불가',
    inventory_PriceMinimum: '최소금액은 100원',
    inventory_PriceLimit: '10원 이하 입력 불가',
    inventory_AmountMinimum: '수량은 1개 이상',
};
const validationChecker = {
    [Actions.inventory_addProduct]: ({ name, amount, price }) => {
        let errorMsg;
        if (name.match(/\s/))
            errorMsg = ErrorMsgs.inventory_spaceBetween;
        if (price < 100)
            errorMsg = ErrorMsgs.inventory_PriceMinimum;
        if (price % 10 > 0)
            errorMsg = ErrorMsgs.inventory_PriceLimit;
        if (amount <= 0)
            errorMsg = ErrorMsgs.inventory_AmountMinimum;
        if (!errorMsg)
            return true;
        throw Error(errorMsg);
    },
};
const worker = {
    [Actions.init]: store => {
        const storedState = (storage.getAll() || {});
        store.setValue({ ...InitialState, ...storedState }, false);
    },
    [Actions.route_change]: (store, { route }) => {
        store.setValue({ route });
    },
    [Actions.inventory_addProduct]: (store, newProduct) => {
        if (!validationChecker[Actions.inventory_addProduct](newProduct))
            return;
        const inventoryMap = new Map((store.get(StateKey.inventory) || []).map(inventory => [inventory.name, inventory]));
        inventoryMap.set(newProduct.name, newProduct);
        const inventory = [...inventoryMap.values()];
        store.setValue({ inventory });
    },
};
const workerWithErrorCatcher = (dispatcher, actionType) => (store, data) => {
    try {
        dispatcher(store, data);
    }
    catch (err) {
        errorHandler(`worker@${actionType}`, err);
    }
};
export default (actionType) => {
    const workerItem = worker[actionType];
    if (!workerItem)
        return () => { };
    return workerWithErrorCatcher(workerItem, actionType);
};
//# sourceMappingURL=worker.js.map