/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import ERROR_MESSAGES from './constants/errorMessages.js';
import { COIN_STANDARD } from './constants/vendingMachine.js';
import { getItem, setItem } from './utils/Storage.js';
import { subject } from '../../index.js';

const actionCreator = newState => {
  setItem('state', newState);
  subject.notifyAll();
};

export const registerProduct = (name, price, quantity) => {
  const state = getItem('state');
  const index = state.products.findIndex($el => $el.name === name);
  const isDuplicated = index > -1;
  let newState = {};

  if (isDuplicated) {
    const nextState = { ...state };
    nextState.products[index] = { name, price, quantity };
    newState = { ...nextState };
  } else {
    newState = {
      ...state,
      products: [...state.products, { name, price, quantity }],
    };
  }

  actionCreator(newState);
};

const coinCalculate = total => {
  let totalMoney = total;
  return COIN_STANDARD.reduce((acc, coin) => {
    const count = Math.floor(totalMoney / coin);
    totalMoney -= coin * count;
    return [...acc, count];
  }, []);
};

export const chargingMoney = newMoney => {
  const state = getItem('state');

  const { totalMoney, coins } = state;
  const newCoinValue = coinCalculate(newMoney);
  const newCoins = { ...coins };

  COIN_STANDARD.forEach((coin, idx) => {
    newCoins[coin] += newCoinValue[idx];
  });

  const newState = {
    ...state,
    coins: { ...newCoins },
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

  if (newState.inputMoney - newState.products[index].price < 0)
    throw new Error(ERROR_MESSAGES.NOT_ENOUGH_MONEY);

  newState.inputMoney -= newState.products[index].price;
  newState.products[index].quantity -= 1;
  if (newState.products[index].quantity === 0) newState.products.splice(index, 1);

  actionCreator(newState);
};

const getReturnCoin = (money, newCoins) => {
  let totalMoney = 0;
  let chargeMoney = money;
  const returnCoins = {};

  COIN_STANDARD.forEach(coin => {
    const count = Math.floor(chargeMoney / coin);
    if (newCoins[coin] < count) {
      chargeMoney -= coin * newCoins[coin];
      returnCoins[coin] = newCoins[coin];
      newCoins[coin] = 0;
    } else {
      chargeMoney -= coin * count;
      newCoins[coin] -= count;
      returnCoins[coin] = count;
    }
    totalMoney += coin * newCoins[coin];
  });
  return [chargeMoney, totalMoney, returnCoins];
};

export const returnCoin = () => {
  const state = getItem('state');
  const { inputMoney, coins } = state;
  const newCoins = { ...coins };
  const [newInputMoney, newTotalMoney, newReturnCoins] = getReturnCoin(inputMoney, newCoins);

  const newState = {
    ...state,
    coins: { ...newCoins },
    totalMoney: newTotalMoney,
    inputMoney: newInputMoney,
    returnCoins: newReturnCoins,
  };

  actionCreator(newState);
};
