class Cache {
  constructor() {
    this.map = []
  }
  set(key, value) {
    if (typeof key === 'undefined' || typeof value === 'undefined') {
      return false
    }
    // if the key is available then push
    if (this.get(key) === false) {
      this.map.push({ key: key, value: value })
      return true
    }
    // if the key exists then overwrite
    for (const obj of this.map) {
      if (obj.key === key) {
        obj.value = value
      }
    }
  }
  get(key) {
    if (typeof key === 'undefined') {
      return false
    }
    const result = this.map.find((obj) => { return obj.key === key })
    if (typeof result === 'undefined') {
      return false
    }
    return result.value
  }
  getSize() {
    return this.map.length
  }
}

module.exports = Cache