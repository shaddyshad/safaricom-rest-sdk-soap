require('dotenv').config()
const {b2c} = require('./payments')
const axios = require('axios')
const uuid = require('uuid4')
const https = require('https')
const fs = require('fs')
// make a b2c
const tx = {
    amount: 100,
    idNum: '33670739',
    recipient: '254795877416',
    commandId: 1
}
const convId = uuid()
console.log(convId)

const payload = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:req="http://api-v1.gen.mm.vodafone.com/mminterface/request">
<soapenv:Header>
<tns:RequestSOAPHeader xmlns:tns="http://www.huawei.com/schema/osg/common/v2_1">
<tns:spId>107031</tns:spId>
<tns:spPassword>MzRmNzk5NWJmNGJkNzFmYzdkODYyMGZhNDhiYTgzYWFmZjliMTQxMTQwNTUyODZmMzJiZDFkNDhiZTIyYWY3OQ==</tns:spPassword>
<tns:timeStamp>20190910115015</tns:timeStamp>
<tns:serviceId>107031000</tns:serviceId>
</tns:RequestSOAPHeader>
</soapenv:Header>
<soapenv:Body>
<req:RequestMsg>
<![CDATA[ <?xml version="1.0" encoding="UTF-8"?> <request xmlns="http://api-v1.gen.mm.vodafone.com/mminterface/request">
<Transaction> <CommandID>BusinessPayment</CommandID> <LanguageCode>01</LanguageCode>
<OriginatorConversationID>${convId}</OriginatorConversationID> <ConversationID></ConversationID> 
<Remark></Remark> <Parameters> <Parameter>
<Key>Amount</Key> <Value>100</Value> </Parameter> </Parameters> <ReferenceData> <ReferenceItem> <Key>QueueTimeoutURL</Key> 
<Value>https://ussd.techbanc.co.ke/timeout.php</Value> </ReferenceItem>
<ReferenceItem> <Key>Occasion</Key> <Value>Jamuhuri</Value> </ReferenceItem> </ReferenceData> 
<Timestamp>2013-07-29T18:50:41.2109675Z</Timestamp> </Transaction> <Identity> <Caller> <CallerType>2</CallerType> 
<ThirdPartyID>broker_4</ThirdPartyID>
<Password>T50mhFnEwrPNy0BU0b+n+8Hwdb2LhsKG0KSPemuiXiZrcYoemz5vIl0uUzs1OSUPi5cumPF4djZuuIERNVA+znH85Iy2k+DQQtFRGTVKBWNZZpDjus9RE0BD7iuBFjiAzr5UNJcpeetSO0nmG7O9sfXJ/tBWCnRPRE8vWNzlrq0tBhFl1EtWvkBDY7Daj/MWeigkumOGwB0/GDvO0AsOJZtHuGeddGHEi/lb1oJxlCOKXts8ZxopnbuDN5sB4qD3P5QUxgTfE1KFHEeklvwWUcnNpuDz7q12k0yzYhsJEE4MyiVwjZVuo66TPQd4AjU+JDzEIAwG4IJx98dh5C4AOA==</Password> 
<ResultURL>https://ussd.techbanc.co.ke/listen.php</ResultURL> </Caller> <Initiator> <IdentifierType>11</IdentifierType> <Identifier>testAPI</Identifier> <SecurityCredential>H/45hCXOev3Ebc3a12p9NRsga9ZXmKvYRxA5aDxrRdru50Cd3ZZ0upR+SyRszUh0ncw55YLVBYHwUdWU3t0kgz+3tHMi7vhKizzoznQWr25XQJXs+GNLASoQLJ/DvrloiPWlUJHOhv6xx3ychxLO0HivHp5fuynKlkD5TspDTRuWM+H9iklcirI5mJV06BjX/ezp4M4jerpRD4ZtsQAJ/ZyjJix+EKYCRMBHZRGN/WY/Ivrqs7xv+BwMjxWGDcuQSHApSB4YANYWIFaISl+DwS/FX3wrF/jY4Rq+gnAYXzeFdR3mVxbdUnlYM43KRx7oEXxtOPtPoTJnswc/78l3XQ==</SecurityCredential> <ShortCode>511382</ShortCode> </Initiator> <PrimaryParty> <IdentifierType>4</IdentifierType> <Identifier>511382</Identifier> <ShortCode>511382</ShortCode> </PrimaryParty> <ReceiverParty> <IdentifierType>1</IdentifierType>
 <Identifier>254711959143</Identifier> </ReceiverParty> <AccessDevice> <IdentifierType>1</IdentifierType> <Identifier>Identifier3</Identifier> </AccessDevice> </Identity> <KeyOwner>1</KeyOwner> </request> ]]>
</req:RequestMsg>
</soapenv:Body>
</soapenv:Envelope>`;

const httpsAgent = new https.Agent({
    ca: fs.readFileSync('certs/Root.crt'),
    rejectUnauthorized: false
});

const options = {
	method: 'POST',
	url: 'https://192.168.9.48:18423/mminterface/request',
	data: payload,
	headers: {'Content-Type': 'text/xml; charset=utf-8'},
        httpsAgent : httpsAgent
}

axios(options).then(r => {
    console.log("Response ", r)})
.catch(err => {
    console.log(err)
})


