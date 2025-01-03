import { messageDataType, networkConfiguration } from '../Common/Constants.js';
import { receive } from './Receive.js';
import ChatPage from '../UserInterface/ChatPage.js';
const net = require('net');

class Listener
{   
    static server = null;
    static socket = null;
    static clientPublicRsaKey = null;
    static aesKey = null;
    static aesInitialVector = null;
    
    static start()
    {
        Listener.server = net.createServer((socket)=>
        {
            //To ensure one connection at a time.
            if(Listener.socket)
            {
                socket.end();
            }

            Listener.socket = socket;

            console.log("A client has connected!");

            window.openPage("chat-page");

            Listener.socket.on("data", (data)=>
            {
                receive(data);
            });

        });

        Listener.server.listen(networkConfiguration.listenerPort , () => 
        {
            console.log(`Server is listening on port ${networkConfiguration.listenerPort}`);
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