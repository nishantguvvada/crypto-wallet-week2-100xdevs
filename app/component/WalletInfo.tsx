"use client";
import { useState } from "react";
import axios from "axios";

export const WalletInfo = () => {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState();
    const [airdropSuccess, setAirdropSuccess] = useState(false);

    async function fetchBalance() {
        try{
            const response = await axios.post("https://api.devnet.solana.com", {
                jsonrpc: "2.0",
                id: 1,
                method: "getBalance",
                params: [
                    address.toString()
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setBalance(response.data.result.value);
            console.log(response.data.result.value)

        } catch(err){

            console.log("error",err);

        }
    }

    async function airdrop() {
        try{
            const response = await axios.post("https://api.devnet.solana.com", {
                jsonrpc: "2.0",
                id: 1,
                method: "requestAirdrop",
                params: [
                    address.toString(),
                    1000000000
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("airdrop success!");
            setAirdropSuccess(true);
        } catch(err) {
            console.log("error",err);
        }
    }
    return <div>
        <input type="text" placeholder="Enter your public key" onChange={(e)=>{
            setAddress(e.target.value);
            }} className="mb-2 max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <button onClick={fetchBalance} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Get Balance</button>
        <button onClick={airdrop} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Air Drop 1 SOL</button>
        {airdropSuccess ? <div>success</div> : ""}
        {balance == null ? "" : <div className="max-w-sm p-4 mb-4 text-bold text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Balance: </span> {balance / 1000000000} SOL
        </div>}
    </div>
}