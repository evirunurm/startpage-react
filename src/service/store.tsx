import IImage from "@domain/image/Image";
import React, { PropsWithChildren, useState } from "react";
import { useContext } from "react";

interface StoreContextType {
  storedFact: string;
  updateStoredFact: React.Dispatch<React.SetStateAction<string>>;
  storedImage: IImage;
  updateStoredImage: React.Dispatch<React.SetStateAction<IImage>>;
}

const StoreContext = React.createContext<StoreContextType>({} as StoreContextType);
// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(StoreContext);

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [storedFact, setStoredFact] = useState("");
  const [storedImage, setStoredImage] = useState({} as IImage); // Will change to a previously stored value

  const value = {
    storedFact,
    updateStoredFact: setStoredFact,
    storedImage,
    updateStoredImage: setStoredImage,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};