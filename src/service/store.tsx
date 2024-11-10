import React, { PropsWithChildren, useState, useContext } from "react";
import { FactType } from "@domain/fact/FactTypeEnum";
import { useLocalStorageState } from "@utils/utils";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";

interface StoreContextType {
  storedFact: string;
  updateStoredFact: React.Dispatch<React.SetStateAction<string>>;
  storedFactType: FactType;
  updateStoredFactType: React.Dispatch<React.SetStateAction<FactType>>;
}

const StoreContext = React.createContext<StoreContextType>({} as StoreContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(StoreContext);

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [localStorageFact] = useLocalStorageState<string>(LocalStorageType.Fact);
  const [localStorageFactType] = useLocalStorageState<FactType>(LocalStorageType.FactType);

  const [storedFact, updateStoredFact] = useState(localStorageFact ?? '');
  const [storedFactType, updateStoredFactType] = useState(localStorageFactType ?? FactType.Cats);

  const value = {
    storedFact,
    updateStoredFact,
    storedFactType,
    updateStoredFactType
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};