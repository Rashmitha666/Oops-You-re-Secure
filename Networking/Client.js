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

}

export default Client;