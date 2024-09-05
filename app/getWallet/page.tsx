"use client";
import {useState} from "react";
import {generateMnemonic} from "bip39"
import {GenerateWallet} from "../component/GetWallet";
import { WalletInfo } from "../component/WalletInfo";
import TransferSol from "../component/Transfer";
import Token from "../component/Token";
import ConnectWallet from "../component/ConnectWallet";


export default function GetWallet() {
    const [mnemonic, setMnemonic] = useState("");

    return <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-20">
        {/* {!wallet ? <WalletProvider wallets={wallets}><button onClick={onRequestConnectWallet} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Connect Wallet</button></WalletProvider> : ""} */}
        <div>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">Connect to an existing wallet</time>
                    <p className="mt-2 mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Click to connect to a wallet</p>
                    <ConnectWallet/>
                </li>                
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">Create seed phrase</time>
                    <p className="mt-2 mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Store the seed phrase somewhere safe!</p>
                    <button onClick={async function() {
                        const mn = generateMnemonic();
                        setMnemonic(mn);
                        }} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Generate</button>
                    <div className="mb-6">
                        <input type="text" value={mnemonic} readOnly className="max-w-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                </li>
                <li className="mb-10 ms-4 flex-grow overflow-auto">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">Generate wallet (public keys)</time>
                    <p className="mt-2 mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Click to generate public keys</p>
                    <GenerateWallet  mnemonic={mnemonic}/>
                </li>
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">Fetch Account Information</time>
                    <p className="mt-2 mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Enter the specific address (one of the above public keys) to fetch account information</p>
                    <WalletInfo/>
                </li>
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">Transfer SOL</time>
                    <p className="mt-2 mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Enter the sender and receiver details to transfer SOL</p>
                    <TransferSol/>
                </li>
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">Create Token</time>
                    <p className="mt-2 mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Enter the token owner&apos;s keypair to create a token</p>
                    <Token/>
                </li>
            </ol>
        </div>
    </div>

}