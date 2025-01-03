import { encryptionAlgorithm, messageDataType } from "../Common/Constants.js";
import Encryption from "../Common/Encryption.js";
import Client from "./Client.js";
import Listener from "./Listener.js";
//fileBuffer.toString('base64')
//Sending message format { "type": <messageDataType>, "data": <base 64 String> }

export function send(data, type, fileName="")
{
    //Data will be the text message when message type is text and a base64 string when it is a file
    const socket = (Client.client ? Client.client : (Listener.socket? Listener.socket: null)); 

    if(!socket)
    {
        console.error("Socket is invalid");
    }

    let unencyptedData = {};

    switch(type)
    {
        case messageDataType.TEXT:
        {
            unencyptedData = { type: type, data: data };
            const unencyptedDataString = JSON.stringify(unencyptedData);
            const dataBuffer = new TextEncoder().encode(unencyptedDataString);

            const encryptedDataObject = Encryption.encrypt(dataBuffer, encryptionAlgorithm.AES);

            console.log("Unencrypted buffer is :" + dataBuffer);
            console.log("Encrypted buffer is: " + encryptedDataObject.data);

            socket.write(encryptedDataObject.data);

            break;
        }


        case messageDataType.FILE:
        {

            unencyptedData = { type: type, data: data, fileName: fileName };

            const unencyptedDataString = JSON.stringify(unencyptedData);
            const dataBuffer = new TextEncoder().encode(unencyptedDataString);
            
            const encryptedDataObject = Encryption.encrypt(dataBuffer, encryptionAlgorithm.AES);

            console.log("Unencrypted buffer is :" + dataBuffer);
            console.log("Encrypted buffer is: " + encryptedDataObject.data);

            socket.write(encryptedDataObject.data);

            break;
        }
        case messageDataType.EXCHANGE_SENDER_PUBLIC_RSA_KEY:
        {
            console.log("Sending public Rsa key!");
            unencyptedData = { type: type, data: data };
            socket.write(JSON.stringify(unencyptedData));
            return;
        }
        case messageDataType.ENCRYPT_RECEIVER_AES_KEY_WITH_SENDER_RSA_PUBLIC_KEY:
        {
            console.log("Sending encrypted Aes key");
            unencyptedData = { type: type, data: data };
            socket.write(JSON.stringify(unencyptedData));
            return;
        }
          
    }

    const chatSentEvent = new CustomEvent("on-chat-sent", {detail: unencyptedData});
    window.dispatchEvent(chatSentEvent);
}