const axios = require('axios')
const https = require('https')
const fs = require('fs')

const PROVIDER_URL = process.env.PROVIDER_URL;


/**
 * Create a b2c soap request
 */
async function postB2C(opts){
    const {
        xml
    } = opts;
    const ca = fs.readFileSync('/home/pesamobie/safaricom-rest-sdk-soap/certs/Root.crt')

    const httpsAgent = new https.Agent({
        ca,
        rejectUnauthorized: false
    });

    
    const options = {
        method: 'POST',
        url: 'https://192.168.9.48:18423/mminterface/request',
        data: xml,
        headers: {'Content-Type': 'text/xml; charset=utf-8'},
            httpsAgent : httpsAgent
    }

    const res = await axios(options)
    
    return res;

}



module.exports = Object.freeze({
    postB2C
})
