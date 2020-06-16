const requestWsdl = require('./wsdl/b2crequest')
/**
 * Keeps constants needed to connect to service provider and provides it to all services
 * 
 * `env variables kept`
 * + RESULT_URL - url of the results listener
 * + QUEUE_TIMEOUT_URL - Timeout url of the listener
 * + SPID - issued spid
 * + SERVICE_ID - service id issued by safaricom
 * + INITIATOR_NAME - name of initiator
 * + SECURITY_CREDENTIALS - encyrpted initiator service
 * +PAYMENTS_SERVICE_PASSWORD - service password
 */
module.exports = (soapClient) => (getCurrentTime, encodePassword, encodeInitiatorPassword) => {
    // get result url from environment
    const RESULT_URL = process.env.RESULT_URL;
    const PASSWORD = process.env.PAYMENTS_SERVICE_PASSWORD;

    // short code assigned
    const SHORT_CODE = process.env.SHORT_CODE;

    // timeout url
    const QUEUE_TIMEOUT_URL = process.env.QUEUE_TIMEOUT_URL;

    // service id 
    const SERVICE_ID = process.env.SERVICE_ID;

    // SPID
    const SPID = process.env.SPID;

    const CALLER_PASSWORD = process.env.CALLER_PASSWORD;

    const SECURITY_CREDENTIALS = process.env.SECURITY_CREDENTIALS;

    // requester phone number required for b2b
    const PHONE_NUMBER = process.env.PHONE_NUMBER;

    return Object.freeze({
        makeB2C,
        makeB2B,
        // utilities
        resultUrl: () => RESULT_URL,
        timeoutUrl: () => QUEUE_TIMEOUT_URL,
        shortCode: () => SHORT_CODE
    })



    /**
     * Get the password
     */
    function getPassword(timestamp){
        return encodePassword(SPID, PASSWORD, timestamp)
    }

    /***
     * Get Initiator Password
     */
    function getInitiatorPassword(initiatorPassword){
        return encodeInitiatorPassword(initiatorPassword)
    }   
    /**
     * Sends a b2c request to the registered soap client
     */
    async function makeB2C(transaction){
        const payload = composeTransaction(transaction)

        // compile into wsdl
        const compiled = {
            xml: requestB2CWsdl(payload).replace(/\n|\r/g, "").trim(),
        }


        return soapClient.postTransaction(compiled)
    }

    /**
     * Perform a b2b request
     */
    async function makeB2B(transaction){
        //attach b2b information
        const payload = {
            ...composeTransaction(transaction),
            requesterPhoneNumber: PHONE_NUMBER
        };

        // compile into wsdl
        const compiled = {
            xml: requestB2CWsdl(payload).replace(/\n|\r/g, "").trim(),
        }


        return soapClient.postTransaction(compiled)
    }

    /**
     * Perform a specified transaction
     */
    function composeTransaction(transaction){
        const {
             amount, originatorConversationId, recipient
        } = transaction;


        const timestamp = getCurrentTime();

        const payload = {
            timestamp,
            localTimestamp: timestamp,
            amount, 
            recipient,
            timeoutUrl: QUEUE_TIMEOUT_URL,
            resultUrl: RESULT_URL,
            securityCredentials: SECURITY_CREDENTIALS,
            shortCode: SHORT_CODE,
            callerPassword: CALLER_PASSWORD,
            SpPassword: getPassword(timestamp),
            serviceId: SERVICE_ID,
            originatorConversationId,
		    SPID
        }


        return payload;
        
    }
}
