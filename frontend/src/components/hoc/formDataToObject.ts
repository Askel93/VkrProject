const toObject = (formData: FormData, initObject: object = {}) => {
  let result = initObject;
  let iterator = formData.entries()
  let entry = iterator.next()
  let value = entry.value
  while (true) {
    if (Array.isArray(value) && value.length === 2) {
      result = Object.assign({ [value[0]]: value[1] }, result)
    }
    if (entry.done) break
    entry = iterator.next()
    value = entry.value
  }
  return result
}

export default toObject;