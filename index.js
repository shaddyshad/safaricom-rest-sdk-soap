require('dotenv').config()
const {b2c} = require('./payments')

// make a b2c
const tx = {
    amount: 100,
    recipient: '254795877416',
}

b2c.initiateB2C(tx).catch( console.log)