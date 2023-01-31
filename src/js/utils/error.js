export class ValidationError extends Error {
  constructor(message, from) {
    super(message);
    this.name = "ValidationError";
    this.from = from;
  }
}
