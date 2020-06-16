const b2bRequestWsdl = request => {
    // required all
    const {
        SPID,
        spPassword,
        timestamp,
        serviceId,
        originatorConversationId,
        amount,
        accountReference,
        timeoutUrl,
        localTimestamp,
        password,
        resultUrl,
        initiatorIdentifier = "tesAPI",
        securityCredentials,
        shortCode,
        recipient,
        requesterPhoneNumber
    } = request;

    return (    `
            <Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:req="http://api-v1.gen.mm.vodafone.com/mminterface/request">
            <Header><RequestSOAPHeader xmlns:tns="http://www.huawei.com/schema/osg/common/v2_1">
                <spId>${SPID}</spId>
                <spPassword>${spPassword}</spPassword>
                <timeStamp>${timestamp}</timeStamp>
                <serviceId>${serviceId}</serviceId>
            </RequestSOAPHeader></Header>
            <Body><RequestMsg>
                    <![CDATA[<?xml version="1.0" encoding="UTF-8"?>
                    <request xmlns="http://api-v1.gen.mm.vodafone.com/mminterface/request">
                        <Transaction>
                            <CommandID>BusinessPayBill</CommandID><LanguageCode>0</LanguageCode><OriginatorConversationID>${originatorConversationId}</OriginatorConversationID><ConversationID></ConversationID>
                            <Parameters>
                                <Parameter><Key>Amount</Key><Value>${amount}</Value></Parameter>
                                <Parameter><Key> AccountReference</Key><Value>${accountReference}</Value></Parameter>
                            </Parameters>
                            <ReferenceData>
                                <ReferenceItem><Key> QueueTimeoutURL</Key><Value>${timeoutUrl}</Value></ReferenceItem>
                            </ReferenceData>
                            <Timestamp>${localTimestamp}</Timestamp>
                        </Transaction>
                        <Identity>
                            <Caller><CallerType>2</CallerType><ThirdPartyID>broker_4</ThirdPartyID>
                                <Password>${password}</Password>
                                <ResultURL>${resultUrl}</ResultURL>
                            </Caller>
                            <Initiator><IdentifierType>11</IdentifierType><Identifier>${initiatorIdentifier /**testApi */}</Identifier>
                                <SecurityCredential>${securityCredentials}</SecurityCredential>
                                <ShortCode>${shortCode}</ShortCode>
                            </Initiator>
                            <PrimaryParty><IdentifierType>4</IdentifierType>
                                <Identifier>${shortCode}</Identifier>
                                <ShortCode>${shortCode}</ShortCode>
                            </PrimaryParty>
                            <ReceiverParty><IdentifierType>4</IdentifierType>
                                <Identifier>${recipient} </Identifier>
                                <ShortCode>${recipient}</ShortCode>
                            </ReceiverParty>
                            <AccessDevice><IdentifierType>2</IdentifierType><Identifier>1</Identifier></AccessDevice>
                            <Requester>
                                <IdentifierType>1</IdentifierType>
                                <Identifier>${requesterPhoneNumber}</Identifier>
                            </Requester>
                        </Identity>
                        <KeyOwner>1 </KeyOwner>
                    </request>
                ]]>
            </RequestMsg></Body>
            </Envelope>
        `
    );
}

module.exports = b2bRequestWsdl