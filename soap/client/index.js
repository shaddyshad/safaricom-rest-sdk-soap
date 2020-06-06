const xmljs = require('xml-js');
const makeConverter = require('./converter')
const axios = require('axios')

const json2Soap = makeConverter(xmljs);

const PROVIDER_URL = process.env.PROVIDER_URL;
console.log(PROVIDER_URL)
// create an axios instance
const api = axios.create({
    baseUrl: PROVIDER_URL,
    timeout: 30000
})



/**
 * Create a b2c soap request
 */
async function postB2C(transaction){
    const body = json2Soap(transaction)

    // header
    const headers ={
        'Content-Type': 'application/xml'
    }

    const res = await api.post(`${PROVIDER_URL}/mminterface/request`, headers, body)
    return res
}



module.exports = Object.freeze({
    postB2C
})