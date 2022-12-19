export default class MenuController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.view.addChargeEvent(this.addCharge);
    this.view.addTypeChargeEvent(this.typeCoin);
  }

  typeCoin = (coinValue) => {
    this.model.addTypeCoins(coinValue);
  };

  makeSplittedCoins = (totalValue) => {
    //기존의 객체에서 새로 만든애들 카운팅해서 숫자 얹어주면 될 것 같은데..
    return;
  };

  addCharge = () => {
    this.model.addTotalCoin(this.model.state.typedCoin);

    const splitedCoinsMap = makeSplittedCoins(this.model.state.chargedTotal);
    this.view.renderCoinList(splitedCoinsMap);
  };
}
