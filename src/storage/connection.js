class Connection {
    constructor() {
        this.mongoose = require('mongoose')
    }
    async connect(uri) {
        try {
            await this.mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log('Connected!')
        } catch (error) {
            console.log('Could not connect!', error)
        } 
    }
}

module.exports = Connection