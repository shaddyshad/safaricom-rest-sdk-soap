const uuid = require('uuid4')

module.exports = Object.freeze({
    makeId: () => uuid()
})