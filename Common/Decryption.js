import { encryptionAlgorithm } from '../Constants.js';
import Encryption from './Encryption.js';

const crypto = require('crypto');

class Decryption
{   
    static aes(encryptedData)
    {
        if(!(encryptedData.privateKey && encryptedData.initialVector && encryptedData.data))
        {
            return null;
        } 

        const decipher = crypto.createDecipheriv('aes-256-cbc', encryptedData.privateKey, encryptedData.initialVector);
        const decrypted = Buffer.concat([decipher.update(encryptedData.data),decipher.final()]);
        
        return decrypted;
    }

    static rsa(encryptedData)
    {
        return crypto.privateDecrypt(encryptedData.privateKey,encryptedData.data);
    }

    static decrypt(encryptedData, algorithmUsed)
    {
        switch(algorithmUsed)
        {
            case encryptionAlgorithm.AES:
            {     
                return Decryption.aes(encryptedData);
            }
            case encryptionAlgorithm.RSA:
            {
                return Decryption.res(encryptedData);
            }
        }
    }
}
export default Decryption;

