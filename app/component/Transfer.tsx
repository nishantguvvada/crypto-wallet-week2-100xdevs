"use client";
import { useState } from "react";
import {
    Keypair, 
    Connection, 
    clusterApiUrl, 
    PublicKey, 
    Transaction, 
    SystemProgram, 
    LAMPORTS_PER_SOL, 
    sendAndConfirmTransaction,
    Cluster
} from "@solana/web3.js";
import bs58 from "bs58";

export default function TransferSol() {
    const [toPublicKey, setToPublicKey] = useState("");
    const [fromPublicKey, setFromPublicKey] = useState("");
    const [fromPrivateKey, setFromPrivateKey] = useState("");
    const [amount, setAmount] = useState(1);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const sendTransaction = async () => {

        try{
            setFailed(false);
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

            const TO_PUBLIC_KEY = new PublicKey(toPublicKey);
            const FROM_PUBLIC_KEY = new PublicKey(fromPublicKey);
            const FROM_KEYPAIR = Keypair.fromSecretKey(bs58.decode(fromPrivateKey));
    
            // console.log(`Sending from ${fromPublicKey}`);
            // console.log(`Sending to ${toPublicKey}`);
    
            const transferTransaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: FROM_PUBLIC_KEY,
                    toPubkey: TO_PUBLIC_KEY,
                    lamports: LAMPORTS_PER_SOL * amount
                })
            );
    
            const signature = await sendAndConfirmTransaction(connection, transferTransaction, [FROM_KEYPAIR]);
    
            console.log("Signature : ", signature);
    
            setSuccess(true);
    
            setTimeout(()=>{
                setSuccess(false);
                console.log("turned off");
            },5000);

        } catch(err) {
            console.log("Error: Transaction did not go through!", err);
            setFailed(true);
            setTimeout(()=>{
                setFailed(false);
                console.log("turned off");
            },7000);
        }

    }


    return <div>
        <label className="block text-sm mb-2 dark:text-white">Sender&apos;s public key</label>
        <input onChange={(e)=>{
            setFromPublicKey(e.target.value)
            }} type="text" placeholder="Enter sender's public key" className="mb-2 max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <label className="block text-sm mb-2 dark:text-white">Sender&apos;s private key</label>
        <input onChange={(e)=>{
            setFromPrivateKey(e.target.value)
            }} type="text" placeholder="Enter sender's private key" className="mb-2 max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <label className="block text-sm mb-2 dark:text-white">Receiver&apos;s public key</label>
        <input onChange={(e)=>{
            setToPublicKey(e.target.value)
            }} type="text" placeholder="Enter receiver's public key" className="mb-2 max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <label className="block text-sm mb-2 dark:text-white">Enter the amount</label>
        <input onChange={(e)=>{
        setAmount(parseInt(e.target.value))
        }} type="text" placeholder="> 1 SOL" className="mb-2 max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <button onClick={sendTransaction} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Transfer</button>
        {success ? 
             <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Alert!</span> SOL Transfer Succeeded!
            </div> : ""
        }
        {failed ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Alert!</span> Failed!
            </div> : ""
        }
    </div>
}