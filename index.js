require('dotenv').config()
const {b2c, encodePassword} = require('./payments')

// make a b2c
const tx = {
    amount: 100,
    recipient: '254795877416',
}


//console.log(encodePassword('107031', 'Safaricom123!', '20190910115015'))

b2c.initiateB2C(tx).then(console.log).catch( console.log)
