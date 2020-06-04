module.exports = (paymentsService, Id, getCurrentTime) => {
    /**
     * Command IDS used to initiate transactions
     */
    const COMMAND_IDS = {
        1: 'SalaryPayment',
        2: 'PromotionPayment',
        3: 'BussinessPayment'
    };

    // Constant Language code
    const LANGUAGE_CODE = 0;

    // constant ID type
    const ID_TYPE = '01';


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

        // generate the transaction data required to initiate a transaction
        const {commandId} = options;
        const CommandID = COMMAND_IDS[commandId]

        if(!CommandID){
            throw new Error("Invalid CommandID, provide one of ", COMMAND_IDS);
        }

        // generate a new originator conversationid 
        const originatorConversationId = Id.makeId();

        // get transaction details from options
        const {amount, idNum, recipient} = options;

        // get a formatted timestamp
        const timestamp = getCurrentTime()

        const payload = {
            commandID: CommandID,
            languageCode: LANGUAGE_CODE,
            originatorConversationId,
            amount,
            idType: ID_TYPE,
            idNum,
            recipient,
            referenceData: {
                item: {
                    queueTimeoutUrl: provider.timeoutUrl(),
                },
                timestamp

            }
        }

        return paymentsService.makeB2C(payload)
    }
}