//Web component with 2 buttons send and receive
class HomePage extends innerHTML
{
    constructor()
    {
        super();
    }
    connectedCallback()
    {
        this.innerHTML=
        `
             <style>
                button {
                    font-size: 16px;
                    padding: 10px 20px;
                    margin: 10px;
                    cursor: pointer;
                }
                #sendButton {
                    background-color:rgb(91, 76, 175);
                    color: white;
                    border: none;
                    border-radius: 5px;
                }
                #receiveButton {
                    background-color: #008CBA;
                    color: white;
                    border: none;
                    border-radius: 5px;
                }
                #sendButton:hover, #receiveButton:hover {
                    opacity: 0.8;
                }
            </style>
            
            <div>
                <button id="sendButton">Send</button>
                <button id="receiveButton">Receive</button>
            </div>

        `
    }
}