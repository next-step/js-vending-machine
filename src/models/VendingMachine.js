const COINS = [500, 100, 50, 10];

export class VendingMachine {
  amount = 0;
  coin500 = 0;
  coin100 = 0;
  coin50 = 0;
  coin10 = 0;

  constructor({ amount, coin500, coin100, coin50, coin10 }) {
    this.amount = amount;
    this.coin500 = coin500;
    this.coin100 = coin100;
    this.coin50 = coin50;
    this.coin10 = coin10;
  }

  // 이 메소드는 prototype에 공통으로 가져야하기 보다는 정확히 자신의 데이터를 잘 바꿔야한다.
  addAmount = (amount) => {
    this.amount += amount;
    const [
      coin500Count,
      coin100Count,
      coin50Count,
      coin10Count,
    ] = this.#divideNumberInDivideLevelsRandomly(amount, COINS);
    this.coin500 += coin500Count;
    this.coin100 += coin100Count;
    this.coin50 += coin50Count;
    this.coin10 += coin10Count;
  }

  #divideNumberInDivideLevelsRandomly(totalAmount, divideLevels) {
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
      const maxCount = Math.floor(currentTotalAmount / divideLevel);
      let coinCount = maxCount;
      if (i !== divideLevels.length - 1) {
        const randomCoinCount = Math.floor(Math.random() * maxCount);
        coinCount = randomCoinCount;
      }

      currentTotalAmount -= coinCount * divideLevel;

      return coinCount;
    });
  }
};
