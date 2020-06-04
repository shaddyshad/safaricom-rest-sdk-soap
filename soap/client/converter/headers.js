/**
 * Create a b2c header using a json-to-xml 
 */
const compileHeaders = headers => {
    return {
        "tns:spId": headers.spId,
        "tns:spPassword": headers.password,
        "tns:timeStamp": headers.timeStamp,
        "tns:serviceId": headers.serviceId
    }
}

module.exports = compileHeaders