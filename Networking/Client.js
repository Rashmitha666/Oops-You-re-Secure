import { messageDataType, newtorkConfiguration } from '../Common/Constants.js';

const fs = require("fs");
const net = require('net');

class Client
{
    static client = null;

    static connect(host="127.0.0.1")
    {
        Client.client = net.connect(newtorkConfiguration.clientPort, host, ()=>
        {
            console.log("Connected to the server!");
            
        });

        
    }

    static disconnect()
    {
        if(Client.client)
        {
            Client.client.end();
        }
    }

    //fileBuffer.toString('base64')
    //Sending message format { "type": <messageDataType>, "data": <base 64 String> }
    static send(data, type, fileName="")
    {
        //Data will be the text message when message type is text and a base64 string when it is a file

        switch(type)
        {
            case messageDataType.TEXT:
                Client.client.write(JSON.stringify({ type: type, data: data}));
                break;

            case messageDataType.FILE:
            {
                //Returns EncryptedData object
                //const encyptedData = Encryption.encrypt(new TextEncoder().encode(new String("Hello World")), encryptionAlgorithm.AES);
                Client.client.write(JSON.stringify({ type: type, data: data, fileName: fileName}));
            }
                

            break;
        }
    }
}

export default Client;