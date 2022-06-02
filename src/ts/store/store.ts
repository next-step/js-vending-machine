import type Actions from './actions';
import type Mutations from './mutations';

type StoreStatus = 'action' | 'mutation' | 'resting';

export interface StoreInterface {
  readonly commit: <T>(mutationKey: keyof typeof Mutations, payload?: T) => void;
  readonly dispatch: <T>(actionKey: keyof typeof Actions, payload?: T) => unknown;
}

export default class implements StoreInterface {
  state: State;
  private status: StoreStatus;
  private actions;
  private mutations;

  constructor(params: { actions: typeof Actions; mutations: typeof Mutations; state: State }) {
    this.actions = params.actions || {};
    this.mutations = params.mutations || {};
    this.state = params.state || {};
    this.status = 'resting';

    const self = this;

    self.state = new Proxy(this.state || {}, {
      set(state, key: keyof State, value) {
        if (self.status !== 'mutation') {
          console.warn(`Status is not 'mutation'. State can be modified only 'mutation' status.`);
          return false;
        }

        state[key] = value;

        self.status = 'resting';

        return true;
      },
    });
  }

  dispatch = <T>(actionKey: keyof typeof Actions, payload: T): unknown => {
    const self = this;

    if (typeof self.actions[actionKey] !== 'function') {
      throw new Error(`${actionKey} doesn't exist`);
    }

    self.status = 'action';

    return self.actions[actionKey](self, payload);
  };

  commit = <T>(mutationKey: keyof typeof Mutations, payload?: T) => {
    const self = this;

    if (typeof self.mutations[mutationKey] !== 'function') {
      throw new Error(`${mutationKey} doesn't exist`);
    }

    self.status = 'mutation';

    const newState = self.mutations[mutationKey](self.state, payload);
    self.state = Object.assign(self.state, newState);
  };
}
