export default function ManageProducts({ $target }) {
  this.state = {};
  this.$target = $target;

  this.render = () => {
    this.$target.innerHTML = 'ManageProducts';
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.init = () => {
    console.log(this.$target);
    this.$target.innerHTML = '<h1>ManageProducts</h1>';
  };

  this.init();
}
