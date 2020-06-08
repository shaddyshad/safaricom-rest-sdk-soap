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

    const CALLER_TYPE = 0;   // does not change 
    const THIRD_PARTY_ID = "broker_4";   //constant
    const PASSWORD = process.env.PAYMENTS_SERVICE_PASSWORD;
    // identifier type
    const INITIATOR_IDENTIFIER_TYPE = 11;
    const RECEIVER_IDENTIFIER_TYPE = 1;
    const PRIMARY_IDENTIFIER_TYPE = 4;

    // short code assigned
    const SHORT_CODE = process.env.SHORT_CODE;

    // time
    const QUEUE_TIMEOUT_URL = process.env.QUEUE_TIMEOUT_URL;

    // service id 
    const SERVICE_ID = process.env.SERVICE_ID;

    // SPID
    const SPID = process.env.SPID;

    // initiator name
    const INITIATOR_NAME = process.env.INITIATOR_NAME;

    const SECURITY_CREDENTIALS = getInitiatorPassword();

    // key owner
    const KEY_OWNER = 1;

    // access device
    const ACCESS_DEVICE_IDENTIFIER_TYPE = 4;

    return Object.freeze({
        resultUrl: () => RESULT_URL,
        timeoutUrl: () => QUEUE_TIMEOUT_URL,
        makeB2C
    })


    /**
     * Get the soap headers provided by a payment provider
     */
    function headers(){
        const timestamp = getCurrentTime();

        return {
            spId: SPID,
            password: getPassword(timestamp),
            serviceId: SERVICE_ID,
            timeStamp: timestamp
        }
    }

    /**
     * Get the soap body data needed to complete a transaction
     */
    function body(transaction){
        const {recipient} = transaction;

        return {
            transaction,
            identity: {
                caller: {
                    callerType: CALLER_TYPE,
                    thirdPartyId: THIRD_PARTY_ID,
                    password: PASSWORD,
                    resultUrl: RESULT_URL
                },
                initiator: {
                    identifierType: INITIATOR_IDENTIFIER_TYPE,
                    identifier: INITIATOR_NAME,
                    securityCredentials: SECURITY_CREDENTIALS,
                    shortCode: SHORT_CODE,
                },
                primaryParty: {
                    identifierType: PRIMARY_IDENTIFIER_TYPE,
                    identifier: SHORT_CODE,
                },
                receiverParty: {
                    identifierType: RECEIVER_IDENTIFIER_TYPE,
                    identifier: recipient
                },
                accessDevice: {
                    identifierType: ACCESS_DEVICE_IDENTIFIER_TYPE,
                    identifier: 1
                }
            },
            keyOwner: KEY_OWNER
        }
    }

    /**
     * Compile a transaction into a soap compatible json object
     */
    function compile(transaction){
        // get headers
        return {
            headers: headers(),
            body: body(transaction)
        }
    }

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
        // compile the transaction
        const compiled = compile(transaction)

        return soapClient.postB2C(compiled)
    }
}
