import { encryptionAlgorithm, messageDataType } from "../Common/Constants.js";
import Decryption from "../Common/Decryption.js";
import EncryptedData from "../Common/EncryptedData.js";
import Encryption from "../Common/Encryption.js";
import { getAesInitialVector, getAesKey, isValidJSON } from "../Common/Utility.js";
import Client from "./Client.js";
import Listener from "./Listener.js";
import { send } from "./Send.js";

const crypto = require("crypto");

export function receive(data)
{
    try
    {
        if(isValidJSON(data))
        {
            const unencryptedJson = JSON.parse(data);

            console.log("Received an unencrypted message!");
            console.log(unencryptedJson);

            switch(unencryptedJson.type)
            {
                //Expected format: {"type": <type>, "data": { "publicRsaKey": <value> }}
                //This case will occur on the receiver side
                case messageDataType.EXCHANGE_SENDER_PUBLIC_RSA_KEY:
                {
                    console.log("Received public RSA key from sender!");
                    
                    const publicRsaKey = unencryptedJson.data.publicRsaKey;
                    const publicKeyPem = Buffer.from(publicRsaKey, 'base64').toString('utf-8');

                    Listener.clientPublicRsaKey = publicKeyPem;

                    const aesKey = Encryption.generateKeyAes();
                    const aesInitialVector = Encryption.generateInitialVectorAes();

                    Listener.aesKey = aesKey;
                    Listener.aesInitialVector = aesInitialVector;

                    const encryptedKey = crypto.publicEncrypt(Listener.clientPublicRsaKey, aesKey);
                    const encryptedInitialVector = crypto.publicEncrypt(Listener.clientPublicRsaKey, aesInitialVector);

                    const message = { encryptedKey: encryptedKey.toString('hex'), encryptedInitialVector: encryptedInitialVector.toString('hex') };
                    
                    console.log("Sending encrypted aes keys: ");

                    send(message, messageDataType.ENCRYPT_RECEIVER_AES_KEY_WITH_SENDER_RSA_PUBLIC_KEY);

                    console.log("Sent encrypted Aes key!");

                    break;
                }

                //Expected format: {"type": <type>, "data": { "encryptedKey": <value>, "encryptedInitialVector": <value> }}
                //This case will occur on the sender side
                case messageDataType.ENCRYPT_RECEIVER_AES_KEY_WITH_SENDER_RSA_PUBLIC_KEY:
                {
                    console.log("Client: Received encrypted AES key of receiver: ");

                    const encryptedAesKey = unencryptedJson.data.encryptedKey;
                    const encryptedAesInitialVector = unencryptedJson.data.encryptedInitialVector;


                    const aesKey = crypto.privateDecrypt(Buffer.from(Client.rsaPrivateKey, 'base64').toString('utf-8'), Buffer.from(encryptedAesKey, 'hex'));
                    const aesInitialVector = crypto.privateDecrypt(Buffer.from(Client.rsaPrivateKey, 'base64').toString('utf-8'), Buffer.from(encryptedAesInitialVector, 'hex'));

                    Client.aesKey = aesKey;
                    Client.aesInitialVector = aesInitialVector;


                    break;
                }
            }

            return;
        }

        console.log("Received: " + data);

        const decryptedBytes = Decryption.decrypt(new EncryptedData(data, getAesKey(), null, getAesInitialVector()), encryptionAlgorithm.AES);
        console.log("Decrypted bytes: " + decryptedBytes);
        
        const decryptedJsonString = new TextDecoder().decode(decryptedBytes)
        const dataObject = JSON.parse(decryptedJsonString);

        const chatReceivedEvent = new CustomEvent("on-chat-received", { detail: dataObject });
        window.dispatchEvent(chatReceivedEvent);
        
    }
    catch(exception)
    {
        console.error(exception);
    }
}