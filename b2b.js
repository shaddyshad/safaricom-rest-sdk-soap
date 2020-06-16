const axios = require('axios');
const uuid = require('uuid4');
const https = require('https');
const fs = require('fs');
const moment = require('moment');
const base64 = require('js-base64').Base64;
const sha256 = require('js-sha256');
const { time } = require('console');



const ConversationID =  uuid();


function getCurrentTime(){
    console.log(moment(new Date()).format('YYYYMMDDHHmmSS'))
    return moment(new Date()).format('YYYYMMDDHHmmSS')
}
function encodePassword(spid, pass, timestamp){
    console.log(spid+pass+timestamp)
	// use base64(sha256(spid + pass + timestamp))
    //const sha256 = new Hashes.SHA256()
    const sha =  sha256(spid+pass+timestamp)
   console.log(sha)
    const shaData = base64.encode(sha);
    console.log(shaData)
    return shaData;
}
const timestamp = getCurrentTime();
console.log(timestamp);
const spPassword = encodePassword('107031',  'Safaricom123!' ,timestamp);

const wdsl = `<Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
xmlns:req="http://api-v1.gen.mm.vodafone.com/mminterface/request">
	<Header>
		<RequestSOAPHeader xmlns:tns="http://www.huawei.com/schema/osg/common/v2_1">
			<spId>107031</spId>
			<spPassword>${spPassword}</spPassword>
			<timeStamp>${timestamp}</timeStamp>
			<serviceId>107031000</serviceId>
		</RequestSOAPHeader>
	</Header>
	<Body>
		<RequestMsg>
			<![CDATA[
			<?xml version="1.0" encoding="UTF-8"?>
<request xmlns="http://api-v1.gen.mm.vodafone.com/mminterface/request">
	<Transaction>
		<CommandID>
			BusinessPayBill
		</CommandID>
		<LanguageCode>
			0
		</LanguageCode>
		<OriginatorConversationID>
			989283r88h4j26k046kaaaasss
		</OriginatorConversationID>
		<ConversationID>
			${ConversationID}
		</ConversationID>
		<Remark>
			Kamunge
		</Remark>
		<Parameters>
			<Parameter>
				<Key>
					Amount
				</Key>
				<Value>
					3099
				</Value>
			</Parameter>
			<Parameter>
				<Key>
					AccountReference
				</Key>
				<Value>
					XXMKST
				</Value>
			</Parameter>
		</Parameters>
		<ReferenceData>
			<ReferenceItem>
				<Key>
					QueueTimeoutURL
				</Key>
				<Value>
                    https://ussd.techbanc.co.ke/timeout.php
				</Value>
			</ReferenceItem>
		</ReferenceData>
		<Timestamp>
			2014-09-22T14:10:47.220+03:00
		</Timestamp>
	</Transaction>
	<Identity>
		<Caller>
			<CallerType>
				2
			</CallerType>
			<ThirdPartyID>
				broker_4
			</ThirdPartyID>
			<Password>
				T50mhFnEwrPNy0BU0b+n+8Hwdb2LhsKG0KSPemuiXiZrcYoemz5vIl0uUzs1OSUPi5cumPF4djZuuIERNVA+znH85Iy2k+DQQtFRGTVKBWNZZpDjus9RE0BD7iuBFjiAzr5UNJcpeetSO0nmG7O9sfXJ/tBWCnRPRE8vWNzlrq0tBhFl1EtWvkBDY7Daj/MWeigkumOGwB0/GDvO0AsOJZtHuGeddGHEi/lb1oJxlCOKXts8ZxopnbuDN5sB4qD3P5QUxgTfE1KFHEeklvwWUcnNpuDz7q12k0yzYhsJEE4MyiVwjZVuo66TPQd4AjU+JDzEIAwG4IJx98dh5C4AOA==
			</Password>
			<ResultURL>
				https://ussd.techbanc.co.ke/listen.php
			</ResultURL>
		</Caller>
		<Initiator>
			<IdentifierType>
				11
			</IdentifierType>
			<Identifier>
				testAPI
			</Identifier>
			<SecurityCredential>
				bhmVp+NzFj4oTs+BKo2vwmctiO+oylMIEG5C8O/ejl6f2e9oauY6+mWRqs4JqKQXPAh3EiaDNiij6sCY2ab8nn9RsAY9KYbT+JO1pcRlU1zMXTTTSwcXppLqrehHEAX2Et1mI2hPPZZZ2muqZmpieDISN/UOiKwdaBhYa2Jsn7wnYwedxXmNdH9lDgKCetkzBbj/DxsGZIfs6bTArapZ01FGigzPsYcxRw/+VzrS37jB+aWangNOEgvnQS/8PUwFYblxIwMi3XG4RgwjyaB8xfQo77mjbrIWLW1COcmDS0y1VkVUFlY2k5adfa5y73ejGIa2bbF2Morzfunf8/FAsA==
			</SecurityCredential>
			<ShortCode>
				511382
			</ShortCode>
		</Initiator>
		<PrimaryParty>
			<IdentifierType>
				4
			</IdentifierType>
			<Identifier>
				511382
			</Identifier>
			<ShortCode>
				511382
			</ShortCode>
		</PrimaryParty>
		<ReceiverParty>
			<IdentifierType>
				4
			</IdentifierType>
			<Identifier>
				110000
			</Identifier>
			<ShortCode>
				110000
			</ShortCode>
		</ReceiverParty>
		<AccessDevice>
			<IdentifierType>
				2
			</IdentifierType>
			<Identifier>
				1
			</Identifier>
		</AccessDevice>
		<Requester>
			<IdentifierType>
				1
			</IdentifierType>
			<Identifier>
				254722111111
			</Identifier>
		</Requester>
	</Identity>
	<KeyOwner>
		1
	</KeyOwner>
</request>
			]]>
		</RequestMsg>
	</Body>
</Envelope>
`;

const httpsAgent = new https.Agent({
    ca: fs.readFileSync('certs/Root.crt'),
    rejectUnauthorized: false
});

const options = {
	method: 'POST',
	url: 'http://192.168.9.48:8310/mminterface/request',
	data: wdsl,
	headers: {'Content-Type': 'text/xml; charset=utf-8'},
        httpsAgent : httpsAgent
}

axios(options).then(r => {
    console.log("Response ", r)})
.catch(err => {
    console.log(err)
})
