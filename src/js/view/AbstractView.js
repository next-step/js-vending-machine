export default class AbstractView {
  static eventBindings() {
    throw new Error('추상 클래스 입니다.');
  }

  static initialize() {
    throw new Error('추상 클래스 입니다.');
  }
}
