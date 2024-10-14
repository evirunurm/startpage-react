import { useEffect } from "react";
import IImage from "@domain/image/Image";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import { useLocalStorageState } from "@utils/utils";
import useImageLoader from "@application/ImageLoader";

export const Image: React.FC = () => {
	const [ store, setState] = useLocalStorageState<IImage>(LocalStorageType.Image);
	const { getDefaultImage } = useImageLoader();

	useEffect(() => {
		if (!store) {
			setState(getDefaultImage());
		}

	}, [store, setState, getDefaultImage]);
		
	return (
		<div >
			<img height="300px" width="300px" src={store?.url} alt={store?.name} />
		</div>
	);
};
