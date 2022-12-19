import { ALERT } from '../../constants/alert.js';
export default class ChargeController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.view.addChargeEvent(this.addCharge);
    this.view.addTypeChargeEvent({ typeCoin: this.typeCoin, addCharge: this.addCharge });

    this.view.renderCoinsList({ coinMap: this.model.state.coinMap });
    this.view.renderTotalCoin({ totalAmount: this.model.state.chargedTotal });
  }

  typeCoin = (coinValue) => {
    if (Number.isInteger(Number(coinValue))) {
      this.model.addTypeCoins(Number(coinValue));
    }

    //view 업데이트
    this.view.renderTypedCoin({ coinValue: this.model.state.typedCoin });
  };

  makeRandomValue = ({ max }) => {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  };

  makeCoinCount = (coins) => {
    const coin500 = coins >= 500 ? this.makeRandomValue({ max: coins / 500 }) : 0;
    coins -= coin500 * 500;
    const coin100 = coins >= 100 ? this.makeRandomValue({ max: coins / 100 }) : 0;
    coins -= coin100 * 100;
    const coin50 = coins >= 50 ? this.makeRandomValue({ max: coins / 50 }) : 0;
    coins -= coin50 * 50;
    const coin10 = coins >= 10 ? Math.floor(coins / 10) : 0;
    coins -= coin10 * 10;

    return {
      coin500,
      coin100,
      coin50,
      coin10,
    };
  };

  makeRandomCoins = (chargedMoney) => {
    const { coin500, coin100, coin50, coin10 } = this.makeCoinCount(chargedMoney);

    const prevMap = this.model.state.coinMap;

    const newCoinMap = {
      500: prevMap[500] + coin500,
      100: prevMap[100] + coin100,
      50: prevMap[50] + coin50,
      10: prevMap[10] + coin10,
    };

    return newCoinMap;
  };

  addCharge = () => {
    const { typedCoin, chargedTotal } = this.model.state;
    console.log(typeof typedCoin);
    const isValidCoin = typedCoin >= 100 && typedCoin % 10 === 0 && typedCoin;

    if (!isValidCoin) alert(ALERT.CHARGE_VALIDATION);

    const newCoinMap = this.makeRandomCoins(typedCoin);

    this.model.setNewCoinMap(newCoinMap);
    this.model.addTotalCoin(typedCoin);
    this.view.renderTotalCoin({ totalAmount: this.model.state.chargedTotal });
    this.view.renderCoinsList({ coinMap: newCoinMap });
    this.typeCoin(null);
  };
}
