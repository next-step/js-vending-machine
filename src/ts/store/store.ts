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
        if (self.status !== 'mutation') {
          console.warn(`Status is not 'mutation'. State can be modified only 'mutation' status.`);
          return;
        }

        state[key] = value;

        console.log(`stateChange : ${key} changed to ${JSON.stringify(value)}`);

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
  dispatch = (actionKey, payload) => {
    const self = this;

    if (typeof self.actions[actionKey] !== 'function') {
      throw new Error(`${actionKey} doesn't exist`);
    }

    self.status = 'action';

    return self.actions[actionKey](self, payload);
  };

  commit = (mutationKey, payload) => {
    const self = this;

    if (typeof self.mutations[mutationKey] !== 'function') {
      throw new Error(`${mutationKey} doesn't exist`);
    }

    self.status = 'mutation';

    const newState = self.mutations[mutationKey](self.state, payload);
    self.state = Object.assign(self.state, newState);
  };
}

