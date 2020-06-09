/**
 * Create an b2c payload to initiate a transaction
 */
const makeB2CBody =  body => {
    const {transaction, identity, keyOwner} = body;

    const compiledTransaction = compileTransaction(transaction);

    const compiledIdentity = compileIdentity(identity)

    return {
        "soapenv:Body": {
            Transaction: compiledTransaction,
            Identity: compiledIdentity,
            KeyOwner: keyOwner
        }
    }
}

/**
 * Create a transaction fragment for the body
 */
const compileTransaction = transaction => {
    const {referenceData} = transaction;

    return {
        CommandId: transaction.commandId,
        LanguageCode: transaction.languageCode,
        OriginatorConversationId: transaction.originatorConversationId,
        Remark: 0,
        Parameters: {
            Parameter:{
                Key: 'Amount',
                Value: transaction.amount
            },
            Parameter: {
                Key: 'IDType',
                Value: transaction.idType
            },
            Parameter: {
                Key: 'IDNumber',
                Value: transaction.idNum
            }
        },
        ReferenceData: {
            ReferenceItem: {
                Key: 'QueueTimeoutUrl',
                Value: referenceData.item.queueTimeoutUrl
            },
            Timestamp: referenceData.timestamp
        }
    }
}

/**
 * Create an identity fragment for the body
 */
const compileIdentity = identity => {
    const {caller, initiator, primaryParty, receiverParty, accessDevice} = identity;

    return {
        Caller: {
            CallerType: caller.callerType,
            ThirdPartyId: caller.thirdPartyId,
            Password: caller.password,
            ResultURL: caller.resultUrl
        },
        Initiator: {
            IdentifierType: initiator.identifierType,
            Identifier: initiator.identifier,
            SecurityCredential: initiator.securityCredentials,
            ShortCode: initiator.shortCode
        },
        ReceiverParty: {
            IdentifierType: receiverParty.identifierType,
            Identifier: receiverParty.identifier 
        }
    }
}

module.exports = makeB2CBody