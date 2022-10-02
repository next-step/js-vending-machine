const removeSpaces = string => string.replace(/\s/g, '');

const coinRandomRange = range => Math.floor(Math.random() * (range + 1));

export { removeSpaces, coinRandomRange };
