class Cache {
    constructor() {
        this.map = []
    }
    set(key, value) {
        this.map.push({key: key, value: value})
        return true
    }
    get(key) {
        return this.map[key]
    }
}

module.exports = Cache