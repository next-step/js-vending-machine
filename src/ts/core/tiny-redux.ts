export function createStore<T = {}>(
  reducer: IReducer<T>,
  initialState: T = {} as T,
  middlewareList: IMiddleware<T>[] = []
): IStore<T> {
  let state: T = initialState;
  const listeners: IListener[] = [];

  const publish = () => {
    listeners.forEach(({ subscriber, context }) => {
      subscriber.call(context);
    });
  };

  const dispatch = (action: IAction) => {
    state = reducer(state, action);
    publish();
  };

  const subscribe = (subscriber: Function, context?: any) => {
    listeners.push({ subscriber, context });
  };

  const getState = (): T => ({ ...state });

  const store: IStore<T> = {
    getState,
    subscribe,
    dispatch,
  };

  let lastDispatch = dispatch;
  middlewareList.reverse().forEach((middleware) => {
    lastDispatch = middleware(store)(lastDispatch);
  });

  return {
    ...store,
    dispatch: lastDispatch,
  };
}

export const actionCreator = (type: string, payload = {}): IAction => ({
  type,
  payload: { ...payload },
});

export interface IStore<T> {
  getState(): T;
  subscribe(subscriber: Function, context?: any): void;
  dispatch(action: IAction): void;
}

export interface IMiddleware<T = {}> {
  (store: IStore<T>): (next: Function) => (action: IAction) => void;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IReducer<T> {
  (state: T, action: IAction): T;
}

interface IListener {
  subscriber: Function;
  context: any;
}
