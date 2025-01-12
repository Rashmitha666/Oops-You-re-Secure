<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oops-You-re-Secure README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
            margin: 0;
        }

        h1 {
            color: #2c3e50;
        }

        h2 {
            color: #34495e;
        }

        pre {
            background-color: #ecf0f1;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #bdc3c7;
            overflow-x: auto;
        }

        code {
            font-family: 'Courier New', Courier, monospace;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            margin: 8px 0;
        }

        a {
            color: #2980b9;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .section-title {
            margin-top: 30px;
        }
    </style>
</head>
<body>

    <h1>Oops-You-re-Secure</h1>

    <h2>Project Overview</h2>
    <p><strong>Oops-You-re-Secure</strong> is a communication platform focused on ensuring secure and private interactions without the need for centralized servers. By leveraging direct peer-to-peer (P2P) communication, the project reduces dependency on cloud providers, lowering latency and enhancing privacy. The application uses a combination of RSA and AES encryption to guarantee secure messaging between the client and the server.</p>

    <h2 class="section-title">Features</h2>
    <ul>
        <li><strong>RSA Encryption</strong>: Asymmetric encryption for securely exchanging the AES key.</li>
        <li><strong>AES Encryption</strong>: Symmetric encryption used to encrypt the actual messages exchanged between the client and the server.</li>
    </ul>

    <h3 class="section-title">Client-side Features:</h3>
    <ul>
        <li><strong>RSA Key Generation</strong>: The client generates an RSA key pair (public/private) and shares the public key with the server.</li>
        <li><strong>Message Encryption</strong>: The client generates an AES key to encrypt the actual message. The AES key is then encrypted using the server's RSA public key before being sent to the server.</li>
    </ul>

    <h3 class="section-title">Server-side Features:</h3>
    <ul>
        <li><strong>RSA Public Key Reception</strong>: The server receives the client's RSA public key for encryption tasks.</li>
        <li><strong>AES Key Decryption</strong>: The server decrypts the encrypted AES key using its private RSA key.</li>
        <li><strong>Message Decryption</strong>: The server uses the decrypted AES key to decrypt the message.</li>
        <li><strong>Encrypted AES Key Return</strong>: The server encrypts the AES key using the client’s RSA public key and sends it back to the client for continued secure communication.</li>
    </ul>

    <h2 class="section-title">Client-side Workflow</h2>

    <h3>1. Key Generation:</h3>
    <ul>
        <li>The client generates a pair of RSA public and private keys.</li>
        <li>The keys are encoded in Base64 format and displayed for use.</li>
        <li>These RSA keys are utilized for encrypting and decrypting messages.</li>
    </ul>

    <h3>2. Sending Encrypted Data:</h3>
    <ul>
        <li>The client sends the RSA public key to the server to facilitate the encryption of sensitive data.</li>
        <li>The AES encryption key is then encrypted with the RSA public key and sent to the server.</li>
        <li>The AES key is used to encrypt the actual message content, which is transmitted securely.</li>
    </ul>

    <h2 class="section-title">Server-side Workflow</h2>

    <h3>1. Receiving Public RSA Key:</h3>
    <ul>
        <li>The server receives the public RSA key from the client to perform encryption tasks.</li>
    </ul>

    <h3>2. Message Decryption (AES Key):</h3>
    <ul>
        <li>The server receives the encrypted AES key and decrypts it using its private RSA key.</li>
        <li>Once decrypted, the server uses the AES key to decrypt the message content.</li>
    </ul>

    <h3>3. Sending Encrypted Message (Back to Client):</h3>
    <ul>
        <li>The server re-encrypts the AES key using the client's RSA public key and sends it back to the client, enabling continued secure communication.</li>
    </ul>

    <h2 class="section-title">Installation</h2>
    <ol>
        <li><strong>Clone the Repository:</strong>
            <pre><code>git clone https://github.com/Rashmitha666/Oops-You-re-Secure.git</code></pre>
        </li>
        <li><strong>Navigate to Project Directory:</strong>
            <pre><code>cd Oops-You-re-Secure</code></pre>
        </li>
        <li><strong>Install ElectronJS:</strong>
            <pre><code>npm install electron</code></pre>
        </li>
        <li><strong>Install NPM Packages:</strong>
            <pre><code>npm install</code></pre>
        </li>
        <li><strong>Start the Application:</strong>
            <pre><code>npm start</code></pre>
        </li>
    </ol>

    <h2 class="section-title">Contributing</h2>
    <p>Feel free to fork this repository and submit pull requests for any improvements or features you would like to add.</p>

    <h2 class="section-title">License</h2>
    <p>This project is licensed under the MIT License - see the <a href="#">LICENSE</a> file for details.</p>

</body>
</html>
