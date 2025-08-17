import { getItemAsync, setItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";

export const useStoredState = (key: string, initialValue: number) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const loadValue = async () => {
      const storedValue = await getItemAsync(key);
      if (storedValue !== null) {
        const parsedValue = parseInt(storedValue, 10);
        setValue(isNaN(parsedValue) ? 0 : parsedValue);
      }
    };

    void loadValue();
  }, [key]);

  const setAndStoreValue = async (newValue: number) => {
    setValue(newValue);
    await setItemAsync(key, newValue.toString());
  };

  return [value, setAndStoreValue] as const;
};
