import { createContext, useState } from "react";

export const WalletAccountContext = createContext<{
  address: string | null;
  setAddress: (address: string) => void;
}>({
  address: null,
  setAddress: () => {},
});

export const WalletAccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <WalletAccountContext.Provider value={{ address, setAddress }}>
      {children}
    </WalletAccountContext.Provider>
  );
};