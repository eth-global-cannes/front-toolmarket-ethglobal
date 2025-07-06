"use client";

import * as fcl from "@onflow/fcl";
import { useFlowCurrentUser } from "@onflow/kit";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Loader2, LogOutIcon, WalletIcon } from "lucide-react";
import { useState } from 'react';

// const client = new IntMaxClient({
//   environment: 'testnet',
// });

fcl.config({
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "accessNode.api": "https://rest-testnet.onflow.org",
  flowNetwork: "testnet",
});

export const ConnectWalletButton = () => {
  const { authenticate, unauthenticate, user } = useFlowCurrentUser();
  const [loading, setLoading] = useState(false);

  console.log(user);

  const handleConnect = async () => {
    setLoading(true);
    await authenticate();
    setLoading(false);
  };

  const handleLogout = () => {
    unauthenticate();
  };

  if (user?.addr) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button 
            className="text-gray-500 p-1.5 rounded-full px-3 flex items-center gap-2 hover:border-neutral-300 border border-transparent transition-all duration-300 
            cursor-pointer h-10 disabled:opacity-50 disabled:cursor-not-allowed
            "
            disabled={loading}
          >
            <WalletIcon className="w-4 h-4" size={16} strokeWidth={2.5} />
            <span className="flex-1 max-w-32 truncate text-ellipsis">{user.addr}</span>
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
    <button className="bg-orange-500 text-white px-4 py-2 h-10 rounded-full flex items-center gap-2 font-medium hover:bg-orange-500/70 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleConnect}
    disabled={loading}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" size={16} strokeWidth={2.5} /> : <WalletIcon className="w-4 h-4" size={16} strokeWidth={2.5} />}
      Connect Wallet
      </button>
  );
};