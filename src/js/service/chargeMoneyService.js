export const validateInputAmount = (amountString) => {
  if (amountString.length === 0) throw Error('none val');

  const amount = Number(amountString);

  if (amount < 100) throw Error('min');
  if (amount > 100000000) throw Error('max');
  if (amount % 10 !== 0) throw Error('division by ten');
};
