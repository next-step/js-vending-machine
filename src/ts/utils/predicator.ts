import { CustomErrors, CustomErrorType } from '../utils/errorValidation';

export const isPredicatedElement = <T extends Element>(target: Element | null): target is T => {
  return target !== null;
};

export const isPredicatedError = (err: Error | unknown): err is CustomErrorType => {
  return CustomErrors.some(customError => err instanceof customError);
};
