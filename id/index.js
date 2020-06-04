const cuid = require('cuid')

module.exports = Object.freeze({
    makeId: () => cuid()
})