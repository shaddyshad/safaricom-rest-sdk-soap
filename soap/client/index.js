const axios = require('axios')
const https = require('https')
const fs = require('fs')

const PROVIDER_URL = process.env.PROVIDER_URL;


/**
 * Create a b2c soap request
 */
async function postTransaction(opts){
    const {
        xml,
        caFilePath='/home/pesamobie/safaricom-rest-sdk-soap/certs/Root.crt'   // filepath to the cerficate
    } = opts;
    const ca = fs.readFileSync(caFilePath)

    const httpsAgent = new https.Agent({
        ca,
        rejectUnauthorized: false
    });

    
    const options = {
        method: 'POST',
        url: `${PROVIDER_URL}/mminterface/request`,
        data: xml,
        headers: {'Content-Type': 'text/xml; charset=utf-8'},
            httpsAgent : httpsAgent
    }

    const res = await axios(options)
    
    return res;

}



module.exports = Object.freeze({
    postTransaction
})
