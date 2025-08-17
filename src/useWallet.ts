import { useCallback } from "react";
import { Action } from "./actions/Action";
import { useStoredState } from "./useStoredState";

export const useWallet = () => {
  const [credit, setCredit] = useStoredState("credit", 4_000);
  const [savings, setSavings] = useStoredState("savings", 0);

  const broke = async () => {
    await setCredit(0);
  };

  const reset = useCallback(async () => {
    await setCredit(4_000);
    await setSavings(0);
  }, [setCredit, setSavings]);

  const performAction = async (action: Action) => {
    await setCredit(action.performAction(credit));
  };

  const transferToSavings = async (amount: number) => {
    await setCredit(credit - amount);
    await setSavings(savings + amount);
  };

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
