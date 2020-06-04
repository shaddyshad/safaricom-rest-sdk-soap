const compileHeaders = require('./headers')
const compileBody = require('./body')

/**
 * Compile a b2c json payload into a soap fromat
 */
module.exports = converter =>  b2cPayload => {
    // compile the headers
    const {headers} = b2cPayload;

    const compiledHeaders = compileHeaders(headers)

    // compile the body 
    const body = compileBody(b2cPayload.body);

    // compile   
    return converter.json2xml({
        "soapenv:Envelope":{
            _attributes: {
                "xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope",
                "xmlns:req": "http://api-v1.gen.mm.vodafone.com/mminterface/request"
            },
            "soapenv::Header": {
                ...compiledHeaders
            },
            "soapenv::Body": {
                ...body
            }   
        }
    }, {
        compact: true,
        spaces: 4
    }) 
}