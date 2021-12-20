import { connectStore } from './index.js';
export default class ViewStore {
    #prevState = {};
    #view;
    constructor(view) {
        this.#view = view;
        connectStore().register(this);
    }
    update(state) {
        const watchStateKeys = this.#view.watchState || [];
        const updatedKeys = new Set();
        const updatedState = watchStateKeys.reduce((p, k) => {
            if (state[k] !== this.#prevState[k]) {
                updatedKeys.add(k);
                p[k] = state[k];
            }
            return p;
        }, {});
        if (updatedKeys.size) {
            this.#prevState = state;
            this.#view.onStoreUpdated(updatedState);
        }
    }
    deregister() {
        connectStore().deregister(this);
    }
}
//# sourceMappingURL=viewStore.js.map