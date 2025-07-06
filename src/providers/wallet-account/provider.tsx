import { FlowProvider } from "@onflow/kit";
import { createContext, useState } from "react";
import flow from "../../../flow.json";

export const WalletAccountContext = createContext<{
  address: string | null;
  setAddress: (address: string) => void;
}>({
  address: null,
  setAddress: () => {},
});


export const WalletAccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>();

  return (
    <WalletAccountContext.Provider value={{ address, setAddress }}>
      <FlowProvider
        config={{
          discoveryWallet: "https://fcl-discovery.onflow.org/testnet/authn",
          accessNodeUrl: "https://rest-testnet.onflow.org",
          flowNetwork: "testnet",
          appDetailTitle: "TL Market",
          appDetailIcon: "https://tl.market/logo.png",
          appDetailDescription: "TL Market",
          appDetailUrl: "https://tl.market",
        }}
        flowJson={flow}
      >
        {children}
      </FlowProvider>
    </WalletAccountContext.Provider>
  );
};