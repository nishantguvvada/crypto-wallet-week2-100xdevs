"use client";
import {useState} from "react";
import { mnemonicToSeedSync } from "bip39";
import {derivePath} from "ed25519-hd-key";
import {Keypair, PublicKey} from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";

export const GenerateWallet = ({mnemonic}:any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(true);
    const [showError, setShowError] = useState(false);
    const [keyPairs, setKeyPairs]  = useState<Keypair[]>([]);

    function generateWallets() {
        if (mnemonic != "") {

            setShowError(false);
            const seed = mnemonicToSeedSync(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
    
            setCurrentIndex(currentIndex+1);
            setKeyPairs([...keyPairs, keypair]);

        } else {

            setShowError(true);

        }

    }

    const clickEye = () => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    }

    return <div>
        <button onClick={generateWallets} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create Wallets</button>
        {showError ? 
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Alert!</span> Generate a mnemonic to begin creating wallets!
            </div> : ""
        }
        {keyPairs.map((k,i) => <div key={i}>
        <label className="block text-sm mb-2 dark:text-white">Public Key {i+1}</label>
            <input type="text" value={bs58.encode(k.publicKey.toBuffer())} readOnly className="mb-2 max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <label className="block text-sm mb-2 dark:text-white">Private Key {i+1}</label>
            <div className="flex flex-row gap-2">
                <input type={showPassword ? 'password' : 'text'} value={bs58.encode(k.secretKey)} readOnly className="mb-2 max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <button type="button" onClick={clickEye} className="z-20 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500">
                    <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                        <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
            </div>
        </div>
        )}
    </div>
}