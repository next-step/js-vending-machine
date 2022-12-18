/* eslint-disable max-classes-per-file */
export class CustomError extends Error {
  constructor(message, name) {
    super(message);
    this.message = message;
    this.name = name;
  }
}

export class EmptyInputError extends CustomError {
  constructor(message) {
    super(message, 'EmptyInputError');
  }
}

export class InvalidValueError extends CustomError {
  constructor(message) {
    super(message, 'InvalidValueError');
  }
}
