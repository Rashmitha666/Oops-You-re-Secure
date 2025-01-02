import Client from "../Networking/Client.js";

class ConnectionPage extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = 
        `
            <input style="margin: 10px;width:35%;font-size:25px;" type ="text" placeholder = "Enter host...">
            <button style="margin: 10px; padding: 15px; color: white; background-color: rgb(91, 76, 175); border-radius:5px;"> Connect </button>
        `;

        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";
        
        const textBox = this.querySelector("input");
        const connectButton = this.querySelector("button");

        textBox.addEventListener("keydown", (event)=>
        {    
            if(event.key == "Enter")
            {
                console.log("Enter pressed!");
                connectButton.click();
            }
        });

        connectButton.addEventListener("click", ()=>
        {
            Client.connect(textBox.value);
        });
    }
}

customElements.define("connection-page", ConnectionPage)
export default ConnectionPage;