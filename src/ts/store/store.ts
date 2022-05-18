export default class Store {
  constructor(params) {
    let self = this;

    self.actions = {};
    self.mutations = {};
    self.state = {};

    self.status = 'resting';

    if (params.hasOwnProperty('actions')) {
      self.actions = params.actions;
    }

    if (params.hasOwnProperty('mutations')) {
      self.mutations = params.mutations;
    }

    self.state = new Proxy(params.state || {}, {
      set(state, key, value) {
        // set value
        state[key] = value;
        // trace action
        console.log(`stateChange : ${key}: ${value}`);

        if (self.status !== 'mutation') {
          console.warn(`Use mutation key to mutate.`);
        }

        self.status = 'resting';

        return true;
      },
    });
  }
  /**
   * @description
   * Dispatcher for action
   * - Look in the actions collection and run the action, if success to find it.
   *
   * @param {string} actionKey
   * @param {mixed} payload
   * @returns {boolean}
   * @memberof Store
   */
  dispatch(actionKey, payload) {
    const self = this;

    //   check action exist
    if (typeof self.actions[actionKey] !== 'function') {
      console.error(`${actionKey} doesn't exist`);
      return false;
    }

    self.status = 'action';

    self.actions[actionKey](self, payload);

    return true;
  }

  commit(mutationKey, payload) {
    const self = this;

    // check mutation exist
    if (typeof self.mutation[mutationKey] === 'function') {
      console.log(`MutationKey doesn't exist.`);
      return false;
    }

    self.status = 'mutation';

    const newState = self.mutation[mutationKey](self.state, payload);
    self.state = Object.assign(self.state, newState);

    return true;
  }
}
