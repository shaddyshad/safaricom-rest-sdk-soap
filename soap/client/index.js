const axios = require('axios')

const PROVIDER_URL = process.env.PROVIDER_URL;


/**
 * Create a b2c soap request
 */
async function postB2C(opts){
    const {
        xml,
        url= PROVIDER_URL,
        proxy,
        timeout
    } = opts;

    // header
    const headers ={
        'Content-Type': 'text/xml ; charset=utf-8'
    }
console.log(opts)
		
    return axios({method: 'POST', url: 'http://192.168.9.48:8310/mminterface/request', data: xml, headers})

}



module.exports = Object.freeze({
    postB2C
})
