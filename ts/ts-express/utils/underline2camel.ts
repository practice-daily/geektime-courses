const replaceUnderline = (val: string, char = '_') => {
  const arr = val.split('')
  const index = arr.indexOf(char)
  arr.splice(index, 2, arr[index + 1].toUpperCase())
  val = arr.join('')
  return val
}

const underline2camel = (obj: any, char = '_') => {
  const arr = Object.keys(obj).filter(item => item.indexOf(char) !== -1)
  arr.forEach(item => {
    const value = obj[item]
    const newKey = replaceUnderline(item)
    obj[newKey] = value
    delete obj[item]
  })
  return obj
}

export {
  underline2camel
}
