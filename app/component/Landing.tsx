import Image from "next/image";

export const LandingPage = () => {
    return <div className="h-screen">
    <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center text-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <Image 
                    className="rounded-full mt-5" 
                    src="/ScroogeMcduck.jpg" 
                    width={200}
                    height={200} 
                    alt="" 
                />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">NGX Wallet</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Start your crypto journey, create crypto wallets, just don't be a Scrooge!</p>
                <a href="/getWallet" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Get started
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
    </div>
}