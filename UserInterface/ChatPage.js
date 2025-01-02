import { messageDataType } from "../Common/Constants.js";
import { send } from "../Networking/Send.js";
import ChatMessage from "./ChatMessage.js";

class ChatPage extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.height = "100vh"; 
        this.style.width = "100%"; 
        this.style.overflow = "hidden";

        this.innerHTML=
        `
            <style>
                .chat-container
                {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    width: 100%;
                }

                .messages 
                {
                    flex-grow: 1;
                    overflow-y: auto; 
                    padding: 10px;
                    background-color: #1f1f1f;
                    border-bottom: 1px solid #ccc;
                    margin-bottom: 10px;
                }
                .input-area 
                {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    background-color: white;
                    border-top: 1px solid #ccc;
                }

                .input-area input 
                {
                    flex-grow: 1;
                    padding: 10px;
                    border-radius: 20px;
                    border: 1px solid #ccc;
                    margin-right: 10px;
                }

                .send-button,.attach-button 
                {
                    background-color: #25d366; 
                    border: none;
                    color: white;
                    padding: 10px;
                    border-radius: 10px;
                    cursor: pointer;
                }

                .attach-button 
                {
                    background-color: #34b7f1; 
                    margin-right: 10px;
                }

                .send-button:hover,
                .attach-button:hover 
                {
                    background-color: #128c7e;
                }

            </style>
            <div class="chat-container">
                <div class="messages">
                </div>
                <div class="input-area">
                    <button class="attach-button">Attach File</button>
                    <input type="text" class="message-input" placeholder="Type a message...">
                    <button class="send-button">Send</button>
                </div>
            </div>
        `;

        const sendButton = this.querySelector(".send-button");
        const attachButton = this.querySelector(".attach-button");
        const messageInput = this.querySelector(".message-input");
        const messagesContainer = this.querySelector(".messages");

        sendButton.addEventListener("click", () => 
        {
            const messageText = messageInput.value.trim();

            if(messageText) 
            {
                send(messageText, messageDataType.TEXT);
                messageInput.value = "";
            }
        });

        messageInput.addEventListener("keydown", (event)=>
        {
            if(event.key == "Enter")
            {
                sendButton.click();
            }
        });

        attachButton.addEventListener("click", () => 
        {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            
            fileInput.style.display = "none";
            document.body.appendChild(fileInput);

            fileInput.addEventListener("change", (event)=>
            {
                const file = fileInput.files[0];
                console.log("File: " + file);

                if(file) 
                {
                    const reader = new FileReader();
                    reader.onload = () => 
                    {
                        const arrayBuffer = reader.result;
                        const byteArray = new Uint8Array(arrayBuffer);
                        const base64String = btoa(String.fromCharCode(...byteArray));
                        const fileName = file.name;

                        send(base64String, messageDataType.FILE, fileName);
                    }
                    reader.readAsArrayBuffer(file);
                }
            });

            fileInput.click();
        });

        window.addEventListener("on-chat-received", (event)=>
        {
            const newChatMessage = document.createElement("chat-message");
            const chatJson = event.detail;

            newChatMessage.initialize(false, chatJson);
            messagesContainer.appendChild(newChatMessage);
        });

        window.addEventListener("on-chat-sent", (event)=>
        {
            console.log("Message sent!");

            const newChatMessage = document.createElement("chat-message");
            const chatJson = event.detail;
            
            newChatMessage.initialize(true, chatJson);
            messagesContainer.appendChild(newChatMessage);
        });
    }
}

customElements.define('chat-page', ChatPage);
export default ChatPage;