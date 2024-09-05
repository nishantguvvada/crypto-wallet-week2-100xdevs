import { useWalletModal, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const CustomConnect = () => {
    const wallet = useWallet();
    const { setVisible: setModalVisible } = useWalletModal();
    
    return <div>
    <button
        onClick={()=>{
            setModalVisible(true);
        }}
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >Connect</button>
    <div className="mb-6">
        <input type="text" value={String(wallet.publicKey)} placeholder="Display public key on connecting" readOnly className="max-w-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    </div>
</div>
}

export default CustomConnect;