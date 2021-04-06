// const uuid = require('uuid4')
const short_uuid = require('short-uuid')

module.exports = Object.freeze({
    makeId: () => short_uuid.generate()
})