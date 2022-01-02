const $ = ({
  selector,
  target = document,
}: {
  selector: string
  target?: Document | DocumentFragment | HTMLElement
}) => target.querySelector(selector)

export { $ }
