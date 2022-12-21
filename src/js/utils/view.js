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
 * @param {HTMLElement} $element - insertAdjacentHTML의 대상 요소
 * @param {string} template - insertAdjacentHTML으로 추가될 HTML 스트링 태그
 */
export const setTemplate = ($element, template) => $element.insertAdjacentHTML('beforeend', template);

/**
 * @param {HTMLElement} $element - 제거 대상 요소
 */
export const removeAll = ($element) => $element.parentNode.removeChild($element);

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
