require('dotenv').config()
const {b2c} = require('./payments')

// make a b2c
const tx = {
    amount: 100,
    idNum: '33670739',
    recipient: '254795877416',
    commandId: 1
}

b2c.initiateB2C(tx).catch( err => {
    console.log(err.response)
})