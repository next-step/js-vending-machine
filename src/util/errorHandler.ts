const errorHandler = (from: string, err: Error) => {
  console.error(from, err)
  window.alert(`${from}: ${err.message}`)
}

export default errorHandler
