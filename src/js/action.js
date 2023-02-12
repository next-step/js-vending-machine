/* eslint-disable no-param-reassign */
import ERROR_MESSAGES from './constants/errorMessages.js';
import { COIN_STANDARD } from './constants/vendingMachine.js';
import { getItem, setItem } from './utils/Storage.js';
import subject from './utils/subject.js';

const actionCreator = newState => {
  setItem('state', newState);
  console.log(newState);
  subject.notifyAll();
};

export const registerProduct = ({ name, price, quantity }) => {
  const state = getItem('state');
  const index = state.products.findIndex($el => $el.name === name);
  const isDuplicated = index > -1;
  const newState = { ...state };

  if (isDuplicated) newState.products[index] = { name, price, quantity };
  else newState.products = [...state.products, { name, price, quantity }];

  actionCreator(newState);
};

const getMoneyToCoins = total => {
  return COIN_STANDARD.reduce((acc, coin) => {
    const count = Math.floor(total / coin);
    total -= coin * count;
    return [...acc, count];
  }, []);
};

const setNewCoins = (newCoins, newCoinValue) => {
  const coins = { ...newCoins };
  COIN_STANDARD.forEach((coin, idx) => {
    coins[coin] += newCoinValue[idx];
  });

  return coins;
};

export const chargingMoney = newMoney => {
  const state = getItem('state');
  const { totalMoney, coins } = state;
  const newCoinValue = getMoneyToCoins(newMoney);
  const newCoins = setNewCoins({ ...coins }, newCoinValue);

  const newState = {
    ...state,
    coins: newCoins,
    totalMoney: totalMoney + newMoney,
  };

  actionCreator(newState);
};

export const setInputMoney = newMoney => {
  const state = getItem('state');

  const newState = {
    ...state,
    inputMoney: state.inputMoney + newMoney,
  };

  actionCreator(newState);
};

export const buyProduct = selectedName => {
  const state = getItem('state');
  const index = state.products.findIndex(product => product.name === selectedName);
  const newState = { ...state };
  const hasEnoughMoney = newState.inputMoney - newState.products[index].price >= 0;

  if (!hasEnoughMoney) throw new Error(ERROR_MESSAGES.NOT_ENOUGH_MONEY);

  newState.inputMoney -= newState.products[index].price;
  newState.products[index].quantity -= 1;
  if (newState.products[index].quantity === 0) newState.products.splice(index, 1);

  actionCreator(newState);
};

const getReturnCoin = (chargeMoney, newCoins) => {
  let totalMoney = 0;
  const returnCoins = {};
  const coins = { ...newCoins };

  COIN_STANDARD.forEach(coin => {
    const count = Math.floor(chargeMoney / coin);
    const canGetCoin = coins[coin] < count;

    if (canGetCoin) {
      chargeMoney -= coin * coins[coin];
      returnCoins[coin] = coins[coin];
      coins[coin] = 0;
    } else {
      chargeMoney -= coin * count;
      coins[coin] -= count;
      returnCoins[coin] = count;
    }
    totalMoney += coin * coins[coin];
  });
  return { coins, chargeMoney, totalMoney, returnCoins };
};

export const setReturnCoins = () => {
  const state = getItem('state');
  const { inputMoney, coins } = state;
  const {
    coins: newCoins,
    chargeMoney: newInputMoney,
    totalMoney,
    returnCoins,
  } = getReturnCoin(inputMoney, {
    ...coins,
  });

  const newState = {
    ...state,
    coins: newCoins,
    totalMoney,
    inputMoney: newInputMoney,
    returnCoins,
  };

  actionCreator(newState);
};
