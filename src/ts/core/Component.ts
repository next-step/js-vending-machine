export default abstract class Component<P = {}, S = {}> {
  protected $target: HTMLElement;
  protected props?: P;
  protected state?: S;
  private isMounted: boolean;

  constructor($target: HTMLElement, props?: P, state?: S) {
    this.isMounted = false;
    this.$target = $target;
    this.props = props;
    this.state = state;
    this.componentInit();
    this.render();
    this.isMounted = true;
  }

  protected componentInit(): void {}
  protected componentDidMount(): void {}
  protected componentDidUpdate(): void {}

  protected abstract htmlTemplate(): string;

  protected setState(nextState: S): void {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  protected render(): void {
    this.$target.innerHTML = this.htmlTemplate();
    if (this.isMounted) {
      this.componentDidUpdate();
    } else {
      this.componentDidMount();
    }
  }
}
