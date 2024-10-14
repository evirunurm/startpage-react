import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import IImage from "@domain/image/Image";
import React, { PropsWithChildren, useState } from "react";
import { useContext } from "react";

interface StoreContextType {
  storedFact: string;
  updateStoredFact: React.Dispatch<React.SetStateAction<string>>;
}

const StoreContext = React.createContext<StoreContextType>({} as StoreContextType);

export const useStore = () => useContext(StoreContext);

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [storedFact, updateStoredFact] = useState("");

  const value = {
    storedFact,
    updateStoredFact,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};