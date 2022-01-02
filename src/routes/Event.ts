const ON_PAGE_CHANGE = 'onPageChange'

const bindPageChangeEvent = (element: HTMLElement) =>
  element.addEventListener('click', () => {
    window.dispatchEvent(
      new CustomEvent(ON_PAGE_CHANGE, {
        detail: { route: element.id },
      })
    )
  })

export { bindPageChangeEvent, ON_PAGE_CHANGE }
