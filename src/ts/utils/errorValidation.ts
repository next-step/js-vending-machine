export class UserInputValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidStatusValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NoDataError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export type CustomErrorType = UserInputValidationError | InvalidStatusValidationError | NoDataError;
export const CustomErrors = [UserInputValidationError, InvalidStatusValidationError, NoDataError];
