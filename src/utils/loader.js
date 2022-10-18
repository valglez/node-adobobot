const fs = require('fs')

class Loader {
  load(path) {
    try {
      return fs.readFileSync(path).toString('utf-8').split("\n")
    } catch (error) {
      console.error(error.message || error)
    }
  }
}

module.exports = Loader