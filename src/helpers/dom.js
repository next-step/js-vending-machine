const $wrapper = document.createElement('template');

export const $element = html => {
  $wrapper.replaceChildren();
  $wrapper.insertAdjacentHTML('afterbegin', html);
  return $wrapper.firstElementChild;
};

export const $focus = target => document.querySelector(target).focus();
