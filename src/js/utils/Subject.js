const observers = new Set();

const subject = {
  subscribe: observer => {
    observers.add(observer);
  },

  unsubscribe: observer => {
    observers.delete(observer);
  },

  notice: observer => {
    observer.setState();
  },

  notifyAll: () => {
    observers.forEach(observer => subject.notice(observer));
  },
};

export default subject;
