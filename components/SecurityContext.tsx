"use client";

export const dynamic = "force-dynamic";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

interface SecurityContextType {
  secure: boolean | undefined;
  setSecure: Dispatch<SetStateAction<boolean | undefined>>;
}

const SecurityContext = createContext<SecurityContextType | undefined>(
  undefined
);

interface SecurityProviderProps {
  children: React.ReactNode;
}

const SecurityProvider = ({ children }: SecurityProviderProps) => {
  const [secure, setSecure] = useLocalStorage<boolean | undefined>(
    "secure",
    undefined
  );

  useEffect(() => {
    if (secure === undefined) {
      console.log("secure was undefined, setting from localStorage");
      setSecure(localStorage.getItem("secure") === "true");
    }
  }, [secure]);

  return (
    <SecurityContext.Provider value={{ secure, setSecure }}>
      {children}
    </SecurityContext.Provider>
  );
};

export { SecurityContext, SecurityProvider };
