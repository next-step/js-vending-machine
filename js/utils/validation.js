export class InputValidationError extends Error {
  target;

  constructor(target, message) {
    super(message);
    this.target = target;
  }

  static of(target, message) {
    throw new InputValidationError(target, message);
  }
}
