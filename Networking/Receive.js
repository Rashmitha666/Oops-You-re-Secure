import { messageDataType } from "../Common/Constants.js";

export function receive(data)
{
    try
    {
        const dataObject = JSON.parse(data);
        
        switch(dataObject["type"])
        {
            case messageDataType.TEXT:
            {
                
                break;
            }
            case messageDataType.FILE: 
            {
                break;
            }

        }
    }
    catch(exception)
    {

    }
}