const moment = require('moment');
const base64 = require('js-base64').Base64;
const sha256 = require('js-sha256')
const crypto = require('crypto');
const fs = require('fs');
// soap client
const {client} = require('../soap')

const withClient = fn => fn(client)

const Id = require('../id')
// provider
const makeProvider = require('./provider')

const provider = withClient(makeProvider)(getCurrentTime, encodePassword, encodeInitiatorPassword, readCertFile)

// b2c 
const makeB2C = require('./b2c');

const makeB2B = require('./b2b');
/**
 * Get formatted timestamp
 */
function getCurrentTime(){
    return moment(new Date()).format('YYYYMMDDHHmmSS')
}


/**
 * Encode a list of given arguments into a password
 */
function encodePassword(spid, pass, timestamp){
	// use base64(sha256(spid + pass + timestamp))
    //const sha256 = new Hashes.SHA256()
    const sha =  sha256(spid+pass+timestamp);
    const shaData = base64.encode(sha);
    return shaData;
}
//utility function to assist in the reading of a certificate File
function readCertFile(certFilePath){
    fs.readFile(certFilePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            return data
        }
        else{
            console.error(err)
        }
    });
}

//function to encode the initiator password
async function encodeInitiatorPassword(InitiatorPassword, cert){
    const ciphertextBuffer = crypto.publicEncrypt(
        {
          key: cert,
          oaepHash: 'sha256',
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        InitiatorPassword
      );
      console.log(`Ciphertext: ${ciphertextBuffer.toString('base64')}`);
      return ciphertextBuffer.toString('base64');
}

/**
 * Originator id - (SHORT_CODE_NAME_UNIQUE)
 */
const makeOriginatorId = (provider) => () => {
    const unique = Id.makeId()
    const shortCode = provider.shortCode()
    const businessName = process.env.BUSINESS_NAME
    return `${shortCode}_${businessName}_${unique}`
}


// initialize originator id with the provider 
const originatorId = makeOriginatorId(provider);


// export b2c
const b2c = makeB2C(provider, originatorId)

const b2b  = makeB2B(provider, originatorId);

module.exports = {
    b2c,
    encodePassword,
    b2b
}
