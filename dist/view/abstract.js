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
    hide() {
        this.style.display = 'none';
        return this;
    }
    show() {
        this.style.display = '';
        return this;
    }
    connectedCallback() {
        if (this.watchState) {
            this.viewStore = new ViewStore(this);
        }
    }
    disconnectedCallback() {
        if (this.watchState) {
            this.viewStore.deregister();
        }
    }
}
//# sourceMappingURL=abstract.js.map