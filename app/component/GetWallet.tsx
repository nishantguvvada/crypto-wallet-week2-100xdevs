"use client";
import {useState} from "react";
import { mnemonicToSeedSync } from "bip39";
import {derivePath} from "ed25519-hd-key";
import {Keypair, PublicKey} from "@solana/web3.js";
import nacl from "tweetnacl";

export const GenerateWallet = ({mnemonic}:any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKey, setPubicKey] = useState<PublicKey[]>([]);

    function generateWallets() {

        const seed = mnemonicToSeedSync(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);

        setCurrentIndex(currentIndex+1);
        setPubicKey([...publicKey, keypair.publicKey]);

    }
    return <div>
        <button onClick={generateWallets} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create Wallets</button>
        {publicKey.map((p,i) => <div key={i}>
            <input type="text" value={p.toBase58()} readOnly className="mb-2 max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
        )}
    </div>
}