type StoreStatus = 'action' | 'mutation' | 'resting';

export default class Store {
  private status: StoreStatus;
  private actions;
  private mutations;
  private state;

  constructor(params) {
    this.actions = params.actions || {};
    this.mutations = params.mutations || {};
    this.state = params.state || {};
    this.status = 'resting';

    let self = this;

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
  dispatch = (actionKey: string, payload: unknown) => {
    const self = this;

    if (typeof self.actions[actionKey] !== 'function') {
      throw new Error(`${actionKey} doesn't exist`);
    }

    self.status = 'action';

    return self.actions[actionKey](self, payload);
  };

  commit = (mutationKey: string, payload: unknown) => {
    const self = this;

    if (typeof self.mutations[mutationKey] !== 'function') {
      throw new Error(`${mutationKey} doesn't exist`);
    }

    self.status = 'mutation';

    const newState = self.mutations[mutationKey](self.state, payload);
    self.state = Object.assign(self.state, newState);
  };
}
