import Image from "@domain/image/Image";

export default interface IImageFactory {
	maxByteSize: number;
	getDefaultImage: () => Image;
	getValidImageTypes: () => string[];
	processFile: (file: File, onLoad: (result: string) => void) => Promise<void>;
}
