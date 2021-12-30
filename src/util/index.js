export const $ = (selector, baseElement = document) => baseElement.querySelector(selector);

export const $$ = (selector, baseElement = document) => {
  return [...baseElement.querySelectorAll(selector)];
}

export const hasBlankString = (str) => {
  return new RegExp(/[\s]/g).test(str);
}

export const numberWithCommas = (number) => number.toLocaleString();

export const sumValuesOfObjects = (prevObj, nextObj) => (
  Object.entries(nextObj).reduce((newObj, [key, value]) => {
    newObj[key] = Number(prevObj[key]) + Number(value);
    return newObj;
  }, {})
)

export const subtractValuesOfObjects = (prevObj, nextObj) => (
  Object.entries(nextObj).reduce((newObj, [key, value]) => {
    newObj[key] = Number(prevObj[key]) - Number(value);
    return newObj;
  }, {})
)