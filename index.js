require('dotenv').config
const {b2c} = require('./payments')

// make a b2c
const tx = {
    amount: 100,
    idNum: '2187213',
    recipient: '34234300327',
    commandId: 1
}

b2c.initiateB2C(tx)