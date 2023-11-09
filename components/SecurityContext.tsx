"use client";

export const dynamic = "force-dynamic";

import useLocalStorage from "@/hooks/useLocalStorage";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

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
    true
  );

  return (
    <SecurityContext.Provider value={{ secure, setSecure }}>
      {children}
    </SecurityContext.Provider>
  );
};

export { SecurityContext, SecurityProvider };
