const moment = require('moment');
const base64 = require('js-base64').Base64;
const sha256 = require('js-sha256')
const cryptp = require('crypto');
// soap client
const {client} = require('../soap')

const withClient = fn => fn(client)

const Id = require('../id')
// provider
const makeProvider = require('./provider')

const provider = withClient(makeProvider)(getCurrentTime, encodePassword, encodeInitiatorPassword)

// b2c 
const makeB2C = require('./b2c');


/**
 * Get formatted timestamp
 */
function getCurrentTime(){
    return moment().format('YYYYMMDDHHmmSS')
}


/**
 * Encode a list of given arguments into a password
 */
function encodePassword(spid, pass, timestamp){
    // use base64(sha256(spid + pass + timestamp))
    return base64.encode(sha256(spid + pass + timestamp))
}

function encodeInitiatorPassword(InitiatorPassword){
    // const publicKey = fs.readFileSync(publicKeyFile, "utf8"); 
    // const ciphertextBuffer = crypto.publicEncrypt(
    //     {
    //       key: publicKey.pem,
    //       padding: crypto.constants.RSA_PKCS1_PADDING,
    //     },
    //     plaintextBuffer
    //   );
    //   console.log(`Ciphertext: ${ciphertextBuffer.toString('base64')}`);
    //   return ciphertextBuffer;
    return base64.encode(InitiatorPassword)
    
}

// export b2c
const b2c = makeB2C(provider, Id, getCurrentTime)

module.exports = {
    b2c
}