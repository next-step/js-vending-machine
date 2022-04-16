const clickableMethods = {
  init(callback) {
    this.$el.addEventListener('click', callback);
  },
  hover() {
    console.log('hovering', this);
  },
  press() {
    console.log('button pressed', this);
  },
  click() {
    console.log('button clicked', this);
  },
};

export default clickableMethods;
