/**
 * @param {number} min - 랜덤숫자의 최소 범위.
 * @param {number} max - 랜덤숫자의 최대 범위.
 */
export const getRandom = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);
