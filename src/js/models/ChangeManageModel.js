class ChangeMangeModel {
  #charge;

  constructor(charge) {
    this.#charge = charge;
  }

  get charge() {
    return this.#charge;
  }
}

export default ChangeMangeModel;
