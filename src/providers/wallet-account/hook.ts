import { useContext } from "react";
import { WalletAccountContext } from "./provider";

export const useWalletAccount = () => {
  const { address, setAddress } = useContext(WalletAccountContext);
  return { address, setAddress };
};