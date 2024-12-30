import { messageDataType } from '../Common/Constants.js';

const net = require('net');

class Listener
{   
    static server = null;
    static socket = null;

    static start()
    {
        Listener.server = net.createServer((socket)=>
        {
            Listener.socket = socket;

            Listener.socket.on("data", (data)=>
            {
                Listener.handleIncomingData(data);
            });
        });
        
    }

    static stop()
    {
        if(Listener.socket)
        {
            Listener.socket.end();
            Listener.socket = null;
        }
    }

    static handleIncomingData(data)
    {

        try
        {
            const dataObject = JSON.parse(data);
            
            switch(dataObject["type"])
            {
                case messageDataType.TEXT:
                {

                    break;
                }
                case messageDataType.FILE: 
                {
                    break;
                }

            }
        }
        catch(exception)
        {

        }
    }
}

export default Listener;