import { useEffect } from "react";
import IImage from "@domain/image/Image";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import ImageFactory from "@application/ImageFactory";
import styles from "./image.module.css";

export const Image: React.FC = () => {
	const [store, setState] = useLocalStorageState<IImage>(
		LocalStorageType.Image
	);
	const { getDefaultImage } = ImageFactory();

	useEffect(() => {
		if (!store) {
			setState(getDefaultImage());
		}
	}, [store, setState, getDefaultImage]);

	return (
		<div className={styles["image-container"]}>
			<img
				className={styles["image-container__image"]}
				src={store?.url}
				alt={store?.name}
			/>
		</div>
	);
};