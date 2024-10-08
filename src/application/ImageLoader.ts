import IImage from "@domain/image/Image";
import { useImageLocalStorageService } from "@service/localStorageAdapter";
import { ILocalStorageService } from "@application/ports";
import * as DefaultImageURL from "@assets/robot-bar.png";

const defaultImage: IImage = {
	name: "robot-bar",
	url: DefaultImageURL.default,
	custom: false
};

export default function useImageLoader() {
	let image: IImage = defaultImage // Will change to a previously stored value
	const imageService: ILocalStorageService<IImage> = useImageLocalStorageService();

	function getImage(): IImage {
		return image;
	}
	
	async function loadImageFromStorage(): Promise<void> {
		const savedImage: IImage | null = await imageService.get()
		image = savedImage || defaultImage;
	}

	return {
		getImage,
		loadImageFromStorage
	};
}