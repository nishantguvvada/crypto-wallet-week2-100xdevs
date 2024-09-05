import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { 
    clusterApiUrl,
    Connection
 } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useMemo } from 'react';
import CustomConnect from './CustomConnect';

function ConnectWallet() {
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        ()=>[
            new UnsafeBurnerWalletAdapter(),
            new PhantomWalletAdapter()
        ],[]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <CustomConnect/>
                    <div className="py-2.5 me-2 mb-2 text-sm font-medium text-gray-900"><WalletMultiButton /></div>
                    <div className="me-2 mb-2 text-sm font-medium text-gray-900"><WalletDisconnectButton /></div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default ConnectWallet;