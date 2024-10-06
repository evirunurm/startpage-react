import React, { PropsWithChildren, useState } from "react";
import { useContext } from "react";

interface StoreContextType {
  storedFact: string;
  updateStoredFact: React.Dispatch<React.SetStateAction<string>>;
}

const StoreContext = React.createContext<StoreContextType>({storedFact: "", updateStoredFact: () => {}});
// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(StoreContext);

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [storedFact, setStoredFact] = useState("");

  const value = {
    storedFact,
    updateStoredFact: setStoredFact
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};