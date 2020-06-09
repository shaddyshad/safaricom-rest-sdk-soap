require('dotenv').config()
const {b2c} = require('./payments')
const axios = require('axios')
// make a b2c
const tx = {
    amount: 100,
    idNum: '33670739',
    recipient: '254795877416',
    commandId: 1
}

const payload = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope" xmlns:req="http://192.168.9.48:8310/mminterface/request">    
 <soapenv::Header>        
    <tns:spId>107031</tns:spId>        
    <tns:spPassword>NTk4YjE1MzAxYTFiYWMxMzE3ODgyYzk0NzdjNTFhYjBkOTMwMGUwN2IzMTI0OWM3MDhhNmY5ZGNlZjY4OGE4YQ==</tns:spPassword> 
    <tns:timeStamp>20200609084161</tns:timeStamp>    
    <tns:serviceId>107031000</tns:serviceId>    
</soapenv::Header>    
<soapenv::Body>                   
    <req:RequestMsg>
        <![CDATA[<?xml version='1.0' encoding='UTF-8' ?><Request xmlns="http://192.168.9.48:8310/mminterface/request">
        <Transaction>                
        <CommandID>BusinessPayment </CommandID>                
        <LanguageCode>0</LanguageCode>                
        <OriginatorConversationId>ckb7od3fm0000nyrm6vrbb4z7</OriginatorConversationId>                
        <Remark>0</Remark>                
        <Parameters>
            <Parameter> 
                <Key>Amount</Key>
                <Values>10</Value>
            </Parameter>
            <Parameter>
                <Key>IDNumber</Key>                        
                <Value>33670739</Value>                    
            </Parameter>                
        </Parameters>                
        <ReferenceData>                    
            <ReferenceItem>                        
                <Key>QueueTimeoutUrl</Key>                        
                <Value>http:172.18.209.75:5000/timeout  </Value>                    
            </ReferenceItem>                    
            <Timestamp>20200609084161</Timestamp>                
        </ReferenceData>            
    </Transaction>            
    <Identity>                
        <Caller>                    
            <CallerType>2</CallerType>                    
            <ThirdPartyId>broker_4</ThirdPartyId>                 
            <Password>NTExMzgycXdlcnR5UUFaLjEy</Password>                    
            <ResultURL>http:172.18.209.75/results  </ResultURL>                
        </Caller>                
        <Initiator>                    
            <IdentifierType>11</IdentifierType>                    
            <Identifier>testAPI</Identifier>                    
            <SecurityCredential>NTExMzgydW5kZWZpbmVk</SecurityCredential>                    
            <ShortCode>511382</ShortCode>                
        </Initiator>                
        <ReceiverParty>                    
            <IdentifierType>1</IdentifierType>                    
            <Identifier>254795877416</Identifier>                
        </ReceiverParty>            
    </Identity>            
    <KeyOwner>1</KeyOwner>       
    <Request>]]
    </req:RequestMsg>
    </soapenv:Body>    
</soapenv:Envelope>
`

axios({
    method: 'post',
    headers: {
        'content-type': 'application/xml; charset=utf-8'
    },
    data: payload
}).then(r => {
    console.log("Response ", r.data)
})
.catch(err => {
    console.log(err.response)
})

// b2c.initiateB2C(tx).catch( err => {
//     console.log(err.response)
// })