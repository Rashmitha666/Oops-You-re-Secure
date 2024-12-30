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