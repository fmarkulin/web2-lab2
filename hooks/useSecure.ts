import { SecurityContext } from "@/components/SecurityContext";
import { useContext } from "react";

const useSecure = () => {
  const context = useContext(SecurityContext);

  if (!context) {
    throw new Error("useSecure must be used within a SecurityProvider");
  }

  return context;
};

export default useSecure;
