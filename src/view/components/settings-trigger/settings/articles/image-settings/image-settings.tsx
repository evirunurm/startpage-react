import React from "react";
import { Article } from "@components/atoms/article/article";
import { DropItem, FileDropItem, FileTrigger } from "react-aria-components";
import { Button } from "@components/atoms/button/button";
import { Label } from "@components/atoms/label/label";
import { DropZone } from "@components/atoms/drop-zone/drop-zone";
import Image from "@domain/image/Image";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import { Disclosure } from "@components/atoms/disclosure/disclosure";
import { useTranslation } from "react-i18next";
import ImageFactory from "@application/image";

interface HandleFileDropEvent {
	items: DropItem[];
}

export const ImageSettings: React.FC = () => {
	const { t } = useTranslation();
	const [, setStoredImage] = useLocalStorageState<Image>(LocalStorageType.Image);
	const { processFile, getValidImageTypes } = ImageFactory();
	const [fileName, setFileName] = React.useState<string | null>(null);

	const handleFileDrop = async (e: HandleFileDropEvent): Promise<void> => {
		const files = e.items.filter((file: DropItem) => file.kind === 'file') as FileDropItem[];
		const file = await files[0].getFile();
		await processDroppedFile(file);
	};

	const handleFileUpload = async (e: FileList | null) => {
		if (e) {
			const file = Array.from(e)[0];
			await processFile(file, onImageUrlLoad);
			setFileName(getShortenedFileName(file.name));
		}
	};

	const processDroppedFile = async (file: File) => {
		try {
			await processFile(file, onImageUrlLoad);
			setFileName(getShortenedFileName(file.name));
		} catch (error) {
			alert(error);
		}
	};

	const onImageUrlLoad = (url: string) => {
		setStoredImage({
			url: url,
			name: fileName,
			custom: true
		} as Image);
	}

	const getShortenedFileName = (name: string) => {
		return name.length > 20 ? `${name.substring(0, 20)}...` : name;
	}

	return (
		<Disclosure title={t("common.image")} wide>
			<Article>
				<DropZone onDrop={handleFileDrop} >
					<FileTrigger
						acceptedFileTypes={getValidImageTypes()}
						onSelect={handleFileUpload}
					>
						<Button center>
							{t("common.image-upload")}
						</Button>
					</FileTrigger>
					<Label>
						{fileName || t("common.image-placeholder")}
					</Label>
				</DropZone>
			</Article>
		</Disclosure>
	);
}