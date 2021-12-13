import { ErrorMsgs } from '../constants.js';
import localStorageReducer from './localStorageReducer.js';
import errorHandler from '../util/errorHandler.js';
export default class Store {
    #subscribers = new Set();
    #state;
    #worker;
    constructor(container, worker) {
        this.#worker = worker;
        container.addEventListener('dispatch', ({ detail: { actionType, data } }) => {
            this.dispatch(actionType, data);
        });
    }
    dispatch(actionType, data = {}) {
        console.info(`%c[[%c${actionType}%c]]`, 'color: #ee8', 'color: #8ee', 'color: #ee8', data);
        this.#worker(actionType)(this, data);
    }
    register(viewStore) {
        this.#subscribers.add(viewStore);
    }
    deregister(viewStore) {
        this.#subscribers.delete(viewStore);
    }
    publish() {
        this.#subscribers.forEach((subscriber) => {
            subscriber.update(this.#state);
        });
    }
    setValue(state, needUpdate = true) {
        window.requestAnimationFrame(() => {
            this.#state = { ...this.#state, ...state };
            if (needUpdate) {
                const newStorage = Object.entries(state);
                newStorage.forEach(([k, v]) => localStorageReducer.set(k, v));
            }
            this.publish();
        });
    }
    get(prop) {
        return this.#state[prop];
    }
}
export const connectStore = (() => {
    let closureStore;
    return (elem, worker) => {
        try {
            if (!closureStore) {
                if (!elem || !worker)
                    throw Error(ErrorMsgs.store_InitError);
                closureStore = new Store(elem, worker);
            }
        }
        catch (err) {
            errorHandler('store', err);
        }
        return closureStore;
    };
})();
//# sourceMappingURL=index.js.map