import Image from "@domain/image/Image";
import defaultImage from "./default-image";
import IImageFactory from "./image.type";
import { ImageTypes } from "@domain/image/ImageTypes";

export default function ImageFactory(): IImageFactory {
	const maxByteSize = 3000000;

	const getDefaultImage = (): Image => {
		return defaultImage;
	}

	const getValidImageTypes = (): string[] => {
		return [ImageTypes.JPEG, ImageTypes.PNG, ImageTypes.GIF, ImageTypes.WEBP, ImageTypes.JPG];
	}

	const processFile = async (file: File, onLoad: (result: string) => void): Promise<void> => {
		if (file.size > maxByteSize) {
			throw new Error("File is too large");
		}
		if (!getValidImageTypes().includes(file.type)) {
			throw new Error("Invalid image type");
		}

		return new Promise<void>(resolve => {
			const fileReader = new FileReader();
			fileReader.onload = (event) => {
				onLoad(event.target?.result as string);
				resolve();
			}
			fileReader.readAsDataURL(file);
		});
	}

	return {
		maxByteSize,
		getDefaultImage,
		getValidImageTypes,
		processFile
	};
}