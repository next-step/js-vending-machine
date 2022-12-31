/* eslint-disable class-methods-use-this */
export default class Subject {
  constructor() {
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
  }

  notice(observer) {
    observer.setState();
  }

  notifyAll() {
    this.observers.forEach(observer => this.notice(observer));
  }
}
