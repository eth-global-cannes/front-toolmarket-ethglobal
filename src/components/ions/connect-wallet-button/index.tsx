import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
// import { IntMaxClient } from "intmax2-client-sdk";
import { LogOutIcon, WalletIcon } from "lucide-react";
import { useState } from 'react';

// const client = new IntMaxClient({
//   environment: 'testnet',
// });

export const ConnectWalletButton = () => {
  const [user, setUser] = useState(null);

  const handleConnect = async () => {
    await client.login();
  };

  const handleLogout = () => {
    // sdk.wallet.disconnect();
    setUser(null);
  };

  if (user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button 
            className="text-gray-500 p-1.5 border border-gray-300 rounded-full px-3 flex items-center gap-2 hover:bg-tm-orange hover:text-white hover:border-tm-orange transition-all duration-300 
            cursor-pointer
            "
          >
            <WalletIcon className="w-4 h-4" size={16} strokeWidth={2.5} />
            {/* <span className="flex-1 max-w-32 truncate text-ellipsis">{user.wallet?.address}</span> */}
          </button>
        </PopoverTrigger>
        <PopoverContent className="bg-white text-black border border-neutral-300 rounded-lg mt-4 w-40 shadow-md" align="start">
          <button
            className="flex items-center gap-2 transition-all duration-300 cursor-pointer hover:bg-neutral-100 p-3 w-full rounded-lg"
            onClick={handleLogout}
          >
            <LogOutIcon className="w-4 h-4" size={16} strokeWidth={2.5} />
            Log Out
          </button>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg" onClick={handleConnect}>Connect Wallet</button>
  );
};