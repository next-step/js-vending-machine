export const $ = (selector, baseElement = document) => baseElement.querySelector(selector);

export const $$ = (selector, baseElement = document) => {
  return [...baseElement.querySelectorAll(selector)];
}

export const hasBlankString = (str) => {
  return new RegExp(/[\s]/g).test(str);
}
