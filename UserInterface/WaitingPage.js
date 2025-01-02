import Listener from "../Networking/Listener.js";

class WaitingPage extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.innerHTML = `
            <h1> Waiting For Someone to Connect ... </h1>
            <button style="color: white;padding:15px;background-color:rgb(91, 76, 175); border-radius:5px;">Go To Home</button>
        `;
        
        const goToHomeButton = this.querySelector("button");

        this.style.display = "flex";
        this.style.alignItems = "center";
        this.style.justifyContent = "center";

        goToHomeButton.addEventListener("click", ()=>
        {
            Listener.stop();
            window.openPage("home-page");
        });

    }
}

customElements.define("waiting-page", WaitingPage)
export default WaitingPage;