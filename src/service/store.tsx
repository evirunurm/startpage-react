import React, { PropsWithChildren, useContext } from "react";

interface StoreContextType {
}

const StoreContext = React.createContext<StoreContextType>({} as StoreContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(StoreContext);

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const value = {
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};