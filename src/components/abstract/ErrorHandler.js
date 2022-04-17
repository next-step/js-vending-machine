class ErrorHandler extends Error {
  errorStack = [];

  constructor(name, message, stack) {
    super(name, message, stack);

    window.addEventListener('error', this.stackToLog);
  }

  stackToLog = event => {
    this.errorStack.push(event);
  };

  printStackLog = () => {
    this.errorStack.forEach(console.log);
  };
}

export default new ErrorHandler();
