import { messageDataType, networkConfiguration } from '../Common/Constants.js';
import Encryption from '../Common/Encryption.js';
import ChatPage from '../UserInterface/ChatPage.js';
import { receive } from './Receive.js';
import { send } from './Send.js';

const fs = require("fs");
const net = require('net');
const crypto = require("crypto");

class Client
{
    static client = null;
    static rsaPublicKey = null;
    static rsaPrivateKey = null;
    static aesKey = null;
    static aesInitialVector = null;

    static connect(host="127.0.0.1")
    {
        Client.client = net.connect(networkConfiguration.clientPort, host, ()=>
        {
            console.log("Connected to the server!");
            window.openPage("chat-page");


            Client.client.on("data", (data)=>
            {
                receive(data);
            });

            const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });

            const publicKeyPem = publicKey.export({ type: 'spki', format: 'pem' });
            const privateKeyPem = privateKey.export({ type: 'pkcs8', format: 'pem' });

            //Store the rsa keys in base64 format
            Client.rsaPublicKey = Buffer.from(publicKeyPem).toString('base64');
            Client.rsaPrivateKey = Buffer.from(privateKeyPem).toString('base64');


            console.log("Generated Rsa keys in pem format (Base64 encoding): ");

            console.log(Client.rsaPublicKey);
            console.log(Client.rsaPrivateKey);
            
            send({ publicRsaKey: Client.rsaPublicKey }, messageDataType.EXCHANGE_SENDER_PUBLIC_RSA_KEY);
            

        });
    }

    static disconnect()
    {
        if(Client.client)
        {
            Client.client.end();
        }
    }

}

export default Client;