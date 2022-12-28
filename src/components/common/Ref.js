class Ref {
  element = null;
  onRenderCallbacks = [];

  addOnRenderCallback = (onRenderCallback) => {
    if (typeof onRenderCallback !== 'function') {
      throw new Error('only function can be accepted in executeElementCallback method of Ref object');
    }

    this.onRenderCallbacks.push(onRenderCallback);
  }
}

export { Ref };
