class EncryptedData
{
    constructor(data, privateKey = null, publicKey = null, initialVector = null)
    {
        if(data instanceof Uint8Array)
        {
            this.data = data;
            this.privateKey = privateKey;
            this.publicKey = publicKey;
            this.initialVector = initialVector;
        }
        else
        {
            console.error("Incorrect data format!");
        }
    }

    toJson()
    {
        //TODO: If any field is null dont save it.
        return {
            //TODO:
        }
    }

    static fromJson()
    {

    }

}

export default EncryptedData;