import { encryptionAlgorithm } from './Constants.js';
import Decryption from './Decryption.js';
import EncryptedData from './EncryptedData.js';
import { getAesInitialVector, getAesKey } from './Utility.js';


const crypto = require('crypto');

class Encryption
{
    static generateKeyAes()
    {
        return crypto.randomBytes(32);
    }

    static generateInitialVectorAes()
    {
        return crypto.randomBytes(16); 
    }

    static aes(data, key, initialVector)
    {
        if (!(data instanceof Uint8Array)) 
        {
            return null;
        }
    
        const cipher = crypto.createCipheriv('aes-256-cbc', key, initialVector);  
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]); 
        const encryptedByteArray = new Uint8Array(encrypted);

        const encryptedDataObject = new EncryptedData(encryptedByteArray, key, null, initialVector);
        return encryptedDataObject; 
    }

    static rsa(data, publicKey, privateKey)
    {

        const encrypted = crypto.publicEncrypt(publicKey, data);
        const encryptedByteArray = new Uint8Array(encrypted);
        const encryptedDataObject = new EncryptedData(encryptedByteArray, privateKey, publicKey);

        return encryptedDataObject;
    }
    
    static encrypt(data, algorithmUsed)
    {
        switch(algorithmUsed)
        {
            case encryptionAlgorithm.AES:
            {
                const key = getAesKey();
                const initialVector = getAesInitialVector();
                return Encryption.aes(data, key, initialVector);
            }
                
            case encryptionAlgorithm.RSA:
            {
                const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa',{ modulusLength:2048 });
                return Encryption.rsa(data, publicKey, privateKey);
            }     

        }
    }
}

export default Encryption;





