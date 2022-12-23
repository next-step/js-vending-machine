export default function ChargingMoney({ $target }) {
  this.state = {};
  this.$target = $target;

  this.render = () => {
    this.$target.innerHTML = 'ManageProducts';
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };
}
