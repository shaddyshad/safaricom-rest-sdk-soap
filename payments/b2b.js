/**
 * B2B implementation
 */
module.exports = (provider, originatorId) => {
    // Main API
    return Object.freeze({
        initiateB2B
    })

    /**
     * Initiate a new b2b transaction
     * 
     * @param {Object} request contains parameters needed to execute a b2b transaction
     */
    async function initiateB2B(request){
        const {
            recipientShortCode,
            amount,
        } = request;

        return await provider.makeB2B({
            recipientShortCode,
            amount,
            originatorConverationId: originatorId()
        })
    }
}