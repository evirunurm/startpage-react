import { ILocalStorageService } from "@application/ports";
import { getLocalStorage, postLocalStorage } from "./api";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import IImage from "@domain/image/Image";

export function useImageLocalStorageService(): ILocalStorageService<IImage> {
  const key = LocalStorageType.Image;

  return {
    async get() {
      const value = await getLocalStorage(key);
      if (value) {
        return JSON.parse(value) as IImage;
      } else {
        return null;
      }
    },
    post(image : IImage) {
      postLocalStorage(key, JSON.stringify(image));
    },
  };
}