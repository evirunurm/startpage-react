import Image from "@domain/image/Image";

export default interface IImageFactory {
	maxKBSize: number;
	getDefaultImage: () => Image;
	getValidImageTypes: () => string[];
	processFile: (file: File, onLoad: (result: string) => void) => Promise<void>;
}
