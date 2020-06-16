const requestB2CWsdl = request => {
    const {
        SpPassword,
        SPID,
        timestamp,
        localTimestamp,
        amount,
        serviceId,
        timeoutUrl,
        callerPassword,
        resultUrl,
        securityCredentials,
        shortCode,
        recipient,
        originatorConversationId
    } = request;

    return (
        `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:req="http://api-v1.gen.mm.vodafone.com/mminterface/request">
    <soapenv:Header><tns:RequestSOAPHeader xmlns:tns="http://www.huawei.com/schema/osg/common/v2_1">
    <tns:spId>${SPID}</tns:spId><tns:spPassword>${SpPassword}</tns:spPassword><tns:timeStamp>${timestamp}</tns:timeStamp>
    <tns:serviceId>${serviceId}</tns:serviceId></tns:RequestSOAPHeader>
    </soapenv:Header><soapenv:Body><req:RequestMsg>
    <![CDATA[ <?xml version="1.0" encoding="UTF-8"?> 
    <request xmlns="http://api-v1.gen.mm.vodafone.com/mminterface/request">
    <Transaction> <CommandID>BusinessPayment</CommandID> <LanguageCode>01</LanguageCode>
    <OriginatorConversationID>${originatorConversationId}</OriginatorConversationID> <ConversationID></ConversationID>
     <Remark></Remark> <Parameters> <Parameter><Key>Amount</Key> <Value>${amount}</Value> </Parameter> </Parameters> <ReferenceData> <ReferenceItem>
      <Key>QueueTimeoutURL</Key> <Value>${timeoutUrl}</Value> </ReferenceItem><ReferenceItem> <Key>Occasion</Key> <Value>Jamuhuri</Value> </ReferenceItem> </ReferenceData>
       <Timestamp>${localTimestamp}</Timestamp> </Transaction> 
       <Identity> <Caller> <CallerType>2</CallerType> <ThirdPartyID>broker_4</ThirdPartyID>
       <Password>${callerPassword}</Password> 
       <ResultURL>${resultUrl}</ResultURL> </Caller> <Initiator> <IdentifierType>11</IdentifierType> 
       <Identifier>testAPI</Identifier>
        <SecurityCredential>${securityCredentials}</SecurityCredential> 
        <ShortCode>${shortCode}</ShortCode> </Initiator> <PrimaryParty> <IdentifierType>4</IdentifierType> 
        <Identifier>${shortCode}</Identifier> <ShortCode>${shortCode}</ShortCode> </PrimaryParty> <ReceiverParty>
         <IdentifierType>1</IdentifierType> <Identifier>${recipient}</Identifier> </ReceiverParty> <AccessDevice> <IdentifierType>1</IdentifierType> <Identifier>Identifier3</Identifier> </AccessDevice> </Identity> <KeyOwner>1</KeyOwner> </request> ]]></req:RequestMsg></soapenv:Body></soapenv:Envelope>       `
    )
}

module.exports = requestB2CWsdl;
