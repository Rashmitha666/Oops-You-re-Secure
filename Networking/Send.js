import { messageDataType } from "../Common/Constants.js";
//fileBuffer.toString('base64')
//Sending message format { "type": <messageDataType>, "data": <base 64 String> }

export function send(socket, data, type, fileName="")
{
    //Data will be the text message when message type is text and a base64 string when it is a file

    if(!socket)
    {
        console.error("Socket is invalid");
    }

    switch(type)
    {
        case messageDataType.TEXT:
            socket.write(JSON.stringify({ type: type, data: data}));
            break;

        case messageDataType.FILE:
        {
            //Returns EncryptedData object
            //const encyptedData = Encryption.encrypt(new TextEncoder().encode(new String("Hello World")), encryptionAlgorithm.AES);
            socket.write(JSON.stringify({ type: type, data: data, fileName: fileName}));
        }
            

        break;
    }
}