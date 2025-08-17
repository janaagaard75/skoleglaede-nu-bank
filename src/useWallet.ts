import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { Action } from "./actions/Action";

type Wallet = {
  credit: number;
  savings: number;
};

export const useWallet = () => {
  const [credit, setCredit] = useState(4_000);
  const [savings, setSavings] = useState(0);
  const key = "wallet";

  const broke = async () => {
    setCredit(0);
    await save();
  };

  const save = useCallback(async () => {
    const walletString = JSON.stringify({
      credit: credit,
      savings: savings,
    });
    await SecureStore.setItemAsync(key, walletString);
  }, [credit, savings]);

  const reset = useCallback(async () => {
    setCredit(4_000);
    setSavings(0);
    await save();
  }, [save]);

  const performAction = async (action: Action) => {
    setCredit(action.performAction(credit));
    await save();
  };

  const transferToSavings = async (amount: number) => {
    setCredit(credit - amount);
    setSavings(savings + amount);
    await save();
  };

  const load = useCallback(async () => {
    try {
      const walletString = await SecureStore.getItemAsync(key);
      if (walletString === null) {
        await reset();
        return;
      }

      const wallet = JSON.parse(walletString) as Wallet;
      setCredit(wallet.credit);
      setSavings(wallet.savings);
    } catch {
      await reset();
    }
  }, [reset]);

  useEffect(() => {
    void load();
  }, [load]);

  const transferToSavingsAllowed = (amount: number) => credit >= amount;

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
