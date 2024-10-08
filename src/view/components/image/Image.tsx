import { useStore } from "@service/store";
import useImageLoader from "@application/ImageLoader";
import { useEffect } from "react";

export const Image: React.FC = () => {
	const { loadImageFromStorage, getImage } = useImageLoader();
	const { storedImage, updateStoredImage } = useStore();

	useEffect(() => {
		loadImageFromStorage();
		const image = getImage();
		updateStoredImage(image);
	}, [loadImageFromStorage, getImage, updateStoredImage]);
		
	return (
		<div >
			<img height="300px" width="300px" src={storedImage.url} alt={storedImage.name} />
		</div>
	);
};
