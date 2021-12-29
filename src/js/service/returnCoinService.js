export const createNewReturnCoinTable = (amount, returnCoins) => {
  const newReturnCoins = { ...returnCoins };

  [500, 100, 50, 10].forEach((coin) => {
    while (true) {
      if (amount - coin < 0) return;
      newReturnCoins[coin] += 1;
      amount -= coin;
    }
  });
  return {
    returnCoins: newReturnCoins,
    amount,
  };
};
