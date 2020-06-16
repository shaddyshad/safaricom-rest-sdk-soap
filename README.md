# safaricom-rest-sdk-soap
## In development, dont use in production.
Mpesa Soap rest boilerplate sdks for javascript

> Provid access to safaricom mpesa sdk using SOAP adapters

## Install
Installation via github 

#### Clone the boilerplate
Navigate into your project folder 

`$ git clone git@github.com:shaddyshad/safaricom-rest-sdk-soap.git`

#### Install the dependencies

`$ npm install `

#### Set environment variable
Create a `.env` file on your root folder with the following keys defined

```
RESULT_URL= http://url/results   # url of result listener
QUEUE_TIMEOUT_URL= http://url/timeout  # timeout listener url
SPID=ENTER YOUR SP ID
SERVICE_ID=ENTER YOUR SERVICE ID
INITIATOR_NAME=INITIATOR SERVICE NAME
SECURITY_CREDENTIALS=ENCRYPTED INITIATOR SERVICE PASSWORD
PAYMENTS_SERVICE_PASSWORD=PAYMENTS SERVICE PASSWORD
```

> **Note** Enter the parameters provided to you by Safaricom on registration
> **Note** Ensure you `ignore` the `.env` file by adding `.env` to `.gitignore`

## Usage
This is a boilerplate, so to use it you have to write your source in the created`index.js` file.
Import the module you require from `index.js` as the main entry file
#### Modules

##### MobileB2C
+ `async initiateB2C({recipient, idNum, commandId, amount})` - creates a b2c request and sends it to mm broker
    + `recipient` - Phone number of the recipient in `2547XXXXXXX` format.
    + `amount` - Float value representing the amount to be sent to the user

    It returns successful payload or rejects with an error in the case

+ `async initiateB2B({recipient, amount})` - initiates a b2b request with the mobile money broker (mm broker)
    + `recipient` - *REQUIRED* The short code of the receiving party 
    + `amount` - *REQUIRED* value to be sent

    Returns a succesfullor rejected payload appropriately

    *NOTE*  specify the `PHONE_NUMBER` env key, it is used as the requester identifier