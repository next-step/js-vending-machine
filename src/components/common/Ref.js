class Ref {
  element = null;

  executeElementCallback = (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('only function can be accepted in executeElementCallback method of Ref object');
    }

    if (this.element) {
      callback(this.element);
    }
  }
}

export { Ref };
