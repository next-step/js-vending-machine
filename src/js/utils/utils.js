export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
export const test$ = (selector) => `[data-testid="${selector}"]`;

export const show = ($target) => {
  $target.style.display = '';
};

export const hide = ($target) => {
  $target.style.display = 'none';
};

export const createRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1)) + min;
