/**
 * @param {number} num - 만들고자 하는 배열의 길이.
 */
export const arr = (num) => Array(num).fill(0);

/**
 * @param {number} min - 랜덤숫자의 최소 범위.
 * @param {number} max - 랜덤숫자의 최대 범위.
 */
export const getRandom = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

/**
 * @param {any} item - 깊은 복사의 대상.
 */
export const deepCopy = (item) => JSON.parse(JSON.stringify(item));

/**
 * @param {HTMLElement} $element - display: none 시킬 요소
 */
export const displayNone = ($element) => $element.style.display = 'none';

/**
 * @param {Element[]} $elements - display: none 시킬 요소의 배열
 */
export const displayNones = ($elements) => $elements.forEach($element => displayNone($element));

/**
 * @param {HTMLElement} $element - display: block 시킬 요소
 */
export const displayBlock = ($element) => $element.style.display = 'block';

/**
 * @param {HTMLElement} $element - display: flex 시킬 요소
 */
export const displayFlex = ($element) => $element.style.display = 'flex';

/**
 * @param {string} className - querySelector 대상 class name
 * @param {HTMLElement | Document} $parent - querySelector 대상의 부모 요소
 */
export const qs = (className, $parent = document) => $parent.querySelector(className);

/**
 * @param {{
 * selector: Element,
 * event: string,
 * callback: function()
 * }} listeners - addEventListeners 에 추가할 Object 요소들
 */
export const setEventListener = ({ selector, event, callback }) => {
    selector.addEventListener(event, callback);
};

/**
 * @param {{
 * selector: Element,
 * event: string,
 * callback: function()
* }[]} listeners - addEventListeners 에 추가할 Object 요소들
 */
export const setEventListeners = (listeners) => {
    listeners.forEach(listener => setEventListener(listener));
};
