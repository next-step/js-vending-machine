import { CustomErrors, CustomErrorType } from '../utils/errorValidation';

export const isPredicatedElement = (target: Element | null): target is Element => {
  return target instanceof Element;
};

export const isPredicatedError = (err: Error | unknown): err is CustomErrorType => {
  return CustomErrors.some(customError => err instanceof customError);
};
