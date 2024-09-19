export const connectWalletString = `import { 
    ConnectionProvider, 
    WalletProvider 
} from '@solana/wallet-adapter-react';
import { 
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';

export function ConnectWallet() {
    const endpoint = "https://api.devnet.solana.com"
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButtonDynamic />
                    <WalletDisconnectButtonDynamic />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}`;

export const createSeedPhraseString = `import { generateMnemonic } from "bip39"

const mnemonic = generateMnemonic();
`

export const generateWalletString = `import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { 
    Keypair,
    PublicKey
} from "@solana/web3.js";

export const generateWallet = () => {

    const seed = mnemonicToSeedSync(mnemonic);
    const path = "m/44'/501'/{currentIndex}'/0'";
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    return (
        <div>
            {keypair.publicKey}
            {keypair.secretKey}
        </div>
    )
}
`

export const fetchAccountString = `const balance = await axios.post("https://api.devnet.solana.com", {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [
            address.toString() // public key of the account 
        ]
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
    }
});

const airdrop = await axios.post("https://api.devnet.solana.com", {
        jsonrpc: "2.0",
        id: 1,
        method: "requestAirdrop",
        params: [
            address.toString(), // public key of the account 
            1000000000
        ]
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
    }
});
`

export const transferSolString = `import {
    Keypair, 
    Connection, 
    clusterApiUrl, 
    PublicKey, 
    Transaction, 
    SystemProgram, 
    LAMPORTS_PER_SOL, 
    sendAndConfirmTransaction
} from "@solana/web3.js";

export default function TransferSol() {
    const connection = new Connection(
        clusterApiUrl("devnet"), 
        "confirmed"
    );

    // toPublicKey from user input
    const TO_PUBLIC_KEY = new PublicKey(toPublicKey); 
    // fromPublicKey from user input
    const FROM_PUBLIC_KEY = new PublicKey(fromPublicKey); 
    // fromPrivateKey from user input
    const FROM_KEYPAIR = Keypair.fromSecretKey(
        bs58.decode(fromPrivateKey)
    );


    const transferTransaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: FROM_PUBLIC_KEY,
            toPubkey: TO_PUBLIC_KEY,
            lamports: LAMPORTS_PER_SOL * amount
            // LAMPORTS_PER_SOL from user input
        })
    );
    
    const signature = await sendAndConfirmTransaction(
        connection, 
        transferTransaction, 
        [FROM_KEYPAIR]
    );
    
    return (
        <div>{signature}</div>
    )
`

export const createTokenString = `const connection = new Connection(
    clusterApiUrl("devnet"), 
    "confirmed"
);

const mintOwner = Keypair.fromSecretKey(
    bs58.decode(ownerKeypair)
);

// Step 1: create a mint
const mintPubKey = await createMint(
    connection,
    mintOwner,
    mintOwner.publicKey,
    mintOwner.publicKey,
    8
)

// Step 2: create an associated token account (ATA)
// the account is associated with the token and the user
// user -> ATA -> mint
const mintAssociatedAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    mintOwner, // payer of the transaction
    mintPubKey, // using mint's public key
    mintOwner.publicKey, // owner/user of the ATA, here the mintOwner is the owner of the ATA
)

console.log("Mint Public Key : ", mintPubKey);
console.log("Mint Associated Token Account : ", mintAssociatedAccount);

const tokenAmountBefore = await connection.getTokenAccountBalance(
    mintAssociatedAccount.address
);

console.log("Balance in ATA before minting : ", tokenAmountBefore);

// Step 3: mint a certain amount to the ATA
const txhash = await mintToChecked(
    connection,
    mintOwner, // payer of the transaction
    mintPubKey, // mint's public key
    mintAssociatedAccount.address, // destination
    mintOwner, // mint authority
    1e8, // amount
    8 // decimals
);

const tokenAmountAfter = await connection.getTokenAccountBalance(
    mintAssociatedAccount.address
);
console.log("Balance in ATA after minting : ", tokenAmountAfter);

const tokenAccountDetails = await getMint(connection, mintPubKey);
console.log("ATA details : ", tokenAccountDetails);
`