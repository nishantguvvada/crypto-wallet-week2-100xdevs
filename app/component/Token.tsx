"use client";
import {
    Connection,
    clusterApiUrl,
    Keypair,
    PublicKey,
    AccountInfo,
    ParsedAccountData,
    RpcResponseAndContext
} from "@solana/web3.js"
import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintToChecked,
    getMint,
    TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import { useState } from "react";
import bs58 from "bs58";
import axios from "axios";

export default function Token () {
    const [ownerKeypair, setOwnerKeypair] = useState("");
    const [ownerPublicKey, setOwnerPublicKey] = useState("");
    const [mintKey, setMintKey] = useState("");
    const [supply, setSupply] = useState("");
    const [tokens, setTokens] = useState<{
        pubkey: PublicKey;
        account: AccountInfo<ParsedAccountData>;
    }[]>([]);
    // 2BkzJ2Phk2kaJgTrKhppMEBDJ8qEJG6gA79G3U7paPcfsRWPby1Yh5BNkyzY9ayJYjZqB6XJDwBLUzGF6by4ug4j

    const getKey = (inputKey: string) => {
        return Keypair.fromSecretKey(bs58.decode(inputKey)).publicKey.toBase58();
    }

    const createToken = async () => {

        try{
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

            const mintOwner = Keypair.fromSecretKey(bs58.decode(ownerKeypair));

            console.log("Owner Keypair : ", mintOwner);

            const mintPubKey = await createMint(
                connection,
                mintOwner,
                mintOwner.publicKey,
                mintOwner.publicKey,
                8
            )

            const mintAssociatedAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                mintOwner,
                mintPubKey,
                mintOwner.publicKey,
            )

            console.log("Mint Public Key : ", mintPubKey);
            console.log("Mint Associated Token Account : ", mintAssociatedAccount);

            const tokenAmountBefore = await connection.getTokenAccountBalance(mintAssociatedAccount.address);

            console.log("Balance in ATA before minting : ", tokenAmountBefore);

            const txhash = await mintToChecked(
                connection,
                mintOwner,
                mintPubKey,
                mintAssociatedAccount.address,
                mintOwner,
                1e8,
                8
            );

            const tokenAmountAfter = await connection.getTokenAccountBalance(mintAssociatedAccount.address);
            console.log("Balance in ATA after minting : ", tokenAmountAfter);
            const tokenAccountDetails = await getMint(connection, mintPubKey);
            console.log("ATA details : ", tokenAccountDetails);

            setMintKey(mintPubKey.toBase58());

        } catch(err) {

            console.log("Error : ", err);

        }
        
    }

    const getTokenSupply = async () => {
        try{
            const response = await axios.post("https://api.devnet.solana.com",
                {
                    "jsonrpc": "2.0", "id": 1,
                    "method": "getTokenSupply",
                    "params": [
                        mintKey.toString()
                    ]
                }
            );

            console.log(response.data.result.value.amount);
            setSupply(String(response.data.result.value.amount))

        } catch(err) {
            console.log("Error : ", err);
        }
    }

    const fetchAllTokens = async () => {
        try {

            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            const wallet = Keypair.fromSecretKey(bs58.decode(ownerKeypair));
            const accounts = await connection.getParsedTokenAccountsByOwner(wallet.publicKey, {
                programId: TOKEN_PROGRAM_ID
            });
            setTokens(accounts.value);
            console.log("ACCOUNTS: ", accounts);
            accounts?.value.map(accountInfo => {
                console.log(`mint : ${accountInfo.account.data["parsed"]["info"]["mint"]}`);
                console.log(`owner : ${accountInfo.account.data["parsed"]["info"]["owner"]}`);
                console.log(`amount : ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["amount"]}`);
                console.log("==============================");
            });
            setOwnerKeypair(getKey(ownerKeypair));

        } catch(err) {

            console.log("Error : ", err);

        }

        // const accounts = await connection.getParsedProgramAccounts(
        //     TOKEN_PROGRAM_ID,
        //     {
        //         filters: [
        //             {
        //                 dataSize: 165, // a known quantity, size of accounts (bytes)
        //             },
        //             {
        //                 memcmp: {
        //                     offset: 32,
        //                     bytes: wallet.publicKey.toBase58()
        //                 }
        //             }
        //         ]
        //     }
        // )



    }

    return (
        <div>
            <label className="block text-sm mb-2 dark:text-white">Owner&apos;s Secret Key</label>
            <input onChange={(e)=>{
                setOwnerKeypair(e.target.value)
            }} type="text" placeholder="Enter owner's Secret Key" className="mb-2 max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <button onClick={createToken} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create Token</button>
            <label className="block text-sm mb-2 dark:text-white">Generated Mint&apos;s Public Key</label>
            <input value={mintKey} readOnly type="text" placeholder="Generated Mint's Public Key" className="mb-2 max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <button onClick={getTokenSupply} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Get Supply</button>
            {supply ? 
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Alert!</span> Token Supply : {supply}
                </div>
            : ""}
            <label className="block text-sm mb-2 dark:text-white">Owner&apos;s Tokens</label>
            <button onClick={fetchAllTokens} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Fetch Tokens</button>
            {ownerPublicKey ? <h1  className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">{ownerPublicKey} has {tokens.length} tokens in total.</h1> : ""}
            <div>{tokens.map((accountInfo, i) =><div key={i}>
                <label className="block text-sm mb-2 dark:text-white">Mint {i+1}</label>
                <input value={accountInfo.account.data["parsed"]["info"]["mint"]} readOnly type="text"  className="mb-2 max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <label className="block text-sm mb-2 dark:text-white">Supply of Mint {i+1} in SOL</label>
                <input value={accountInfo.account.data["parsed"]["info"]["tokenAmount"]["amount"] / 100000000} readOnly type="text"  className="mb-2 max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>)}
            </div>
        </div>
    )
}