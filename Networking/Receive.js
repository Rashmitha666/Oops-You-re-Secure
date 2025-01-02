import { messageDataType } from "../Common/Constants.js";

export function receive(data)
{
    try
    {
        const dataObject = JSON.parse(data);

        const chatReceivedEvent = new CustomEvent("on-chat-received", { detail: dataObject });
        window.dispatchEvent(chatReceivedEvent);
        
    }
    catch(exception)
    {

    }
}