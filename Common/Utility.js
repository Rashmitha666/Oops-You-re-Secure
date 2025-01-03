import Client from "../Networking/Client.js";
import Listener from "../Networking/Listener.js";

export function isValidJSON(str) 
{
    try 
    {
        JSON.parse(str);
        return true;
    } 
    catch (e) 
    {
        return false;
    }
}

export function getAesKey()
{
    return (Client.aesKey? Client.aesKey: (Listener.aesKey? Listener.aesKey: null));
}

export function getAesInitialVector()
{
    return (Client.aesInitialVector? Client.aesInitialVector: (Listener.aesInitialVector? Listener.aesInitialVector: null));
}