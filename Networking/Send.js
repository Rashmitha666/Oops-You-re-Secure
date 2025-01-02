import { messageDataType } from "../Common/Constants.js";
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

            unencyptedData = { type: type, data: data };
            //Encryption
            socket.write(JSON.stringify(unencyptedData));
            break;

        case messageDataType.FILE:
        {
            unencyptedData = { type: type, data: data, fileName: fileName };
            //Returns EncryptedData object
            //const encyptedData = Encryption.encrypt(new TextEncoder().encode(new String("Hello World")), encryptionAlgorithm.AES);
            //Encryption
            socket.write(JSON.stringify(unencyptedData));
        }
        


        break;
    }

    const chatSentEvent = new CustomEvent("on-chat-sent", {detail: unencyptedData});
    window.dispatchEvent(chatSentEvent);
}