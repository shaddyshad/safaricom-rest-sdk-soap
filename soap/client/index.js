const xmljs = require('xml-js');
const makeConverter = require('./converter')

const json2Soap = makeConverter(xmljs);


module.exports = Object.freeze({
        postB2C
})

/**
 * Create a b2c soap request
 */
async function postB2C(transaction){
    const body = json2Soap(transaction)

    console.log(body)

    return body;
}