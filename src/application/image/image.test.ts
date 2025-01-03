import ImageFactory from "./image.factory";
import IImageFactory from "./image.type";
import { ImageTypes } from "@domain/image/ImageTypes";

describe("ImageFactory", () => {
	let imageFactory: IImageFactory;

	beforeEach(() => {
		imageFactory = ImageFactory();
	});

	it("should return a default image", () => {
		const { getDefaultImage } = imageFactory;

		expect(getDefaultImage()).toBeDefined();
	});

	it("should return maximum KB size of 3000000", () => {
		const { maxByteSize } = imageFactory;

		expect(maxByteSize).toBe(3000000);
	});

	it("should reject processing files heavier than 3000000Bytes (3000KB)", async () => {
		const { processFile } = imageFactory;
		const heavyFile = new File([""], 'heavyFile.png', { type: ImageTypes.PNG });
		Object.defineProperty(heavyFile, 'size', { value: 3000001, configurable: true });


		await expect(processFile(heavyFile, () => { })).rejects.toThrow("File is too large");
	});

	it("should reject processing files with an invalid image type", async () => {
		const { processFile } = imageFactory;
		const invalidFile = new File([""], 'invalidFile.txt', { type: 'text/plain' });

		await expect(processFile(invalidFile, () => { })).rejects.toThrowError("Invalid image type");
	});

	it("should run the callback after processing a file", async () => {
		const onLoad = vi.fn();
		const { processFile } = imageFactory;
		const file = new File(["File"], 'file.png', { type: ImageTypes.PNG });

		await processFile(file, onLoad);
		expect(onLoad).toHaveBeenCalled();
	});
});
