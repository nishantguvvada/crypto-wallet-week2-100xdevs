"use client";
import { useState } from "react";
import { generateMnemonic } from "bip39"
import { GenerateWallet } from "../component/GetWallet";
import { WalletInfo } from "../component/WalletInfo";
import TransferSol from "../component/Transfer";
import Token from "../component/Token";
import ConnectWallet from "../component/ConnectWallet";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { 
    connectWalletString,
    createSeedPhraseString,
    generateWalletString,
    fetchAccountString,
    transferSolString,
    createTokenString
} from "../component/Notes";

export default function GetWallet() {
    const [mnemonic, setMnemonic] = useState("");
    const [toggleCW, setToggleCW] = useState(false);
    const [toggleSP, setToggleSP] = useState(false);
    const [toggleGW, setToggleGW] = useState(false);
    const [toggleFA, setToggleFA] = useState(false);
    const [toggleTS, setToggleTS] = useState(false);
    const [toggleCT, setToggleCT] = useState(false);

    return <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-20">
        {/* {!wallet ? <WalletProvider wallets={wallets}><button onClick={onRequestConnectWallet} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Connect Wallet</button></WalletProvider> : ""} */}
        <div>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">Connect to an existing wallet</time>
                    <p className="mt-2 mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Click to connect to a wallet</p>
                    <ConnectWallet/>
                    <div className="flex flex-col mt-4">
                        <div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" onChange={()=>setToggleCW(!toggleCW)} className="sr-only peer"/>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Understand Connect Wallet</span>
                            </label>
                        </div>
                        <SyntaxHighlighter 
                            className={`rounded-lg p-4 ${toggleCW ? 'visible' : 'hidden'}`}
                            language="javascript" 
                            style={nightOwl}
                            customStyle={{
                                padding: "25px"
                            }}
                            wrapLongLines={true}
                        >
                            {connectWalletString}
                        </SyntaxHighlighter>
                    </div>
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
                    <div className="flex flex-col mt-4">
                        <div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" onChange={()=>setToggleSP(!toggleSP)} className="sr-only peer"/>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Understand Seed Phrase Generation</span>
                            </label>
                        </div>
                        <SyntaxHighlighter 
                            className={`rounded-lg p-4 ${toggleSP ? 'visible' : 'hidden'}`}
                            language="javascript" 
                            style={nightOwl}
                            customStyle={{
                                padding: "25px"
                            }}
                            wrapLongLines={true}
                        >
                            {createSeedPhraseString}
                        </SyntaxHighlighter>
                    </div>
                </li>
                <li className="mb-10 ms-4 flex-grow overflow-auto">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">Generate wallet (public keys)</time>
                    <p className="mt-2 mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Click to generate public keys</p>
                    <GenerateWallet  mnemonic={mnemonic}/>
                    <div className="flex flex-col mt-4">
                        <div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" onChange={()=>setToggleGW(!toggleGW)} className="sr-only peer"/>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Understand Generating Keypairs for Wallets</span>
                            </label>
                        </div>
                        <SyntaxHighlighter 
                            className={`rounded-lg p-4 ${toggleGW ? 'visible' : 'hidden'}`}
                            language="javascript" 
                            style={nightOwl}
                            customStyle={{
                                padding: "25px"
                            }}
                            wrapLongLines={true}
                        >
                            {generateWalletString}
                        </SyntaxHighlighter>
                    </div>
                </li>
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">Fetch Account Information</time>
                    <p className="mt-2 mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Enter the specific address (one of the above public keys) to fetch account information</p>
                    <WalletInfo/>
                    <div className="flex flex-col mt-4">
                        <div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" onChange={()=>setToggleFA(!toggleFA)} className="sr-only peer"/>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Understand Fetching Account Balance and Airdrop SOL</span>
                            </label>
                        </div>
                        <SyntaxHighlighter 
                            className={`rounded-lg p-4 ${toggleFA ? 'visible' : 'hidden'}`}
                            language="javascript" 
                            style={nightOwl}
                            customStyle={{
                                padding: "25px"
                            }}
                            wrapLongLines={true}
                        >
                            {fetchAccountString}
                        </SyntaxHighlighter>
                    </div>
                </li>
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">Transfer SOL</time>
                    <p className="mt-2 mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Enter the sender and receiver details to transfer SOL</p>
                    <TransferSol/>
                    <div className="flex flex-col mt-4">
                        <div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" onChange={()=>setToggleTS(!toggleTS)} className="sr-only peer"/>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Understand Transferring SOL</span>
                            </label>
                        </div>
                        <SyntaxHighlighter 
                            className={`rounded-lg p-4 ${toggleTS ? 'visible' : 'hidden'}`}
                            language="javascript" 
                            style={nightOwl}
                            customStyle={{
                                padding: "25px"
                            }}
                            wrapLongLines={true}
                        >
                            {transferSolString}
                        </SyntaxHighlighter>
                    </div>
                </li>
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">Create Token</time>
                    <p className="mt-2 mb-2 text-base font-normal text-gray-500 dark:text-gray-400">Enter the token owner&apos;s keypair to create or fetch a token</p>
                    <Token/>
                    <div className="flex flex-col mt-4">
                        <div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" onChange={()=>setToggleCT(!toggleCT)} className="sr-only peer"/>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Understand Creating Token</span>
                            </label>
                        </div>
                        <SyntaxHighlighter 
                            className={`rounded-lg p-4 ${toggleCT ? 'visible' : 'hidden'}`}
                            language="javascript" 
                            style={nightOwl}
                            customStyle={{
                                padding: "25px"
                            }}
                            wrapLongLines={true}
                        >
                            {createTokenString}
                        </SyntaxHighlighter>
                    </div>
                </li>
            </ol>
        </div>
    </div>

}