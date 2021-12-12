const setLocalStorageItem = ({
  key,
  value,
}: {
  key: string
  value: string | object
}) => {
  if (typeof value === 'string') {
    localStorage.setItem(key, value)
    return
  }

  localStorage.setItem(key, JSON.stringify(value))
}

const getLocalStorageItem = ({ key }: { key: string }) => {
  const item = localStorage.getItem(key)

  if (!item) {
    return null
  }

  try {
    return JSON.parse(item)
  } catch {
    return item
  }
}

export { setLocalStorageItem, getLocalStorageItem }
