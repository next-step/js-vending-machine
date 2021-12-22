import { createStore } from "./store.js";
import reducer from "./reducer.js";

const store = createStore(reducer);

export default store;
