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
                    background-color: #f5f5f5;
                    border-bottom: 1px solid #ccc;
                    margin-bottom: 10px;
                }

                .message 
                {
                    background-color: #e0e0e0;
                    padding: 10px;
                    margin: 5px 0;
                    border-radius: 10px;
                }

                .message.me 
                {
                    background-color: #dcf8c6; 
                    align-self: flex-end;
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

                .send-button,
                .attach-button 
                {
                    background-color: #25d366; 
                    border: none;
                    color: white;
                    padding: 10px;
                    border-radius: 50%;
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
                    <div class="message">Hello!</div>
                    <div class="message me">Hi, how are you?</div>
                    <div class="message">I'm good, thanks!</div>
                </div>
                <div class="input-area">
                    <button class="attach-button">+</button>
                    <input type="text" class="message-input" placeholder="Type a message...">
                    <button class="send-button">Send</button>
                </div>
            </div>
        `;

        const sendButton = this.querySelector(".send-button");
        const attachButton = this.querySelector(".attach-button");
        const messageInput = this.querySelector(".message-input");
        const messagesContainer = this.querySelector(".messages");

        sendButton.addEventListener("click", () => {
            const messageText = messageInput.value.trim();
            if (messageText) {
                const messageDiv = document.createElement("div");
                messageDiv.classList.add("message", "me");
                messageDiv.textContent = messageText;
                messagesContainer.appendChild(messageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                messageInput.value = "";
            }
        });

        attachButton.addEventListener("click", () => {
            alert("Attach button clicked!");
        });
    }
}

customElements.define('chat-page', ChatPage);