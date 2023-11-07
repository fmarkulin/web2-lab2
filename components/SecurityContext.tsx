"use client";

import { createContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

interface SecurityContextType {
  secure: boolean;
  setSecure: React.Dispatch<React.SetStateAction<boolean>>;
}

const SecurityContext = createContext<SecurityContextType | undefined>(
  undefined
);

interface SecurityProviderProps {
  children: React.ReactNode;
}

const SecurityProvider = ({ children }: { children: React.ReactNode }) => {
  const [secure, setSecure] = useLocalStorage<boolean>("secure", true);

  return (
    <SecurityContext.Provider value={{ secure, setSecure }}>
      {children}
    </SecurityContext.Provider>
  );
};

export { SecurityContext, SecurityProvider };
