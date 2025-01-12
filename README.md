# Oops-You-re-Secure

## Project Overview

**Oops-You-re-Secure** is a communication platform focused on ensuring secure and private interactions without the need for centralized servers. By leveraging direct peer-to-peer (P2P) communication, the project reduces dependency on cloud providers, lowering latency and enhancing privacy. The application uses a combination of RSA and AES encryption to guarantee secure messaging between the client and the server.

## Features

- **RSA Encryption**: Asymmetric encryption for securely exchanging the AES key.
- **AES Encryption**: Symmetric encryption used to encrypt the actual messages exchanged between the client and the server.

### Client-side Features:
- **RSA Key Generation**: The client generates an RSA key pair (public/private) and shares the public key with the server.
- **Message Encryption**: The client generates an AES key to encrypt the actual message. The AES key is then encrypted using the server's RSA public key before being sent to the server.

### Server-side Features:
- **RSA Public Key Reception**: The server receives the client's RSA public key for encryption tasks.
- **AES Key Decryption**: The server decrypts the encrypted AES key using its private RSA key.
- **Message Decryption**: The server uses the decrypted AES key to decrypt the message.
- **Encrypted AES Key Return**: The server encrypts the AES key using the client’s RSA public key and sends it back to the client for continued secure communication.

---

## Client-side Workflow

### 1. Key Generation:
- The client generates a pair of RSA public and private keys.
- The keys are encoded in Base64 format and displayed for use.
- These RSA keys are utilized for encrypting and decrypting messages.

### 2. Sending Encrypted Data:
- The client sends the RSA public key to the server to facilitate the encryption of sensitive data.
- The AES encryption key is then encrypted with the RSA public key and sent to the server.
- The AES key is used to encrypt the actual message content, which is transmitted securely.

---

## Server-side Workflow

### 1. Receiving Public RSA Key:
- The server receives the public RSA key from the client to perform encryption tasks.

### 2. Message Decryption (AES Key):
- The server receives the encrypted AES key and decrypts it using its private RSA key.
- Once decrypted, the server uses the AES key to decrypt the message content.

### 3. Sending Encrypted Message (Back to Client):
- The server re-encrypts the AES key using the client's RSA public key and sends it back to the client, enabling continued secure communication.

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Rashmitha666/Oops-You-re-Secure.git

2. **Navigate into directory**

   ```bash
   cd

3. **Install electronjs**

   ```bash
   npm install electron

4. **Install npm packages**

   ```
   npm install

5. **Start the Application**

   ```
   npm start

##Contributing
Feel free to fork this repository and submit pull requests for any improvements or features you would like to add.

#
