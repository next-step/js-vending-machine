interface ViewInterface {
  viewId: string
  selectDomElement(): void
  createTemplate(): void
  bindEvent(): void
  render(): void
}

export type { ViewInterface }
