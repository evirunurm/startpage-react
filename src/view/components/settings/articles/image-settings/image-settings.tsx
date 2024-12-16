import React from "react";
import { Article } from "@components/atoms/article/article";
import { DropItem, FileDropItem, FileTrigger } from "react-aria-components";
import { Button } from "@components/atoms/button/button";
import { Label } from "@components/atoms/label/label";
import { DropZone } from "@components/atoms/drop-zone/drop-zone";
import IImage from "@domain/image/Image";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import { useLocalStorageState } from "@utils/utils";
import { ImageTypes } from "@domain/image/ImageTypesEnum";

interface HandleFileDropEvent {
	items: DropItem[];
}

export const ImageSettings: React.FC = () => {
	const [, setStoredImage] = useLocalStorageState<IImage>(LocalStorageType.Image);
	const [file, setFile] = React.useState<File | null>(null);

	const handleFileDrop = async (e: HandleFileDropEvent): Promise<void> => {
		const files = e.items.filter((file: DropItem) => file.kind === 'file') as FileDropItem[];
		const file = await files[0].getFile();

		if (!isValidFileType(file)) {
			alert('Only jpeg, png or gif images are allowed');
			return;
		}
		saveImageFile(file);
	};

	const handleFileUpload = async (e: FileList | null) => {
		if (e) {
			const file = Array.from(e)[0];
			if (!isValidFileType(file)) {
				alert('Only jpeg, png or gif images are allowed');
				return;
			}
			saveImageFile(file);
		}
	};

	const isValidFileType = (file: File) => {
		return [ImageTypes.JPEG, ImageTypes.PNG, ImageTypes.GIF]
			.map((type) => type.toString())
			.includes(file.type);
	};

	const saveImageFile = (file: File) => {
		convertImageToBase64(file, onImageUrlLoad);
	};

	const onImageUrlLoad = (file: File, event: ProgressEvent<FileReader>) => {
		try {
			setStoredImage({
				file: file,
				url: event.target?.result as string,
				name: file.name,
				custom: true
			} as IImage);
			setFile(file);
		} catch (error) {
			alert('Image exceeded the maximum size. Please upload a smaller image.');
		}
	}

	const convertImageToBase64 = (
		file: File,
		onLoad: (file: File, event: ProgressEvent<FileReader>) => void
	) => {
		const reader = new FileReader();
		reader.onload = (event) => onLoad(file, event);
		reader.readAsDataURL(file);
	}

	const getFileName = () => {
		if (!file) return null;
		return file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name;
	}

	return (
		<Article title="Image">
			<DropZone onDrop={handleFileDrop} >
				<FileTrigger
					acceptedFileTypes={[ImageTypes.JPEG, ImageTypes.PNG, ImageTypes.GIF]}
					onSelect={handleFileUpload}
				>
					<Button center>Upload image</Button>
				</FileTrigger>
				<Label>
					{getFileName() || 'Drop image here'}
				</Label>
			</DropZone>
		</Article>
	);
}