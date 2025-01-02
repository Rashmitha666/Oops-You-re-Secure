import { messageDataType } from '../Common/Constants.js';
import { receive } from './Receive.js';

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
                receive(data);
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

}

export default Listener;