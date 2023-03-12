import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Action } from "./actions/Action";

export const useWallet = () => {
  const [credit, setCredit] = useState(4_000);
  const [savings, setSavings] = useState(0);
  const key = "wallet";

  const broke = async () => {
    setCredit(0);
    await save();
  };

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const walletString = await SecureStore.getItemAsync(key);
      if (walletString === null) {
        reset();
        return;
      }

      const wallet = JSON.parse(walletString);
      setCredit(wallet.credit);
      setSavings(wallet.savings);
    } catch {
      reset();
    }
  };

  const performAction = async (action: Action) => {
    setCredit(action.performAction(credit));
    await save();
  };

  const reset = async () => {
    setCredit(4_000);
    setSavings(0);
    await save();
  };

  const save = async () => {
    const walletString = JSON.stringify({
      credit: credit,
      savings: savings,
    });
    await SecureStore.setItemAsync(key, walletString);
  };

  const transferToSavings = async (amount: number) => {
    setCredit(credit - amount);
    setSavings(savings + amount);
    await save();
  };

  const transferToSavingsAllowed = (amount: number) => {
    return credit >= amount;
  };

  return [
    credit,
    savings,
    broke,
    performAction,
    reset,
    transferToSavings,
    transferToSavingsAllowed,
  ] as const;
};
