import React from "react";
import { Article } from "@components/atoms/article/article";
import { DropItem, FileDropItem, FileTrigger } from "react-aria-components";
import { Button } from "@components/atoms/button/button";
import { Label } from "@components/atoms/label/label";
import { DropZone } from "@components/atoms/drop-zone/drop-zone";
import Image from "@domain/image/Image";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import { ImageTypes } from "@domain/image/ImageTypes";
import { Disclosure } from "@components/atoms/disclosure/disclosure";
import { useTranslation } from "react-i18next";

interface HandleFileDropEvent {
	items: DropItem[];
}

export const ImageSettings: React.FC = () => {
	const { t } = useTranslation();
	const [, setStoredImage] = useLocalStorageState<Image>(LocalStorageType.Image);
	const [file, setFile] = React.useState<File | null>(null);

	const handleFileDrop = async (e: HandleFileDropEvent): Promise<void> => {
		const files = e.items.filter((file: DropItem) => file.kind === 'file') as FileDropItem[];
		const file = await files[0].getFile();

		if (!isValidFileType(file)) {
			alert(t('errors.image.image-type'));
			return;
		}
		saveImageFile(file);
	};

	const handleFileUpload = async (e: FileList | null) => {
		if (e) {
			const file = Array.from(e)[0];
			if (!isValidFileType(file)) {
				alert(t('errors.image.image-type'));
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
				url: event.target?.result as string,
				name: file.name,
				custom: true
			} as Image);
			setFile(file);
		} catch {
			alert(t('errors.image.image-size'));
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
		<Disclosure title={t("common.image")} wide>
			<Article>
				<DropZone onDrop={handleFileDrop} >
					<FileTrigger
						acceptedFileTypes={[ImageTypes.JPEG, ImageTypes.PNG, ImageTypes.GIF]}
						onSelect={handleFileUpload}
					>
						<Button center>{t("common.image-upload")}</Button>
					</FileTrigger>
					<Label>
						{getFileName() || t("common.image-placeholder")}
					</Label>
				</DropZone>
			</Article>
		</Disclosure>
	);
}