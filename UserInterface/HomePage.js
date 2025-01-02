import Listener from "../Networking/Listener.js";
import WaitingPage from "./WaitingPage.js";
import ConnectionPage from "./ConnectionPage.js";

//Web component with 2 buttons send and listen
class HomePage extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.style.display = "flex";
        this.style.justifyContent = "space-evenly";
        this.style.alignItems = "center";
        this.style.flexDirection = "column";
        this.style.flex = 1;

        this.innerHTML=
        `
             <style>
                
                .connect-button 
                {
                    background-color:rgb(91, 76, 175);
                    color: white;
                    border: none;
                    border-radius: 5px;
                }
                .listen-button 
                {
                    background-color:rgb(91, 76, 175);
                    color: white;
                    border: none;
                    border-radius: 5px;
                }

                button 
                {
                    font-size: 16px;
                    padding: 10px 20px;
                    margin: 10px;
                    cursor: pointer;
                    width: 40%;
                }
            </style>
            <h1 align="center">Home Page</h1>
            <button class="connect-button">Connect</button>
            <button class="listen-button">Listen</button>


        `;

        const connectButton = this.querySelector(".connect-button");
        const listenButton = this.querySelector(".listen-button");

        connectButton.addEventListener("click", ()=>
        {
            window.openPage("connection-page");
        });

        listenButton.addEventListener("click", ()=>
        {
            Listener.start();
            window.openPage("waiting-page");
        });

    }
}

customElements.define("home-page", HomePage);
export default HomePage;