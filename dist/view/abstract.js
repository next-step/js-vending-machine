import ViewStore from '../store/viewStore.js';
import el from '../util/dom.js';
import errorHandler from '../util/errorHandler.js';
const eventHandlerWithValidation = (handler) => (e) => {
    try {
        handler(e);
    }
    catch (err) {
        errorHandler('view', err);
    }
};
export default class View extends HTMLElement {
    events = new Map();
    viewStore;
    watchState;
    onStoreUpdated(updatedState) { }
    handlers;
    constructor() {
        super();
        this.#addHandlers();
    }
    on(eventType, handler) {
        let cb = this.events.get(handler);
        if (!cb) {
            cb = eventHandlerWithValidation(handler);
            this.events.set(handler, cb);
        }
        this.addEventListener(eventType, cb);
        return this;
    }
    off(eventType, handler) {
        const cb = this.events.get(handler);
        if (cb)
            this.removeEventListener(eventType, cb);
        return this;
    }
    dispatch(actionType, data = null) {
        const event = new CustomEvent('dispatch', { detail: { actionType, data }, bubbles: true });
        this.dispatchEvent(event);
        return this;
    }
    render(children) {
        el(this, children instanceof Array ? children : [children]);
        return this;
    }
    #addHandlers() {
        if (this.handlers?.length) {
            this.handlers.forEach(([eventType, handler]) => {
                this.on(eventType, handler);
            });
        }
    }
    connectedCallback() {
        if (this.watchState) {
            this.viewStore = new ViewStore(this);
        }
        this.#addHandlers();
    }
    disconnectedCallback() {
        if (this.watchState) {
            this.viewStore.deregister();
        }
        if (this.handlers?.length) {
            this.handlers.forEach(([eventType, handler]) => {
                this.off(eventType, handler);
            });
        }
    }
}
//# sourceMappingURL=abstract.js.map