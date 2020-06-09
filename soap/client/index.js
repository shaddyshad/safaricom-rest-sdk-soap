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
        'Content-Type': 'application/xml ; charset=utf-8'
    }

    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url,
            headers,
            data: xml,
            timeout,
            proxy
        }).then(res => resolve({
            response: {
                headers: res.headers,
                body: res.data,
                statusCode: res.status
            }
        })).catch(err => {
            if(err.response){
                console.error(`Soap Failed ${err}`)
                reject(err)
            }
        })
    })
}



module.exports = Object.freeze({
    postB2C
})