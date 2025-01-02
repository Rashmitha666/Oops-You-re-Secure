import { messageDataType } from "../Common/Constants.js";

class ChatMessage extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(isSender, chatJson)
    {
        this.isSender = isSender;
        this.chatJson = chatJson;
    }

    connectedCallback()
    {
        this.innerHTML = 
        `
            <div class="message-container">

            </div>
        `;

        this.style.display = "flex";
        this.style.width = "100%";

        const messageContainer = this.querySelector(".message-container");
        const isSender = this.isSender;
        const chatJson = this.chatJson;

        messageContainer.style.padding = "10px";
        messageContainer.style.borderRadius = "10px";

        if(isSender)
        {
            this.style.justifyContent = "flex-end";
            messageContainer.style.backgroundColor = "white";
            messageContainer.style.color = "black";
            
        }
        else
        {
            this.style.justifyContent = "flex-start";
            messageContainer.style.backgroundColor = "rgb(91, 76, 175)";
            messageContainer.style.color = "white";

        }

        switch(chatJson.type)
        {
            case messageDataType.TEXT:
            {
                messageContainer.innerText = chatJson.data;
                break;
            }

            case messageDataType.FILE:
            {
                const downloadButton = document.createElement("button");
                downloadButton.innerText = chatJson.fileName;

                downloadButton.addEventListener("click", (event)=>
                {
                    const fileName = chatJson.fileName;
                    const dataBase64 = chatJson.data;

                    function base64ToByteArray(base64) 
                    {
                        const binaryString = atob(base64); 
                        const len = binaryString.length;
                        const bytes = new Uint8Array(len);

                        for (let i = 0; i < len; i++) 
                        {
                            bytes[i] = binaryString.charCodeAt(i);
                        }

                        return bytes;
                    }
                    
                    const byteArray = base64ToByteArray(dataBase64);
                    const blob = new Blob([byteArray], { type: "application/octet-stream" });
                    const link = document.createElement("a");

                    link.href = URL.createObjectURL(blob);
                    link.download = fileName; 
                    link.style.display = "none";

                    document.body.appendChild(link);

                    link.click();
                    link.remove();

                    URL.revokeObjectURL(link.href);
                });

                messageContainer.appendChild(downloadButton);
                break;
            }

        }

    }
}

customElements.define("chat-message", ChatMessage);
export default ChatMessage;