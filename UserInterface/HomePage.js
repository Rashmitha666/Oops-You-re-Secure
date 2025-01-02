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
                button 
                {
                    font-size: 16px;
                    padding: 10px 20px;
                    margin: 10px;
                    cursor: pointer;
                    width: 40%;
                }
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
                .connect-button:hover, .listen-button:hover 
                {
                    opacity: 0.8;
                }
            </style>
            <h1 align="center">Home Page</h1>
            <button class="connect-button">Connect</button>
            <button class="listen-button">Listen</button>


        `
    }
}

customElements.define("home-page", HomePage);
export default HomePage;