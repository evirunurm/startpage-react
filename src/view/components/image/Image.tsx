import { useEffect } from "react";
import IImage from "@domain/image/Image";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import { useLocalStorageState } from "@utils/utils";
import ImageFactory from "@application/ImageFactory";

export const Image: React.FC = () => {
	const [ store, setState] = useLocalStorageState<IImage>(LocalStorageType.Image);
	const { getDefaultImage } = ImageFactory();

	useEffect(() => {
		if (!store) {
			setState(getDefaultImage());
		}

	}, [store, setState, getDefaultImage]);
		
	return (
		<>
			<img height="300px" width="300px" src={store?.url} alt={store?.name} />
		</>
	);
};
