import { messageDataType, networkConfiguration } from '../Common/Constants.js';
import ChatPage from '../UserInterface/ChatPage.js';
import { receive } from './Receive.js';

const fs = require("fs");
const net = require('net');

class Client
{
    static client = null;

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