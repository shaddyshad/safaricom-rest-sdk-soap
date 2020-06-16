module.exports = (paymentsService, originatorId) => {

    return Object.freeze({
        initiateB2C,   // intiate a new b2c connection
    })

    

    /**
     * Initiates a new b2c transaction using the payments service object provided
     * 
     */
    async function initiateB2C(options){
        // get an instance of the provider
        const provider = paymentsService;

        // generate a new originator conversationid 
        const originatorConversationId = originatorId()
        // get transaction details from options
        const {amount, recipient} = options;

        const payload = {
            originatorConversationId,
            amount,
            recipient,
        }

        return provider.makeB2C(payload)
    }

    
}
