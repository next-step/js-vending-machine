interface ViewInterface {
  selectDomElement(): void
  createTemplate(): void
  bindEvent(): void
  render(): void
}

export type { ViewInterface }
