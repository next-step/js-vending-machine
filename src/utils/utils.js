export function entryObject(o) {
  if (typeof o !== 'object') throw new Error('only Object can entry in entryObject function');

  return Object.entries(o);
}

export function isNil(target) {
  return typeof target === 'undefined' || target === null;
}

export function divideNumberInCountOfDivideLevels(totalAmount, divideLevels) {
  if (divideLevels.some((divideLevel) => typeof divideLevel !== 'number')) {
    throw new Error('divideLevels should be consisted in numbers');
  }

  if (divideLevels.some((divideLevel, i) => {
    if (i > 0) {
      const prevDivideLevel = divideLevels[i - 1];
      return prevDivideLevel <= divideLevel;
    }
    return false;
  })) {
    throw new Error('divideLevels should be sorted in descending order');
  }

  let currentTotalAmount = totalAmount;
  return divideLevels.map((divideLevel, i) => {
    const count = Math.floor(currentTotalAmount / divideLevel);
    currentTotalAmount -= count * divideLevel;

    return count;
  });
}
